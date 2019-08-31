from taskconf.config.Configuration import Configuration
import collections


class ProjectConfiguration:
    def __init__(self, config_dir):
        self.configuration = Configuration(str(config_dir))
        self.presets_conf_path = "taskplan_presets.json"
        self.choices_conf_path = "taskplan_choices.json"
        self.code_versions_conf_path = "taskplan_codeversions.json"
        self.settings = []

        self.preset_groups = {}
        for preset in self.get_presets():
            self._recalc_preset_group(preset)
        self._correct_sorting()

        self.number_of_tasks_per_choice = {}

    def register_task(self, task):
        for preset in task.preset.base_presets:
            if str(preset[0].uuid) not in self.number_of_tasks_per_choice:
                self.number_of_tasks_per_choice[str(preset[0].uuid)] = 0
            self.number_of_tasks_per_choice[str(preset[0].uuid)] += 1

    def deregister_task(self, task):
        for preset in task.preset.base_presets:
            if str(preset[0].uuid) in self.number_of_tasks_per_choice:
                self.number_of_tasks_per_choice[str(preset[0].uuid)] -= 1

    def is_choice_removable(self, choice):
        return str(choice.uuid) not in self.number_of_tasks_per_choice or self.number_of_tasks_per_choice[str(choice.uuid)] == 0

    def _correct_sorting(self):
        save_necessary = False

        for preset in self.get_presets():
            if not preset.has_metadata("sorting"):
                preset.set_metadata("sorting", self._max_sorting() + 1)
                save_necessary = True

        for i, preset in enumerate(self.sorted_presets()):
            if preset.get_metadata("sorting") != i:
                preset.set_metadata("sorting", i)
                save_necessary = True

        if save_necessary:
            self.configuration.save()

    def _max_sorting(self):
        max_sorting = 0
        for preset in self.get_presets():
            if preset.has_metadata("sorting"):
                max_sorting = max(max_sorting, preset.get_metadata("sorting"))
        return max_sorting

    def sorted_presets(self):
        return sorted(self.get_presets(), key=lambda preset: preset.get_metadata("sorting"))

    def change_sorting(self, preset_uuid, new_sorting):
        preset = self.get_preset(preset_uuid)
        changed_presets = []

        if not preset.has_metadata("sorting"):
            preset.set_metadata("sorting", self._max_sorting() + 1)
        else:
            old_sorting = preset.get_metadata("sorting")
            dir = -1 if new_sorting > old_sorting else 1
            sorted_presets = self.sorted_presets()
            for i in range(new_sorting, old_sorting, dir):
                self._swap_sorting(sorted_presets[i], sorted_presets[i + dir])
                changed_presets.append(sorted_presets[i])

        changed_presets.append(preset)
        self.configuration.save()

        return changed_presets

    def _swap_sorting(self, first_preset, second_preset):
        first_sorting = first_preset.get_metadata("sorting")
        first_preset.set_metadata("sorting", second_preset.get_metadata("sorting"))
        second_preset.set_metadata("sorting", first_sorting)

    def _recalc_preset_group(self, preset):
        merged_config = {}

        for choice in self.get_choices():
            if choice.get_metadata('preset') == str(preset.uuid):
                self._deep_update(merged_config, choice.get_merged_config(True))

        merged_timesteps = {}
        for timestep in merged_config.keys():
            self._deep_update(merged_timesteps, merged_config[timestep])

        unique_keys = []
        while len(merged_timesteps.keys()) == 1 and type(list(merged_timesteps.values())[0]) == dict:
            unique_keys.append(list(merged_timesteps.keys())[0])
            merged_timesteps = list(merged_timesteps.values())[0]

        self.preset_groups[str(preset.uuid)] = unique_keys

    def get_preset_group(self, preset):
        return self.preset_groups[preset.uuid]

    def _deep_update(self, d, u):
        for k, v in u.items():
            if isinstance(v, collections.Mapping):
                d[k] = self._deep_update(d.get(k, {}), v)
            else:
                d[k] = v
        return d

    def add_preset(self, new_data):
        new_data["sorting"] = self._max_sorting() + 1
        preset = self.configuration.add_preset(new_data, self.presets_conf_path)
        self.preset_groups[str(preset.uuid)] = []
        return preset

    def add_preset_batch(self, config):
        added_presets = []
        added_choices = []
        self._add_preset_batch(config, added_presets, added_choices)
        return added_presets, added_choices

    def _add_preset_batch(self, config, added_presets, added_choices, prefix=[]):
        for key in config.keys():
            if type(config[key]) == dict:
                self._add_preset_batch(config[key], added_presets, added_choices, prefix + [key])
            else:
                data = {}
                data["name"] = key
                data["config"] = {}
                data["deprecated_choice"] = ""
                data["default_choice"] = ""

                added_presets.append(self.add_preset(data))

                data = {}
                data["name"] = key + "_$T0$"
                data["isTemplate"] = True
                data["template_defaults"] = [config[key]]
                data["config"] = {}
                sub_config = data["config"]
                for sub_key in prefix:
                    sub_config[sub_key] = {}
                    sub_config = sub_config[sub_key]
                sub_config[key] = "$T0$"
                added_choices.append(self.add_choice(added_presets[-1].uuid, data)[1])

    def add_choice(self, preset_uuid, new_data):
        if preset_uuid not in self.configuration.presets_by_uuid or self.configuration.presets_by_uuid[preset_uuid] not in self.get_presets():
            raise LookupError("No preset with uuid " + preset_uuid)

        metadata = {"preset": preset_uuid}
        if "isTemplate" in metadata:
            metadata["isTemplate"] = new_data["isTemplate"]

        choice = self.configuration.add_preset(new_data, self.choices_conf_path, metadata)

        preset = self.get_preset(preset_uuid)
        self._recalc_preset_group(preset)
        if preset.get_metadata("deprecated_choice") == "":
            preset.set_metadata("deprecated_choice", str(choice.uuid))
            self.configuration.save()
        if preset.get_metadata("default_choice") == "":
            preset.set_metadata("default_choice", str(choice.uuid))
            self.configuration.save()

        return preset, choice

    def add_code_version(self, data):
        self.configuration.add_preset(data, self.code_versions_conf_path)

    def edit_preset(self, preset_uuid, new_data):
        preset = self.get_preset(preset_uuid)
        new_data['uuid'] = preset.uuid
        new_data['creation_time'] = preset.data['creation_time']
        new_data["sorting"] = preset.get_metadata("sorting")
        preset.set_data(new_data)
        preset.set_metadata("deprecated_choice", new_data["deprecated_choice"])
        preset.set_metadata("default_choice", new_data["default_choice"])
        preset.set_metadata("sorting", new_data["sorting"])

        self.configuration.save()
        return preset

    def edit_choice(self, preset_uuid, choice_uuid, new_data):
        choice = self.get_preset(choice_uuid)
        new_data['uuid'] = choice.uuid
        new_data['creation_time'] = choice.data['creation_time']
        new_data['preset'] = preset_uuid
        choice.set_data(new_data)

        preset = self.get_preset(preset_uuid)
        self._recalc_preset_group(preset)

        self.configuration.save()
        return preset, choice

    def add_task(self, base_presets, config):
        preset_data = {}
        preset_data['uuid'] = None
        preset_data['config'] = config
        preset_data['base'] = base_presets

        task_preset = self.configuration.add_preset(preset_data, None)
        preset_data['config'] = task_preset.get_merged_config()
        task_preset.set_data(preset_data)

        return task_preset

    def renew_task_preset(self, preset):
        left_presets = self.get_presets()[:]

        for base_preset in preset.base_presets:
            for left_preset in left_presets:
                if base_preset[0].get_metadata('preset') == str(left_preset.uuid):
                    left_presets.remove(left_preset)
                    break

        if len(left_presets) > 0:
            new_base_presets = preset.base_presets[:]
            for left_preset in left_presets:
                if left_preset.has_metadata("deprecated_choice"):
                    new_base_presets.append([self.get_preset(left_preset.get_metadata("deprecated_choice"))])
            preset.set_base_presets(new_base_presets)
            data = preset.data
            data['config'] = preset.get_merged_config()
            data['base'] = []
            for base_preset in new_base_presets:
                data['base'].append([base_preset[0].uuid] + base_preset[1:])
            preset.set_data(data)

            return True
        else:
            return False

    def load_task(self, config):
        return self.configuration.add_preset(config, None)

    def get_presets(self):
        return self.configuration.presets_by_file[self.presets_conf_path] if self.presets_conf_path in self.configuration.presets_by_file else []

    def get_choices(self):
        return self.configuration.presets_by_file[self.choices_conf_path] if self.choices_conf_path in self.configuration.presets_by_file else []

    def get_code_versions(self):
        return self.configuration.presets_by_file[self.code_versions_conf_path] if self.code_versions_conf_path in self.configuration.presets_by_file else []

    def get_preset(self, preset_uuid):
        if preset_uuid not in self.configuration.presets_by_uuid:
            raise LookupError("No preset with uuid " + preset_uuid)
        return self.configuration.presets_by_uuid[preset_uuid]

    def remove_choice(self, choice_uuid):
        if choice_uuid in self.configuration.presets_by_uuid:
            choice = self.configuration.presets_by_uuid[choice_uuid]
            if self.is_choice_removable(choice):
                self.configuration.remove_preset(choice)

                preset = self.configuration.presets_by_uuid[choice.get_metadata('preset')]

                one_other_choice = ""
                for other_choice in self.get_choices():
                    if choice.get_metadata('preset') == str(preset.uuid):
                        one_other_choice = str(other_choice.uuid)

                if preset.get_metadata("deprecated_choice") == str(choice.uuid):
                    preset.set_metadata("deprecated_choice", one_other_choice)
                    self.configuration.save()
                if preset.get_metadata("default_choice") == str(choice.uuid):
                    preset.set_metadata("default_choice", one_other_choice)
                    self.configuration.save()

                return choice, preset

        return None, None

    def remove_preset(self, preset_uuid):
        if preset_uuid in self.configuration.presets_by_uuid:
            preset = self.configuration.presets_by_uuid[preset_uuid]
            has_choices = False
            for choice in self.get_choices():
                if choice.get_metadata('preset') == preset_uuid:
                    has_choices = True
                    break

            if not has_choices:
                self.configuration.remove_preset(preset)
                return preset
        return None

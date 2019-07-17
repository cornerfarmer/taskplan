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
                data["name"] = key + "_" + str(config[key])
                data["config"] = {}
                sub_config = data["config"]
                for sub_key in prefix:
                    sub_config[sub_key] = {}
                    sub_config = sub_config[sub_key]
                sub_config[key] = config[key]
                added_choices.append(self.add_choice(added_presets[-1].uuid, data)[1])

    def add_choice(self, preset_uuid, new_data):
        if preset_uuid not in self.configuration.presets_by_uuid or self.configuration.presets_by_uuid[preset_uuid] not in self.get_presets():
            raise LookupError("No preset with uuid " + preset_uuid)

        choice = self.configuration.add_preset(new_data, self.choices_conf_path, {"preset": preset_uuid})

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
        preset.set_data(new_data)
        preset.set_metadata("deprecated_choice", new_data["deprecated_choice"])
        preset.set_metadata("default_choice", new_data["default_choice"])

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
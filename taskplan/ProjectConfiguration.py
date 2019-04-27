from taskconf.config.Configuration import Configuration


class ProjectConfiguration:
    def __init__(self, config_dir):
        self.configuration = Configuration(str(config_dir))
        self.presets_conf_path = "taskplan_presets.json"
        self.choices_conf_path = "taskplan_choices.json"
        self.settings = []

    def add_preset(self, new_data):
        return self.configuration.add_preset(new_data, self.presets_conf_path)

    def add_choice(self, preset_uuid, new_data):
        if preset_uuid not in self.configuration.presets_by_uuid or self.configuration.presets_by_uuid[preset_uuid] not in self.get_presets():
            raise LookupError("No preset with uuid " + preset_uuid)

        choice = self.configuration.add_preset(new_data, self.choices_conf_path, {"preset": preset_uuid})

        preset = self.get_preset(preset_uuid)
        if preset.get_metadata("deprecated_choice") == "":
            preset.set_metadata("deprecated_choice", str(choice.uuid))
            self.configuration.save()

        return choice

    def edit_preset(self, preset_uuid, new_data):
        preset = self.get_preset(preset_uuid)
        new_data['uuid'] = preset.uuid
        new_data['creation_time'] = preset.data['creation_time']
        preset.set_data(new_data)

        self.configuration.save()
        return preset

    def edit_choice(self, preset_uuid, choice_uuid, new_data):
        choice = self.get_preset(choice_uuid)
        new_data['uuid'] = choice.uuid
        new_data['creation_time'] = choice.data['creation_time']
        new_data['preset'] = preset_uuid
        choice.set_data(new_data)

        self.configuration.save()
        return choice

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

    def get_preset(self, preset_uuid):
        if preset_uuid not in self.configuration.presets_by_uuid:
            raise LookupError("No preset with uuid " + preset_uuid)
        return self.configuration.presets_by_uuid[preset_uuid]
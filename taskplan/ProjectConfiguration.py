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
        return choice

    def get_presets(self):
        return self.configuration.presets_by_file[self.presets_conf_path] if self.presets_conf_path in self.configuration.presets_by_file else []

    def get_choices(self):
        return self.configuration.presets_by_file[self.choices_conf_path] if self.choices_conf_path in self.configuration.presets_by_file else []

    def get_preset(self, preset_uuid):
        if preset_uuid not in self.configuration.presets_by_uuid:
            raise LookupError("No preset with uuid " + preset_uuid)
        return self.configuration.presets_by_uuid[preset_uuid]
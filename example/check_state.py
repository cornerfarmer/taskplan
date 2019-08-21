import taskplan
import pickle

from taskconf.config.Preset import Preset

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

api = taskplan.Api()
path, preset = api.load_task('7a808ba2-6447-4dcc-8c15-61a3c2f579e3')

with open(str(path / Path("model.pk")), 'rb') as handle:
    sum = pickle.load(handle)

print(sum, preset.get_int('step'))

custom_preset = Preset({"config": {"step": 10}})
print(custom_preset.get_int("step"))

path, preset = taskplan.Api.load_task_from_folder("tasks/TestTask/7a808ba2-6447-4dcc-8c15-61a3c2f579e3")

with open(str(path / Path("model.pk")), 'rb') as handle:
    sum = pickle.load(handle)

print(sum, preset.get_int('step'))
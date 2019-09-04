import taskplan
import pickle

from taskconf.config.Configuration import Configuration

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

api = taskplan.Api()
path, config = api.load_task('38a0dec1-3d08-463d-9c58-2bff1cba0f54')

with open(str(path / Path("model.pk")), 'rb') as handle:
    sum = pickle.load(handle)

print(sum, config.get_int('step'))

custom_config = Configuration({"config": {"step": 10}})
print(custom_config.get_int("step"))

path, config = taskplan.Api.load_task_from_folder("tasks/TestTask/38a0dec1-3d08-463d-9c58-2bff1cba0f54")

with open(str(path / Path("model.pk")), 'rb') as handle:
    sum = pickle.load(handle)

print(sum, config.get_int('step'))

config = api.build_config("TestTask", {
    "step": -1
})
print(config.get_int("offset"), config.get_int("step"))
import taskplan
import pickle

from taskconf.config.Configuration import Configuration

try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path


api = taskplan.Api()
path, config = api.load_task('tasks/f49e53e1-42d0-43a5-88c3-f74d023053b5')

with open(str(path / Path("model.pk")), 'rb') as handle:
    sum = pickle.load(handle)

print(sum, config.get_int('step'))

custom_config = Configuration({"config": {"step": 10}})
print(custom_config.get_int("step"))

config = api.build_config({
    "step": -1
})
print(config.get_int("offset"), config.get_int("step"))
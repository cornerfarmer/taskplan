import taskplan
import pickle
try:
  from pathlib2 import Path
except ImportError:
  from pathlib import Path

api = taskplan.Api()
path, preset = api.load_task('4ae0c923-d83a-4bfe-8772-326fb9c9fcd1')

with open(str(path / Path("model.pk")), 'rb') as handle:
    sum = pickle.load(handle)

print(sum, preset.get_int('step'))
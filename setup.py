from setuptools import setup

setup(name='taskplan',
      version='0.9',
      url='http://github.com/domin1101/taskplan',
      author='Dominik Winkelbauer',
      packages=['taskplan'],
      entry_points={
            'console_scripts': ['taskplan=taskplan.CommandLine:cli'],
      })
from git import Repo, BadName
import os
import fnmatch
import time

class VersionControl:

    def __init__(self, task_dir, white_list, slim_mode):
        self.task_dir = task_dir
        self.white_list = white_list
        self.commit_labels = {}
        self.current_commit_id = ""

        os.environ['GIT_DIR'] = str(self.task_dir / ".gittaskplan")
        os.environ['GIT_WORK_TREE'] = "."
        if not slim_mode:
            self.repo = Repo.init()
            if not self.repo.head.is_valid():
                self.take_snapshot("Initial", True)

    def load_metadata(self, metadata):
        if "current_commit_id" in metadata:
            self.current_commit_id = metadata["current_commit_id"]
        else:
            self.current_commit_id = self.repo.head.commit.hexsha

        if "commit_labels" in metadata:
            self.commit_labels = metadata["commit_labels"]

    def save_metadata(self):
        return {
            "commit_labels": self.commit_labels,
            "current_commit_id": self.current_commit_id
        }

    def take_snapshot(self, cause, force=False):
        files = []
        possible_files = self.repo.untracked_files + [item.a_path for item in self.repo.index.diff(None)]
        try:
            possible_files += [item.a_path for item in self.repo.index.diff("HEAD")]
        except BadName:
            pass # Initial call, no head

        for file in possible_files:
            for pattern in self.white_list:
                if fnmatch.fnmatch(file, pattern) and os.path.exists(file):
                    files.append(file)
                    break

        if len(files) > 0 or force:
            self.repo.index.add(files)
            self.repo.index.commit(cause)

        self.current_commit_id = self.repo.head.commit.hexsha
        return self.repo.head.commit.hexsha

    def fetch_code_version(self, commit_id):
        commit = self.repo.commit(commit_id)
        data = {
            "date": commit.committed_date,#time.mktime(commit.committed_date.timetuple()),
            "message": commit.message,
            "parent": None if len(commit.parents) == 0 else commit.parents[0].hexsha
        }
        if commit_id in self.commit_labels:
            data["label"] = self.commit_labels[commit_id]
        else:
            data["label"] = ""
        data["inherited_label"] = self.get_label(commit_id, True)
        return data

    def set_label(self, commit_id, label):
        if label != "":
            self.commit_labels[commit_id] = label
        elif commit_id in self.commit_labels:
            del self.commit_labels[commit_id]

    def get_label(self, commit_id, force_parent=False):
        return "<no label>"
        while commit_id not in self.commit_labels or force_parent:
            if len(self.repo.commit(commit_id).parents) == 0:
                return "initial"
            commit_id = self.repo.commit(commit_id).parents[0].hexsha
            force_parent = False

        return self.commit_labels[commit_id]

    def reset_hard(self, commit_id):
        self.repo.git.reset('--hard', commit_id)
        self.current_commit_id = self.repo.head.commit.hexsha

    def reset_soft(self, commit_id):
        self.repo.git.reset('--soft', commit_id)
        self.current_commit_id = self.repo.head.commit.hexsha

    def all_code_version_labels(self):
        labels = list(self.commit_labels.values())
        if "initial" not in labels:
            labels.append("initial")
        return labels
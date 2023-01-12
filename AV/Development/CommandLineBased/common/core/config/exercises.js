import { EXERCISE_TYPES } from "./exercise-types.js";
import { FILE_STATE } from "./file-states.js";

const TOUCH = {
  description:
    "The touch command creates a new file with the name and location specified by (file_path). Multiple (file_path) values can be provided to create multiple files.",
  title: "touch (file_path)",
  task: 'Create a new file named "lion.txt" in the "mammals" directory.',
  checkCompleted: (args, state) => {
    const { homeDir } = state;

    const mammalsDir = homeDir.findDeep("mammals");
    return mammalsDir && mammalsDir.find("lion.txt");
  },
};

const RM = {
  title: "rm [-r] (path)",
  description:
    "The rm command removes the file or directory at the location specified by (path). Multiple (path) values can be provided to remove multiple files or directories. Include -r to remove directories.",
  task: 'Remove the "snake.txt" file.',
  checkCompleted: (args, state) => {
    const { homeDir } = state;

    const mammalsDir = homeDir.findDeep("mammals");
    return mammalsDir && !mammalsDir.find("snake.txt");
  },
  initialFileStructure: {
    name: "/",
    contents: [
      "bird.txt",
      "fish.txt",
      {
        name: "mammals",
        contents: [
          "monkey.txt",
          "snake.txt",
          "mouse.txt",
          "bear.txt",
          {
            name: "dogs",
            contents: ["beagle.txt", "boxer.txt", "poodle.txt"],
          },
        ],
      },
    ],
  },
  initialIndexPath: [2],
};

const PWD = {
  title: "pwd",
  description:
    "The pwd command prints the path of the current working directory.",
  task: "Print the path of the current working directory.",
  checkCompleted: (args, state) => {
    return args.length > 0 && args[0] === "pwd";
  },
};

const PWD_2 = {
  title: "pwd",
  description:
    "As mentioned in the previous exercise, the pwd command prints the path of the current working directory. Notice how the path is different from the previous exercise.",
  task: "Print the path of the current working directory.",
  checkCompleted: (args, state) => {
    return args.length > 0 && args[0] === "pwd";
  },
  initialIndexPath: [3, 3],
};

const PWD_3 = {
  title: "pwd",
  description:
    "As mentioned in the previous exercise, the pwd command prints the path of the current working directory. Notice how the path is different from the previous exercises.",
  task: "Print the path of the current working directory.",
  checkCompleted: (args, state) => {
    return args.length > 0 && args[0] === "pwd";
  },
  initialFileStructure: {
    name: "/",
    contents: [
      "snake.txt",
      "fish.txt",
      {
        name: "mammals",
        contents: [
          "mouse.txt",
          "bear.txt",
          {
            name: "dogs",
            contents: ["beagle.txt", "boxer.txt"],
          },
          {
            name: "horses",
            contents: ["cob.txt", "shire.txt"],
          },
        ],
      },
    ],
  },
  initialIndexPath: [2, 3],
};

const LS = {
  title: "ls (directory_path)",
  description:
    "The ls command lists all files and directories in the current working directory if (directory_path) is not provided. Otherwise, the ls command lists all files and directories in the directory at the location specified by (directory_path).",
  task: "List all files and directories in any of the directories.",
  checkCompleted: (args, state) => {
    return args.length > 0 && args[0] === "ls";
  },
};

const CD = {
  title: "cd (directory_path)",
  description:
    "The cd command changes the current working directory to the directory at the location specified by (directory_path).",
  task: 'Change the current working directory to "dogs".',
  checkCompleted: (args, state) => {
    const { currDir } = state;
    return currDir.name === "dogs";
  },
};

const CD_2 = {
  title: "cd (directory_path)",
  description:
    "(directory_path) can be a relative path, which could be used to change the current working directory to a parent directory.",
  task: 'Change the current working directory to "mammals".',
  checkCompleted: (args, state) => {
    const { currDir } = state;
    return currDir.name === "mammals";
  },
  initialIndexPath: [3, 3],
};

const CD_3 = {
  title: "cd (directory_path)",
  description:
    "(directory_path) can be more complex to change the current working directory to a directory that is not a direct parent or subdirectory.",
  task: 'Change the current working directory to "owls".',
  checkCompleted: (args, state) => {
    const { currDir } = state;
    return currDir.name === "owls";
  },
  initialFileStructure: {
    name: "/",
    contents: [
      "fish.txt",
      {
        name: "mammals",
        contents: [
          "bear.txt",
          {
            name: "dogs",
            contents: ["boxer.txt", "poodle.txt"],
          },
        ],
      },
      {
        name: "birds",
        contents: [
          "chicken.txt",
          {
            name: "owls",
            contents: ["snowy.txt", "horned.txt"],
          },
        ],
      },
    ],
  },
  initialIndexPath: [1],
};

const MKDIR = {
  title: "mkdir (directory_path)",
  description:
    "The mkdir command creates a new directory with the name and location specified by (directory_path). Multiple (directory_path) values can be provided to create multiple directories.",
  task: 'Create a new directory named "cats" in the "mammals" directory.',
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    const mammalsDir = homeDir.findDeep("mammals");
    return mammalsDir && mammalsDir.find("cats");
  },
};

const RM_R = {
  title: "rm [-r] (path)",
  description:
    "The rm command with the -r flag removes the file or directory at the location specified by (path). Multiple (path) values can be provided to remove multiple files or directories.",
  task: 'Remove the "dogs" directory.',
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    const mammalsDir = homeDir.findDeep("mammals");
    return mammalsDir && !mammalsDir.find("dogs");
  },
};

const RMDIR = {
  title: "rmdir (directory_path)",
  description:
    "The rmdir command removes the directory at the location specified by (directory_path) if the directory is empty. Multiple (directory_path) values can be provided to remove muliple directories.",
  task: 'Remove the "houses" directory.',
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    const animalsDir = homeDir.findDeep("dogs");
    return animalsDir && !animalsDir.find("houses");
  },
  initialFileStructure: {
    name: "/",
    contents: [
      "bird.txt",
      "snake.txt",
      "fish.txt",
      {
        name: "mammals",
        contents: [
          "monkey.txt",
          "mouse.txt",
          "bear.txt",
          {
            name: "dogs",
            contents: [
              "beagle.txt",
              "boxer.txt",
              "poodle.txt",
              { name: "houses", contents: [] },
            ],
          },
        ],
      },
    ],
  },
  initialIndexPath: [3, 3],
};

const MV = {
  title: "mv (src_path) (dst_path)",
  description:
    "The mv command moves a file or directory from the location specified by (src_path) to the file or directory specified by (dst_path).",
  task: 'Move "beagle.txt" to the "dogs" directory.',
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    const dogsDir = homeDir.findDeep("dogs");
    const mammalsDir = homeDir.findDeep("mammals");
    return (
      dogsDir &&
      dogsDir.find("beagle.txt") &&
      mammalsDir &&
      !mammalsDir.find("beagle.txt")
    );
  },
  initialFileStructure: {
    name: "/",
    contents: [
      "bird.txt",
      "snake.txt",
      "fish.txt",
      {
        name: "mammals",
        contents: [
          "monkey.txt",
          "mouse.txt",
          "bear.txt",
          {
            name: "dogs",
            contents: ["boxer.txt", "poodle.txt"],
          },
          "beagle.txt",
        ],
      },
    ],
  },
};

const CP = {
  title: "cp [-r] (src_path) (dst_path)",
  description:
    "The cp command copies a file or directory from the location specified by (src_path) to the file or directory specified by (dst_path). Include [-r] to copy directories.",
  task: 'Copy "monkey.txt" to the root directory.',
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    const animalsDir = homeDir;
    const mammalsDir = homeDir.findDeep("mammals");
    return (
      animalsDir &&
      animalsDir.find("monkey.txt") &&
      mammalsDir &&
      mammalsDir.find("monkey.txt")
    );
  },
};

const CHALLENGE_1 = {
  title: "Challenge 1",
  description:
    "This challenge requires the usage of multiple commands. Remember, multiple (file_path) values can be passed to touch to create multiple files at once.",
  task: `In the "mammals" directory, create a new directory named "cats" that contains files named "persian.txt", "bengal.txt", and "sphynx.txt".`,
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    const mammalsDir = homeDir.findDeep("mammals");
    if (mammalsDir) {
      const catsDir = mammalsDir.find("cats");
      return (
        catsDir &&
        catsDir.find("persian.txt") &&
        catsDir.find("bengal.txt") &&
        catsDir.find("sphynx.txt")
      );
    }
  },
};

const CHALLENGE_2 = {
  title: "Challenge 2",
  description:
    "This challenge will require the usage of multiple commands. Remember, multiple (src_path) values can be passed to mv to move multiple files at once.",
  task: `In the "mammals" directory, create a new directory named "cats". Then, move "persian.txt", "bengal.txt", and "sphynx.txt" to the "cats" directory.`,
  initialFileStructure: {
    name: "/",
    contents: [
      "bird.txt",
      "snake.txt",
      "fish.txt",
      {
        name: "mammals",
        contents: [
          "monkey.txt",
          "mouse.txt",
          "bear.txt",
          {
            name: "dogs",
            contents: ["beagle.txt", "boxer.txt", "poodle.txt"],
          },
        ],
      },
      "persian.txt",
      "bengal.txt",
      "sphynx.txt",
    ],
  },
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    const mammalsDir = homeDir.findDeep("mammals");
    if (mammalsDir) {
      const catsDir = mammalsDir.find("cats");
      return (
        catsDir &&
        catsDir.find("persian.txt") &&
        catsDir.find("bengal.txt") &&
        catsDir.find("sphynx.txt") &&
        !homeDir.find("persian.txt") &&
        !homeDir.find("bengal.txt") &&
        !homeDir.find("sphynx.txt")
      );
    }
  },
};

const CHALLENGE_3 = {
  title: "Challenge 3",
  description:
    "This challenge will require the usage of multiple commands. Remember, multiple (path) values can be passed to rm to remove multiple files at once.",
  task: `Copy the "dogs" directory to the root directory. Then, remove "poodle.txt" and "husky.txt" from the copy. The original "dogs" directory should not be changed.`,
  initialFileStructure: {
    name: "/",
    contents: [
      "bird.txt",
      {
        name: "mammals",
        contents: [
          "mouse.txt",
          "bear.txt",
          {
            name: "dogs",
            contents: ["beagle.txt", "boxer.txt", "poodle.txt", "husky.txt"],
          },
        ],
      },
      "snake.txt",
    ],
  },
  initialIndexPath: [1],
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    const mammalsDir = homeDir.findDeep("mammals");
    if (mammalsDir) {
      const dogsDir = mammalsDir.find("dogs");
      const dogsDirCopy = homeDir.find("dogs");
      return (
        dogsDir &&
        dogsDirCopy &&
        dogsDir.find("beagle.txt") &&
        dogsDir.find("boxer.txt") &&
        dogsDir.find("poodle.txt") &&
        dogsDir.find("husky.txt") &&
        dogsDirCopy.find("beagle.txt") &&
        dogsDirCopy.find("boxer.txt") &&
        !dogsDirCopy.find("poodle.txt") &&
        !dogsDirCopy.find("husky.txt")
      );
    }
  },
};

const ADD = {
  title: "git add (path)",
  description:
    "The git add command adds the file or directory at the location specified by (path) to the staging area. Multiple (path) values can be provided to add multiple files or directories.",
  task: "Add all the changed files to the staging area. Then, run git status to check that the files have been added to the staging area.",
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { homeDir } = state;
      const src = homeDir.findDeep("src");
      if (src) {
        const app = src.find("app.js");
        const index = src.find("index.html");
        return app && app.isStaged() && index && index.isStaged();
      }
    }
  },
  initialCommands: ["cd src", "vi index.html", "touch app.js"],
  type: EXERCISE_TYPES.GIT,
};

const CLONE = {
  title: "git clone (url)",
  description:
    "The git clone command clones the remote repository at the location specified by (url) and copies the contents of the remote repository to a new directory on the local machine.",
  task: 'Clone the remote repository. The url for the remote repository is "https://github.com/Sample/Sample.git".',
  checkCompleted: (args, state) => {
    const { homeDir } = state;
    return args.length > 1 && args[1] === "clone" && homeDir;
  },
  emptyLocal: true,
  type: EXERCISE_TYPES.GIT,
};

const STATUS = {
  title: "git status",
  description:
    "The git status command prints the status of the local repository including information about the working tree, the staging area, commits, and the active branch.",
  task: 'Run git status. Notice "index.html" has been modified, and "app.js" is a new file and is thus untracked.',
  checkCompleted: (args, state) => {
    return args.length > 1 && args[1] === "status";
  },
  initialCommands: ["cd src", "vi index.html", "touch app.js"],
  type: EXERCISE_TYPES.GIT,
};

const GIT_RM = {
  title: "git rm [-r] (path)",
  description:
    "The git rm command removes the file or directory at the location specified by (path) and adds the file to the staging area. Multiple (path) values can be provided to remove multiple files or directories.",
  task: 'Remove "config.js" and add it to the staging area. Then, run git status to check that the files have been added to the staging area.',
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { homeDir } = state;
      const src = homeDir.findDeep("src");
      if (src) {
        const config = src.findWithDeleted("config.js");
        return (
          config &&
          config.length > 0 &&
          config[0].isStagingState(FILE_STATE.DELETED)
        );
      }
    }
  },
  initialCommands: ["cd src", "vi index.html", "touch app.js", "git add ."],
  type: EXERCISE_TYPES.GIT,
};

const COMMIT = {
  title: "git commit -m (message)",
  description:
    "The git commit command creates a commit containing the changes in the staging area. The -m flag is required and must be followed by a nonempty (message).",
  task: "Create a commit containing all the changes in the staging area. Then, run git status to check that the local branch is now one commit ahead of the remote branch.",
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { localInitialCommit, homeDir } = state;

      if (localInitialCommit.children.length > 0) {
        const src = homeDir.findDeep("src");
        if (src) {
          const app = src.find("app.js");
          const config = src.findWithDeleted("config.js");
          const index = src.find("index.html");
          return (
            app &&
            app.isUnchanged() &&
            config &&
            config.length === 0 &&
            index &&
            index.isUnchanged()
          );
        }
      }
    }
  },
  initialCommands: [
    "cd src",
    "vi index.html",
    "touch app.js",
    "git add .",
    "git rm config.js",
  ],
  type: EXERCISE_TYPES.GIT,
};

const PUSH = {
  title: "git push",
  description:
    "The git push command pushes new commits from the local branch to the corresponding remote branch. The commit or commits contain the changes to the files that are applied to the remote repository.",
  task: "Push the local changes to the remote repository. Then, run git status to check that the remote branch is now up to date with the local branch.",
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { remoteHomeDir } = state;
      const src = remoteHomeDir.findDeep("src");
      if (src) {
        const app = src.find("app.js");
        return app;
      }
    }
  },
  initialCommands: [
    "cd src",
    "vi index.html",
    "touch app.js",
    "git add .",
    "git rm config.js",
    'git commit -m "test"',
  ],
  type: EXERCISE_TYPES.GIT,
};

const RESTORE = {
  title: "git restore (path)",
  description:
    "The git restore command reverts the changes made to the file or directory at the location specified by (path). Multiple (path) values can be provided to restore multiple files or directories.",
  task: "Restore all the changed files. Then, run git status to check that the files are no longer changed.",
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { homeDir } = state;
      const src = homeDir.findDeep("src");
      if (src) {
        const index = src.find("index.html");
        const app = src.find("app.js");
        return index && index.isUnchanged() && app && app.isUnchanged();
      }
    }
  },
  initialCommands: [
    "cd src",
    "vi index.html",
    "touch app.js",
    "git add .",
    "git rm config.js",
    'git commit -m "test"',
    "git push",
    "vi index.html",
    "rm app.js",
  ],
  type: EXERCISE_TYPES.GIT,
};

const RESTORE_STAGED = {
  title: "git restore [--staged] (path)",
  description:
    "The git restore command with the --staged flag moves the file or directory at the location specified by (path) from the staging area to the working tree.",
  task: "Restore all the staged files. Then, run git status to check that the files are no longer staged.",
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { homeDir } = state;
      const src = homeDir.findDeep("src");
      if (src) {
        const config = src.find("config.js");
        const app = src.findWithDeleted("app.js");
        const index = src.find("index.html");
        return (
          config &&
          config.isChangedInWorkingArea() &&
          app &&
          app.length > 0 &&
          app[0].isChangedInWorkingArea() &&
          index &&
          index.isChangedInWorkingArea()
        );
      }
    }
  },
  initialCommands: [
    "cd src",
    "vi index.html",
    "touch app.js",
    "git add .",
    "git rm config.js",
    'git commit -m "test"',
    "git push",
    "vi index.html",
    "rm app.js",
    "touch config.js",
    "git add .",
  ],
  type: EXERCISE_TYPES.GIT,
};

const PULL = {
  title: "git pull",
  description:
    "The git pull command pulls new commits to the local branch from the corresponding remote branch. The commit or commits contain the changes to the files that are applied to the local repository.",
  task: "Pull the remote changes to the local repository. Then, run git status to check that the local branch is now up to date with the remote branch.",
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { homeDir, localInitialCommit } = state;
      const newFile = homeDir.find("new.txt");
      return localInitialCommit.children.length > 0 && newFile;
    }
  },
  initialCommands: ["cd src"],
  initialRemoteCommands: ["touch new.txt", "git add .", "git commit -m 'test'"],
  type: EXERCISE_TYPES.GIT,
};

const COMMIT_A = {
  title: "git commit [-a] -m (message)",
  description:
    "The git commit command with the -a flag adds all files, excluding untracked files, to the staging area before creating the commit.",
  task: "Create a commit containing all the changes to all the files. Then, run git status to check that all changes have been committed.",
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { homeDir } = state;
      const readme = homeDir.find("README");
      const gitignore = homeDir.find(".gitignore");
      if (
        readme &&
        readme.isUnchanged() &&
        gitignore &&
        gitignore.isUnchanged()
      ) {
        const src = homeDir.findDeep("src");
        if (src) {
          const app = src.find("app.js");
          const test = src.findWithDeleted("test.js");
          const index = src.find("index.html");
          return (
            app &&
            app.isUnchanged() &&
            test &&
            test.length === 0 &&
            index &&
            index.isUnchanged()
          );
        }
      }
    }
  },
  initialCommands: [
    "cd src",
    "vi index.html",
    "touch app.js",
    "git add .",
    "git rm config.js",
    "vi ../README ../.gitignore",
  ],
  type: EXERCISE_TYPES.GIT,
};

const COMMIT_PATH = {
  title: "git commit (path) -m (message)",
  description:
    "The git commit command with one or more (path) arguments creates a commit containing only the changes to the files or directories at the location or locations specified by (path).",
  task: 'Create a commit containing only the changes to "app.js" and "README". Then, run git status to check that only those changes have been committed.',
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { homeDir } = state;
      const readme = homeDir.find("README");
      const gitignore = homeDir.find(".gitignore");
      if (
        readme &&
        readme.isUnchanged() &&
        gitignore &&
        !gitignore.isUnchanged()
      ) {
        const src = homeDir.findDeep("src");
        if (src) {
          const app = src.find("app.js");
          const config = src.findWithDeleted("config.js");
          const index = src.find("index.html");
          return (
            app &&
            app.isUnchanged() &&
            config &&
            config.length > 0 &&
            !config[0].isUnchanged() &&
            index &&
            !index.isUnchanged()
          );
        }
      }
    }
  },
  initialCommands: [
    "cd src",
    "vi index.html",
    "touch app.js",
    "git add .",
    "git rm config.js",
    "vi ../README ../.gitignore",
  ],
  type: EXERCISE_TYPES.GIT,
};

const BRANCH = {
  title: "git branch (branch_name)",
  description:
    "The git branch command creates a branch with the name specified by (branch_name).",
  task: 'Create a new branch named "develop".',
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "branch") {
      const { localInitialCommit } = state;
      return localInitialCommit.findBranchByName("develop");
    }
  },
  initialCommands: [
    "cd src",
    "rm test.js",
    "vi index.html",
    "touch app.js",
    "git add .",
    'git commit -m "test"',
    "git push",
  ],
  type: EXERCISE_TYPES.GIT,
};

const SWITCH = {
  title: "git switch (branch_name)",
  description:
    "The git switch command changes the current branch to the branch with the name specified by (branch_name).",
  task: 'Change the current branch to the "develop" branch. Then, run git status to check that the "develop" branch is the current branch.',
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { localCurrBranch } = state;
      return localCurrBranch.name === "develop";
    }
  },
  initialCommands: [
    "cd src",
    "rm test.js",
    "vi index.html",
    "touch app.js",
    "git add .",
    'git commit -m "test"',
    "git push",
    "git branch develop",
  ],
  type: EXERCISE_TYPES.GIT,
};

const SWITCH_C = {
  title: "git switch [-c] (branch_name)",
  description:
    "The git switch command with the -c flag creates a new branch with the name specified by (branch_name) if the branch does not exist and then switches to the new branch.",
  task: 'Create a "testing" branch and change the current branch to the "testing" branch. Then, run git status to check that the "testing" branch is the current branch.',
  checkCompleted: (args, state) => {
    if (args.length > 1 && args[1] === "status") {
      const { localCurrBranch } = state;
      return localCurrBranch.name === "testing";
    }
  },
  initialCommands: [
    "cd src",
    "rm test.js",
    "vi index.html",
    "touch app.js",
    "git add .",
    'git commit -m "test"',
    "git push",
  ],
  type: EXERCISE_TYPES.GIT,
};

const SWITCH_DIVERGED = {
  title: "git switch (branch_name)",
  description:
    "Branches can diverge and store different versions of the file structure.",
  task: 'Change the current branch to the "develop" branch. Notice how the file structure is different between the "develop" branch and the "main" branch.',
  checkCompleted: (args, state) => {
    const { localCurrBranch } = state;
    return localCurrBranch.name === "develop";
  },
  initialCommands: [
    "cd src",
    "rm test.js",
    "vi index.html",
    "touch app.js",
    "git add .",
    'git commit -m "test"',
    "git push",
    "git branch develop",
    "git switch develop",
    "rm config.js",
    "touch dev.txt",
    "git add .",
    "git commit -m 'test'",
    "git switch main",
    "rm app.js",
    "git add .",
    "git commit -m 'test'",
  ],
  type: EXERCISE_TYPES.GIT,
};

const GIT_CHALLENGE_1 = {
  title: "Challenge 1",
  description: "This challenge will require the usage of multiple commands.",
  task: 'Create a new file named "app.js" in "src". Then, update the remote repository with the new file.',
  checkCompleted: (args, state) => {
    const { remoteHomeDir } = state;
    const src = remoteHomeDir.findDeep("src");
    return src && src.find("app.js");
  },
  initialCommands: ["cd src"],
  type: EXERCISE_TYPES.GIT,
};

const GIT_CHALLENGE_2 = {
  title: "Challenge 2",
  description:
    "This challenge will require the usage of multiple commands. Remember, the -c flag can be used with switch to create a new branch and switch to the new branch at the same time.",
  task: 'Create a new branch named "prod". Then, create a commit on this branch containing at least one change. Lastly, push the "prod" branch to the remote repository.',
  checkCompleted: (args, state) => {
    const { remoteInitialCommit, remoteCurrBranch } = state;
    const prod = remoteInitialCommit.findBranchByName("prod");
    return prod && prod.commit !== remoteCurrBranch.commit;
  },
  initialCommands: ["cd src"],
  type: EXERCISE_TYPES.GIT,
};

const GIT_CHALLENGE_3 = {
  title: "Challenge 3",
  description:
    "This challenge will require the usage of multiple commands. Remember, the -a flag can be used with commit to add all files and commit all files at the same time.",
  task: 'Clone the remote repository at "https://github.com/Sample/Sample.git". Then, remove "config.js" and update the remote repository with this change.',
  checkCompleted: (args, state) => {
    const { remoteHomeDir } = state;
    const src = remoteHomeDir.find("src");
    return src && !src.find("config.js");
  },
  emptyLocal: true,
  type: EXERCISE_TYPES.GIT,
};

const DEFAULT_COMMAND_LINE_EXERCISE_LIST = [
  PWD,
  PWD_2,
  PWD_3,
  LS,
  CD,
  CD_2,
  CD_3,
  TOUCH,
  MKDIR,
  RM,
  RM_R,
  RMDIR,
  MV,
  CP,
  CHALLENGE_1,
  CHALLENGE_2,
  CHALLENGE_3,
];

export {
  TOUCH,
  RM,
  PWD,
  PWD_2,
  PWD_3,
  LS,
  CD,
  CD_2,
  CD_3,
  MKDIR,
  RM_R,
  RMDIR,
  MV,
  CP,
  CHALLENGE_1,
  CHALLENGE_2,
  CHALLENGE_3,
  DEFAULT_COMMAND_LINE_EXERCISE_LIST,
  ADD,
  CLONE,
  STATUS,
  GIT_RM,
  COMMIT,
  PUSH,
  RESTORE,
  RESTORE_STAGED,
  PULL,
  COMMIT_A,
  COMMIT_PATH,
  BRANCH,
  SWITCH,
  SWITCH_C,
  SWITCH_DIVERGED,
  GIT_CHALLENGE_1,
  GIT_CHALLENGE_2,
  GIT_CHALLENGE_3,
};

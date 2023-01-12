const tooManyArgs = "Too many arguments";
const notEnoughArgs = "Not enough arguments";
const invalidPath = (path) => `'${path}' is not a valid path`;
const notADirectory = (path) => `'${path}' is not a directory`;
const duplicate = (path) => `'${path}' already exists`;
const missingRCopy = (path) =>
  `'${path}' is a directory. Cannot copy directory without -r`;
const missingRRemove = (path) =>
  `'${path}' is a directory. Cannot remove directory without -r`;
const overwriteFileWithDir = `Cannot overwrite file with directory`;
const notEmpty = (path) => `'${path}' is not empty`;
const subdirectory = (src, dst) =>
  `Cannot move '${src}' to subdirectory of itself '${dst}'`;
const notAFile = (path) => `${path} is not a file name`;
const removeDescendant = (path) =>
  `'${path}' contains the current working directory, so it cannot be removed`;
const noFilesExist = "No files or folders exist";

const invalidGitURL = (url) => `'${url}' cannot be accessed`;
const alreadyCloned = "Remote has already been cloned";

const commmandNotFound = (command) => `'${command}' not found`;
const commandDisabled = (command) => `'${command}' is disabled`;

const commitRequiresMessage = "Requires a message specified after the -m flag";
const messageEnclosed = "Message must be enclosed in quotes";
const quoteNotClosed = "Closing quote is missing";
const messageEmpty = "Message cannot be empty";
const noChangesToCommit = "No changes committed";
const filesAndA = "Cannot use -a flag when committing specific files";
const untracked = (path) => `'${path}' is not tracked by Git`;
const branchAlreadyExists = (name) => `'${name}' branch already exists`;
const branchNotFound = (name) => `'${name}' branch does not exist`;
const checkoutHandleChanges =
  "Must commit or undo all changes before switching branches";
const pullUpToDate = "Nothing to pull. Already up to date";
const pushUpToDate = "Nothing to push. Everything up to date";
const localRemoteDivergedPull = "Cannot pull. Local and remote have diverged";
const localRemoteDivergedPush = "Cannot push. Local and remote have diverged";
const branchNotRemote = (name) =>
  `'${name}' is not tracking a remote branch to pull from`;

const alreadyOnBranch = (name) => `Already on '${name}' branch`;
const missingArg = (command) => `'${command}' needs a command`;

export {
  tooManyArgs,
  notEnoughArgs,
  invalidPath,
  notADirectory,
  duplicate,
  missingRCopy,
  missingRRemove,
  overwriteFileWithDir,
  notEmpty,
  subdirectory,
  notAFile,
  removeDescendant,
  invalidGitURL,
  alreadyCloned,
  commmandNotFound,
  commandDisabled,
  noFilesExist,
  commitRequiresMessage,
  messageEnclosed,
  messageEmpty,
  noChangesToCommit,
  filesAndA,
  untracked,
  branchAlreadyExists,
  branchNotFound,
  checkoutHandleChanges,
  pullUpToDate,
  localRemoteDivergedPull,
  localRemoteDivergedPush,
  branchNotRemote,
  pushUpToDate,
  alreadyOnBranch,
  quoteNotClosed,
  missingArg,
};

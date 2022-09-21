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
};

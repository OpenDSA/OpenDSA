from pathlib import Path

def parseExercises(exercises):
  return [(exerciseName, exerciseName.lower().replace("_", "-"), exerciseTitle) for exerciseName, exerciseTitle in exercises]

COMMAND_LINE_EXERCISES = parseExercises([
  ("PWD", "pwd 1"),
  ("PWD_2", "pwd 2"),
  ("PWD_3", "pwd 3"),
  ("LS", "ls"),
  ("CD", "cd 1"),
  ("CD_2", "cd 2"),
  ("CD_3", "cd 3"),
  ("TOUCH", "touch"),
  ("MKDIR", "mkdir"),
  ("RM", "rm"),
  ("RM_R", "rm -r"),
  ("RMDIR", "rmdir"),
  ("MV", "mv"),
  ("CP", "cp"),
  ("CHALLENGE_1", "Challenge 1"),
  ("CHALLENGE_2", "Challenge 2"),
  ("CHALLENGE_3", "Challenge 3"),
])

GIT_EXERCISES = parseExercises([
  ("CLONE", "git clone"),
  ("STATUS", "git status"),
  ("ADD", "git add"),
  ("GIT_RM", "git rm"),
  ("COMMIT", "git commit"),
  ("PUSH", "git push"),
  ("RESTORE", "git restore"),
  ("RESTORE_STAGED", "git restore --staged"),
  ("PULL", "git pull"),
  ("COMMIT_A", "git commit -a"),
  ("COMMIT_PATH", "git commit (path)"),
  ("BRANCH", "git branch"),
  ("SWITCH", "git switch"),
  ("SWITCH_C", "git switch -c"),
  ("SWITCH_DIVERGED", "git switch diverged branches"),
  ("GIT_CHALLENGE_1", "Challenge 1"),
  ("GIT_CHALLENGE_2", "Challenge 2"),
  ("GIT_CHALLENGE_3", "Challenge 3"),
])



def createFile(replacement, filename, extension, path):
  inputFile = open(f"template.{extension}", "r")
  inputString = inputFile.read()

  outputString = inputString.replace("EXERCISE_NAME", replacement)

  outputFileName = f"{path}/{filename}-exercise.{extension}"
  outputFile = open(outputFileName, "w")
  outputFile.write(outputString)

  return outputFileName


def createExerciseFiles(exerciseConfigName, exerciseFileName, exerciseTitle, path):
  p = Path(f"{path}/{exerciseFileName}")
  p.mkdir(exist_ok=True)

  createFile(exerciseConfigName, exerciseFileName, "js", p)
  createFile(exerciseFileName, exerciseFileName, "html", p)
  createFile(exerciseTitle, exerciseFileName, "json", p)
  


  
def createAllExerciseFiles(exerciseNames, path):
  p = Path(path)
  p.mkdir(exist_ok=True)
  
  for exerciseConfigName, exerciseFileName, exerciseTitle in exerciseNames: 
    createExerciseFiles(exerciseConfigName, exerciseFileName, exerciseTitle, path)


def createRST(exerciseNames, outputFileName):
  inputFile = open(f"header.rst", "r")
  inputString = inputFile.read()

  outputString = inputString
  outputString += "\n\n"

  for exerciseConfigName, exerciseFileName, exerciseTitle in exerciseNames:
    outputString+=createRSTExerciseSection(exerciseFileName, exerciseTitle)
    outputString += "\n\n"

  outputFile = open(outputFileName, "w")
  outputFile.write(outputString)

  return outputFileName

def createRSTExerciseSection(exerciseFileName, exerciseTitle):
  inputFile = open(f"template.rst", "r")
  inputString = inputFile.read()
  return inputString.replace("EXERCISE_NAME", exerciseFileName).replace("EXERCISE_TITLE", exerciseTitle)


createAllExerciseFiles(COMMAND_LINE_EXERCISES, "../../exercises")
createRST(COMMAND_LINE_EXERCISES, "../../../../../RST/en/CommandLine/Exercises.rst")

createAllExerciseFiles(GIT_EXERCISES, "../../exercises")
createRST(GIT_EXERCISES, "../../../../../RST/en/Git/Exercises.rst")





  




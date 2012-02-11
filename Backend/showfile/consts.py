# Minimum number of problems that a user must do before they are even judged for proficiency
MIN_PROBLEMS_IMPOSED = 5

# Number of problems required to complete a streak in a normal exercise
REQUIRED_STREAK = 10

# Minimum accuracy (probabilty of getting next problem correct) required to be considered proficient
PROFICIENCY_ACCURACY_THRESHOLD = 0.94

# Number of problems required to reach a barrier/milestone in a challenge exercise
CHALLENGE_STREAK_BARRIER = 10

# Max streak shown in streak bars
MAX_STREAK_SHOWN = 100

# Max progress shown in progress bars
MAX_PROGRESS_SHOWN = 10.0

# Number of problems that reward a slowly degrading amount of energy points after the required streak has been reached
# before energy points bottom out for the exercise
DEGRADING_EXERCISES_AFTER_STREAK = 15

# The amount of the streak bar remaining after it becomes reset (this is meant
# to be a makeshift solution to make the3 streak bar appear more forgiving
# while we iterate on a better proficiency measure).
STREAK_RESET_FACTOR = 0.25

# Number of problems after which a non-summative exercise no longer rewards substantive points
# (all problems capped at EXERCISE_POINTS_BASE to avoid 9-correct, 1-wrong streak loophole abuse)
LIMIT_EXERCISES_NON_SUMMATIVE = 150

# Minimum number of energy points available for a correct problem
EXERCISE_POINTS_BASE = 5

# Minimum number of energy points available for a problem in an unfinished exercise
INCOMPLETE_EXERCISE_POINTS_BASE = 15

# Multiplier for energy points in summative assessment problems
SUMMATIVE_EXERCISE_MULTIPLIER = 1.25

# Multiplier for energy points in suggested exercise problems
SUGGESTED_EXERCISE_MULTIPLIER = 3

# Multiplier for energy points in non-proficient exercise problems
INCOMPLETE_EXERCISE_MULTIPLIER = 5

# Base energy points awarded for watching an entire video
VIDEO_POINTS_BASE = 750

# Percentage of video watched required to receive full video watching credit
REQUIRED_PERCENTAGE_FOR_FULL_VIDEO_POINTS = 0.9

# Maximum time we're willing to report that a user worked on a single problem, in seconds
MAX_WORKING_ON_PROBLEM_SECONDS = 600

# Required # of saved problems before we run statistics on a particular exercise
REQUIRED_PROBLEMS_FOR_EXERCISE_STATISTICS = 50

# Number of most recent problems we examine when calculating exercise statistics
LATEST_PROBLEMS_FOR_EXERCISE_STATISTICS = 5000

# Speediest exercise percentile to use when calculating "fast" problem times
FASTEST_EXERCISE_PERCENTILE = 0.25

# Minimum seconds we'd ever require for a "fast" problem
MIN_SECONDS_PER_FAST_PROBLEM = 2.0

# Maximum seconds we'd ever allow for a "fast" problem
MAX_SECONDS_PER_FAST_PROBLEM = 60.0

# Maximum number of days we're willing to postpone a review
MAX_REVIEW_INTERVAL_DAYS = 45

# Default number of days we're willing to postpone a review
DEFAULT_REVIEW_INTERVAL_DAYS = 7

# Minimum number of days we're willing to postpone a review
MIN_REVIEW_INTERVAL_DAYS = 1

# Maximum range of days we'll show on a profile graph
MAX_GRAPH_DAY_RANGE = 30

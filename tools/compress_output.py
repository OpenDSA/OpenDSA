'''Simple utility for compressing the lines of output from building typical opendsa textbooks
Author: Patrick Sullivan
'''

from collections import Counter
import re

def compress_lines(text, target_lines = 60, minimum_streak=5, head_tail_lines=10) -> str:
	'''Takes a large body of text and compresses it based on information minus repetition'''
	if isinstance(text, bytes):
		text = text.decode('UTF-8')
	lines = text.split('\n')
	num_lines = len(lines)
	if num_lines < target_lines:
		print("compress_lines() skipped because target_lines already met")
		return text

	text_splitter = re.compile(r"[\W\d\_]+") # REGEX for non-words, digits, and _
	word_counter = Counter(text_splitter.split(text)) # for calculating word reptitions
	skippable_streak = 0
	skippable_lines = [] # keeps track of lines that could be skipped if they are not near useful lines

	minimum_line_usefulness = target_lines / max(num_lines,target_lines)
	result = lines[0:head_tail_lines] # first and last lines are always kept
	# Compress all middle lines that are part of a repetitive streak:
	for line in lines[head_tail_lines:-1*head_tail_lines]:
		# estimate the usefulness of line as word information minus word repititions
		line_words = text_splitter.split(line)
		line_information = len(line_words) * 15
		line_repetition = sum(word_counter.get(word,0) for word in line_words)
		line_usefulness = (line_information - line_repetition) / max(num_lines,1)
		# For very verbose debugging:::
		# print(f"{line_usefulness-minimum_line_usefulness:.3f} : {line}")

		if minimum_line_usefulness < line_usefulness:
			# line is useful: output any possible skipping; then output all non-skipped lines
			if minimum_streak < skippable_streak:
				result.append(skippable_lines[0])
				result.append(f"[[[Skipped {skippable_streak-1} lines due to repetition (see above)]]]\n")
				skippable_lines.clear()
			elif skippable_lines:
				result.extend(skippable_lines)
				skippable_lines.clear()
			result.append(line)
			skippable_streak = 0
		else:
			# line is not useful, increase streak and add line to skippable_lines if it could survive
			skippable_streak += 1
			if skippable_streak < minimum_streak:
				skippable_lines.append(line)
	
	# Output any final streak or skippable_lines that survived:
	if skippable_lines:
		if skippable_streak < minimum_streak:
			result.extend(skippable_lines)
		else:
			result.append(skippable_lines[0])
			result.append(f"[[[Skipped {skippable_streak-1} lines due to repetition (see above)]]]\n")

	result.extend(lines[-1* head_tail_lines:]) # first and last lines are always kept

	print(f"compress_lines() made lines go from {num_lines} -> {len(result)}")
	return '\n'.join(result)
	

if __name__=='__main__':
	import subprocess
	bookname = 'CS3'
	# bookname = input("Enter book to test pretty output :")
	print("Testing compression of output on a Book:", bookname)
	cmd = f"make {bookname}"
	
	# This way to build books seems to have a very different output:
	# configFilepath = f"config/{bookname}.json"
	# cmd = f"python3 configure.py {configFilepath} --standalone-modules"
	proc = subprocess.run(cmd.split(), cwd="..", capture_output=True)

	print("Return code:", proc.returncode)
	prettyOut = compress_lines(proc.stdout)
	prettyErr = compress_lines(proc.stderr)

	input("Press enter to see resulting stdout and stderr")
	print(" Pretty stdout ".center(80, '#'))
	print(prettyOut)
	print(" Pretty stderr ".center(80, '#'))
	print(prettyErr)
	
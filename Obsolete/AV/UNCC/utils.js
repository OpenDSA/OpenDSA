function difficultyString(ind) {
		switch(ind) {
			case 0: case 1:
				return "Easy"
			case 2: case 3:
				return "Medium"
			default:
				return "Hard"
		}
	}
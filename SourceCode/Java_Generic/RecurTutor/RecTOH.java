void TowersofHanoi(int disk, char source, char dest, char spare) {
  if (disk == 0) {
    move(source, dest); // Move disk from Source to Destination
  } else {
    TowersofHanoi(disk - 1, source, spare, dest);
    // Move disk from Source to Destination
    TowersofHanoi(disk - 1, spare, dest, source);
  }
}

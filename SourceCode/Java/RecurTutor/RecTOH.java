void TowersofHanoi(int topN, char from, char inter, char to) {
    if (topN == 1)
   {
      // Move disk from Source to Destination
   }
   else 
   {
      TowersofHanoi(topN - 1, from, to, inter);
      // Move disk from Source to Destination
      TowersofHanoi(topN - 1, inter, from, to);
    }
}

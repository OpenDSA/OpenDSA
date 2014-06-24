int ELEMSIZE = 32003;
int THRESHOLD = 0;
bool SUCCESS = true;

int main(int argc, char** argv) {
  fstream successfile;
  int* array;
  int i;

  int arraysize;

  Randomize();

  if ((argc < 2) || (argc > 3)) {
    cout << "Usage: <SortTest> <array_size> [<threshold>]\n";
    exit(-1);
  }
  arraysize = atoi(argv[1]);
  if (argc == 3)
    THRESHOLD = atoi(argv[2]);

  cout << "Array size: " << arraysize
       << ", threshold: " << THRESHOLD << "\n";

  array = new int[arraysize];

  for (i=0; i<arraysize; i++)
    array[i] = Random(ELEMSIZE);  // Random

  SUCCESS = sorttest(array, arraysize, THRESHOLD);

  if (SUCCESS) {
    successfile.open("success", ios::out);
    if (!successfile) {
      cout << "Unable to open SUCCESS file :";
      exit(-1);
    }
    successfile << "Success";
  }

  return 0;
}

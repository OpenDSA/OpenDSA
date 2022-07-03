from Bio.Seq import Seq
from Bio.Alphabet import IUPAC
my_seq = Seq("GATCGATGGGCCTATATAGGATCGAAAATCGC", IUPAC.unambiguous_dna)
my_seq[4:12]
my_seq[0::3]
my_seq[::-1]
my_seq[5] = "G"
#TypeError: 'Seq' object does not support item assignment
mutable_seq = my_seq.tomutable()
mutable_seq[5] = "C"
mutable_seq
mutable_seq.remove("T")
mutable_seq

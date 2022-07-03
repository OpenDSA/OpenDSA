from Bio.Seq import Seq
from Bio.Alphabet import IUPAC
messenger_rna = Seq("AUGGCCAUUGUAAUGGGCCGCUGAAAGGGUGCCCGAUAG", IUPAC.unambiguous_rna)
messenger_rna
messenger_rna.translate()
coding_dna.translate(table="Vertebrate Mitochondrial")
coding_dna.translate(table=2)




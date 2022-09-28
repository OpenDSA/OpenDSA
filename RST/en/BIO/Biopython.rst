.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Biopython
=========
**What is  Biopython?**
  * Biopython is a collection of python modules that provide functions to deal with DNA, RNA & protein sequence operations such as reverse complementing of a DNA string, finding motifs in protein sequences, etc.
  * It provides lot of parsers to read all major genetic databases like GenBank, SwissPort, FASTA, etc., as well as wrappers/interfaces to run other popular bioinformatics software/tools like NCBI BLASTN, Entrez, etc., inside the python environment
   =========================================            ========================================================== 
      Uses                                                 Note                                                              
   =========================================            ==========================================================
   Basic Local Alignment Search Tool (Blast)            finds regions of local similarity between sequences                                                   multiple sequence alignment program
   ClustalW                                             multiple sequence alignment program                                          
   GenBank                                              NCBI sequence database                                         
   PubMed and Medline                                   Document database
   ExPASy                                               SIB resource portal (Enzyme and Prosite)  
   SCOP                                                 Structural Classification of Proteins (e.g. ‘dom’,’lin’) 
   UniGene                                              computationally identifies transcripts from the same locus
   SwissProt                                            annotated and non-redundant protein sequence database                                                                
   =========================================            ==========================================================
**Features:**
   * Biopython is portable, clear and has easy to learn syntax.
   * Interpreted, interactive and object oriented.
   * Code to perform classification of data using k Nearest Neighbors, Naive Bayes or Support Vector Machines.
   * Tools to manage protein structures.
   * BioSQL − Standard set of SQL tables for storing sequences plus features and annotations.
   * Access to online services and database, including NCBI services (Blast, Entrez, PubMed) and ExPASY services (SwissProt, Prosite).
   * Access to local services, including Blast, Clustalw, EMBOSS.

**Installing Biopython:**
::
   import Bio
   print(Bio._version__)
   1.76

**Sequence Objects:**
::
   from Bio.Seq import Seq
   my_seq = Seq("AGTACACTGGT")
   my_seq
**the output of code:**
::
   "AGTACACTGGT"
**Bio.Alphabet:**
  * Alphabets used in Seq objects etc to declare sequence type and letters (OBSOLETE).
  * This is used by sequences which contain a finite number of similar words.
  **Submodules of Bio.Alphabet:**
      * Bio.Alphabet.IUPAC module(Standard):Standard nucleotide and protein alphabets defined by IUPAC.
      * Bio.Alphabet.Reduced module:
          Reduced alphabets which lump together several amino-acids into one letter.
          Reduced (redundant or simplified) alphabets are used to represent protein sequences using an alternative alphabet which lumps together several amino-acids into one letter, based on physico-chemical traits. 
           For example, all the aliphatics (I,L,V) are usually quite interchangeable, so many sequence studies group them into one letter

   **code Example:**
   ::
     from Bio.Alphabet import IUPAC
     IUPAC.IUPACProtein.letters
      'ACDEFGHIKLMNPQRSTVWY'

**Example with Bio.Alphabet:**
::
   from Bio.Seq import Seq
   from Bio.Alphabet import IUPAC
   my_seq = Seq("AGTACACTGGT", IUPAC.unambiguous_dna)
   my_seq
   my_seq.alphabet
 
**output** 
::
   Seq('AGTACACTGGT', IUPACUnambiguousDNA())
   IUPACUnambiguousDNA()

**Transcription:**
  
This is a visualization for illsurating Transcription process with Biopython

.. inlineav:: Biopython1 ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Biopython1.css 
   :scripts: AV/BIO/Biopython1.js
   :output: show

The actual biological transcription process works from the template strand, doing a reverse complement
(TCAG -->CUGA) to give the mRNA. However, in Biopython and bioinformatics in general, we typically work directly with **the coding strand because this means we can get the mRNA sequence just by U.**
If you do want to do a true biological transcription starting with the template strand, then this becomes
a two-step process:
::
   template_dna.reverse_complement().transcribe()
   ##'AUGGCCAUUGUAAUGGGCCGCUGAAAGGGUGCCCGAUAG'

.. inlineav:: Biopython2 ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Biopython2.css 
   :scripts: AV/BIO/Biopython2.js
   :output: show


.. inlineav:: Biopython3 ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Biopython3.css 
   :scripts: AV/BIO/Biopython3.js
   :output: show
**Sequence annotation objects**
Sometimes we need more information than the plain sequences, like the name, id, description, and cross references to external databases and annotations

**SeqRecored:**
 ===========              ====================================================================================================================================================================
 ===========              ====================================================================================================================================================================
 seq                      The sequence itself, typically a Seq object.
 id                       The primary ID used to identify the sequence                                          
 name                     A string with the name of the sequence                                         
 dbxrefs                  A list of strings, each string is a database cross reference id} 
 annotations              A dictionary of additional information about the sequence. The keys are the name of the information, and the information is contained in the value  
 features                 A list of SeqFeature objects with more structured information about the features on a sequence(e.g. position of genes on a genome, or domains on a protein sequence)                                                             
 ===========              ====================================================================================================================================================================
**Creating SeqRecord**
::
   from Bio.SeqRecord import SeqRecord
   from Bio.Seq import Seq
   from Bio.Alphabet import generic_protein
   rec = SeqRecord(Seq("mdstnvrsgmksrkkkpkttvidddddcmtcsacqs"\
   + "klvkisditkvsldyintmrgntlacaacgsslkllndfas",generic_protein),
   id="P20994.1", name="P20994",description="Protein A19",
   dbxrefs=["Pfam:PF05077", "InterPro:IPR007769","DIP:2186N"])

**Sequence Input/Output:**
 **Parsing or Reading Sequences**
   * The workhorse function **Bio.SeqIO.parse()** is used to read in sequence data as SeqRecord objects. Thisfunction expects two arguments:
      * The first argument is a handle to read the file name
      * The second argument is a lower case string specifying sequence format
   **Note:** If there is only one sequence in the file, use **SeqIO.read()** instead of  SeqIO.parse()

**Simple FASTA parsing example**
::
   from Bio import SeqIO
   for seq_record in SeqIO.parse("ls_orchid.fasta", "fasta"):
      print(seq_record.id)
      print(repr(seq_record.seq))
      print(len(seq_record))

**output of code:**
:: 
   gi|2765658|emb|Z78533.1|CIZ78533 ## Seq_record.id
   Seq('CGTAACAAGGTTTCCGTAGGTGAACCTGCGGAAGGATCATTGATGAGACCGTGG...CGC', SingleLetterAlphabet())  ## Seq_record.seq
   740 #### len((seq_record))
**Simple GenBank parsing example**
 GenBank Parsing Method is same as Fasta parsing but differencee in arguments of **SeqIO.Parse()**
 ::
   from Bio import SeqIO
   for seq_record in SeqIO.parse("ls_orchid.gbk", "genbank"):
      print(seq_record.id)
      print(repr(seq_record.seq))
      print(len(seq_record))
**Writing Sequence Files**
::
   from Bio.Seq import Seq
   from Bio.SeqRecord import SeqRecord
   from Bio.Alphabet import generic_protein
   rec1 = SeqRecord( Seq("MMYQQGCS",generic_protein),id="gi|14150838|gb|AAK54648.1",description="chalcone synthase [Cucumis sativus]",)

   rec2 = SeqRecord(Seq("YPDYYF",generic_protein,),id="gi|13919613|gb|AAK33142.1|",description="chalcone synthase [Fragaria vesca subsp. bracteata]",)

   rec3 = SeqRecord(Seq("MVTVEE",generic_protein,),id="gi|13925890|gb|AAK49457.1|",description="chalcone synthase [Nicotiana tabacum]",)

   my_records = [rec1, rec2, rec3]
**Now we have a list of SeqRecord objects, we'll write them to a FASTA format:**
::
   from Bio import SeqIO
   SeqIO.write(my_records, "my_example.fa", "fasta")

**BLAST**
BLAST is an alignment algorithm that searches for your sequence of interest in a huge database of sequences whose origins are known. If you didn't know BioPython, you would take your sequence AAAGGAGAGAGAGTTTATA and go to the NCBI BLAST web server and click on buttons like a monkey.
By BioPython we can do this programatically
**Dealing with BLAST can be split up into two steps:**
  * Firstly, running BLAST for your query sequence(s), and getting some output. 
  * Secondly, parsing the BLAST output in Python for further analysis
 .. odsafig:: Images/Blast.png
   :width: 400
   :height: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Complete binary tree node numbering

**Running BLAST over the Internet:**
   * We use the function **qblast()** in the Bio.Blast.NCBIWWW module to call the online version of BLAST
   * Three non-optional arguments:
     * The first argument is the blast program to use for the search, as a lower case string. The options and descriptions of the programs are available at https://blast.ncbi.nlm.nih.gov/Blast.cgi. Currently qblast only works with blastn, blastp, blastx, tblast and tblastx.
     * The second argument species the databases to search against. Again, the options for this are available on the NCBI Guide to BLAST ftp://ftp.ncbi.nlm.nih.gov/pub/factsheets/HowTo_BLASTGuide.pdf.
     * The third argument is a string containing your query sequence. This can either be the sequence itself, the sequence in fasta format, or an identier like a GI number
     ::
        from Bio.Blast import NCBIWWW
        fasta_string = open("m_cold.fasta").read()
        result_handle = NCBIWWW.qblast("blastn", "nt", fasta_string)
        ## We could also have read in the FASTA file as a SeqRecord and then supplied just the sequence itself:
        from Bio.Blast import NCBIWWW
        from Bio import SeqIO
        record = SeqIO.read("m_cold.fasta", format="fasta")
        result_handle = NCBIWWW.qblast("blastn", "nt", record.seq)
**Parsing BLAST output**
Whatever arguments you give the **qblast() function**, you should get back your results in a handle object (by default in XML format). The format of this file is in XML so not easy to read, thankfully BioPython has an XML parser that extracts all the information for us
::
   from Bio.Blast import NCBIXML
   blast_record =NCBIXML.read(result_handle)

**if you have lots of results (i.e., multiple query sequences):**
::
   from Bio.Blast import NCBIXML
   blast_records = NCBIXML.parse(result_handle)

**BLAST record class:**
::
   for alignment in blast_record.alignments:
      for hsp in alignment.hsps:
          print("****Alignment****")
          print("sequence:", alignment.title)
          print("length:", alignment.length)
          print("e value:", hsp.expect)
          print(hsp.query[0:75] + "...")
          print(hsp.match[0:75] + "...")
          print(hsp.sbjct[0:75] + "...")
* **High-scoring Segment Pair (HSP)** is a local alignment with no gaps that achieves one of the highest alignment scores in a given search
.. odsafig:: Images/Alignment.png
   :width: 400
   :height: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Complete binary tree node numbering





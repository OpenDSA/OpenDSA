.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Ari Korhonen, Kasper Hellström (Finnish translations)
   :requires: comparison; sorting terminology
   :satisfies: mergesort
   :topic: Sorting

.. odsalink:: AV/Sorting/mergeCON.css

.. index:: ! Mergesort

Mergesort 
=========

Hajoita ja hallitse on yksi algoritmien suunnittelumenetelmä, johon mm. Mergesort perustuu.
Ajatuksena on jakaa järjestettävä lista alkioita osiin, järjestää osat ja sen jälkeen koota osista järjestyksessä oleva lista.
Yksinkertainen tapa tehdä tämä on jakaa alkuperäinen lista kahtia, järjestää molemmat puolet erikseen ja sen jälkeen
yhdistellä (merge) puolikkaat. Tästä tulee algoritmin nimi :term:`Mergesort` (yhdistelylajittelu). Huom! Merge-operaatio on 
tässä apurutiini itse järjestämismenetelmälle. Seuraavassa sitä ja itse järjestämismenetelmää tarkastellaan erikseen.

Mergesort on pääperiaatteiltaan yksi yksinkertaisimmista järjestämismenetelmistä.
Se on tehokas järjestämismenetelmä sekä asymptoottisessa mielessä että käytännössä.
Vaikka sen pääperiaate onkin yksinkertainen, niin sen implementaatio ei välttämättä sitä kuitenkaan ole.
Seuravassa on hahmoteltu Mergesort pseudokoodina::

    List mergesort(List inlist) {
      if (inlist.length() <= 1) return inlist;;
      List L1 = half of the items from inlist;
      List L2 = other half of the items from inlist;
      return merge(mergesort(L1), mergesort(L2));
    }

Seuraavassa on visualisaatio, joka havainnollistaa Mergesortin toimintaa.

.. avembed:: AV/Sorting/mergesortAV.html ss

Koko algoritmin ymmärtämiseksi on tunnettavat merge-operaation toiminta.
Siinä tutkitaan pareittain alilistoja ja valitaan yhdistettyyn listaan aina jommasta kummasta listasta pienempi alkio.
Tätä jatketaan koostamalla pitenevistä listoista yhä pidempiä listoja. Listoja käydään läpi vasemmalta oikealle ja
yhdistettyyn listaan valitaan uusi alkio siitä listasta, jossa on sillä hetkellä pienempi alkio kunnes lista tyhjenee.  

Seuraavassa on esitetty merge-operaation pseudokoodi::

    List merge(List L1, List L2) {
      List answer = new List();
      while (L1 != NULL || L2 != NULL) {
        if (L1 == NULL) { // Done L1
          answer.append(L2);
          L2 = NULL;
        }
        else if (L2 == NULL) { // Done L2
          answer.append(L1);
          L1 = NULL;
        }
        else if (L1.value() <= L2.value()) {
          answer.append(L1.value());
          L1 = L1.next();
        }
        else {
          answer.append(L2.value());
          L2 = L2.next();
        }
      }
      return answer;
    }

Seuraavassa on merge-operaation visualisaatio.

.. inlineav:: mergesortCON ss
   :output: show

Kokeile seuraavaa merge-operaation lämmittelytehtävää.

.. avembed:: Exercises/Sorting/MergesortMergePRO.html ka

Seuraavassa on harjoitustehtävä, jossa on mukana myös listojen jako pienempiin rekursiivisesti. 

.. avembed:: AV/Sorting/mergesortPRO.html pe

Mergesortin analyysi on suhteellisen helppo siitäkin huolimatta, että se on rekursiivinen algoritmi. 

Yhdistely vie lineaarisen ajan :math:`\Theta(i)` jossa :math:`i` on yhdistettävien listojen yhteispituus.

.. _MergeSortFig:

.. odsafig:: Images/MrgSort.png
   :width: 250
   :alt: Mergesort
   :capalign: center
   :figwidth: 90%
   :align: center

   Mergesort-esimerkki, joka havainnollistaa analyysiä.

Kuvassa :num:`Figure #MergeSortFig` järjestettävä lista alkioita jaetaan toistuvasti kahtia, kunnes alilistan koko on 1.
Yhden kokoiset listat on yhdistelty listoiksi, joiden pituus on 2.
Kahden kokouset listat on yhdistelty listoiksi, joiden pituus on 4, jne.
Näin ollen rekursion syvyys on  :math:`\log n` kun järjestetään :math:`n`
alkiota (oletetaan yksinkertaisuuden vuoksi, että  :math:`n` kahden potenssi).
Rekursiohistorian ensimmäinen taso voidaan tulkita siten, että järjestetään listaa, jonka pituus on :math:`n`.
Seuravalla tasolla järjestetään kahta listaa, joiden pituudet ovat :math:`n/2`. 
Sitä seuraavalla tasolla järjestetään neljää listaa, joiden pituudet ovat :math:`n/4`, ja niin edelleen.
Alimmalla tasolla on :math:`n` listaa, joiden pituus on 1.
Kun :math:`n` yhden alkion pituista listaa  yhdistellään tarvitaan :math:`\Theta(n)` askelta. Kun :math:`n/2` kahden alkion pituista listaa
yhdistetään tarvitaan jälleen :math:`\Theta(n)` askelta. Samoin kun :math:`n/4` neljän alkion pituista listaa järjestetään, jne.
Tasoja on :math:`\log n` ja jokainen taso edellyttää :math:`\Theta(n)` askelta, jolloin koko algoritmin
suoritus vie :math:`\Theta(n \log n)`.
Suoritettavien askelten määrään ei vaikuta alkuperäisen listan alkioiden järjestys, jollon Mergesort toimii aina `\Theta(n \log n)` ajassa 
(paras, keskimääräinen ja pahin tapaus).

.. odsascript:: AV/Sorting/mergesortCON.js

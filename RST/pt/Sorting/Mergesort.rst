.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: comparison; sorting terminology
   :satisfies: mergesort
   :topic: Sorting

.. index:: ! Mergesort

Conceitos do Mergesort
======================

Uma abordagem natural para a solução de problema é dividir e conquistar.
Para utilizarmos a técnica de dividir e conquistar na ordenação devemos considerar
a divisão da lista a ser ordenada em partes, processar as partes
e depois juntá-las de volta de alguma forma.
Uma maneira simples de fazer isso seria dividir a lista no meio
ordenar as duas metades e depois mesclá-las novamente.
Essa é a ideia por detrás do termo :term:`Mergesort`.

Mergesort é, conceitualmente falando, um dos mais simples algoritmos de ordenação,
apresentando boa performance, tanto em termos assintóticos quanto em termos
de desempenho empírico.
Infelizmente, embora esteja baseado num conceito simples, é relativamente
complicado de implementar na prática.
Aqui temos um pseudocódigo do Mergesort::

    List mergesort(List inlist) {
      if (inlist.length() <= 1) return inlist;;
      List L1 = half of the items from inlist;
      List L2 = other half of the items from inlist;
      return merge(mergesort(L1), mergesort(L2));
    }

E aqui uma visualização que ilustra seu funcionamento:

.. avembed:: AV/Sorting/mergesortAV.html ss

A parte mais difícil no entendimento do Mergesort é a função de mesclagem.
Ela começa examinando o primeiro registro de cada sublista e escolhe o menor
entre eles para se tornar o menor da lista.
Esse primeiro menor valor é removido de sua sublista e colocado na lista de saída.
A mesclagem continua dessa maneira, comparando os valores frontais de cada sublista
e continuamente adicionando o menor à lista de saída até que não reste nenhum.
Aqui está o pseudocódigo de mesclagem de listas::

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

Aqui uma visualização da operação de mesclagem:

.. inlineav:: mergesortCON ss
   :output: show

E aqui um exercício de aquecimento para praticar a mesclagem:

.. avembed:: Exercises/Sorting/MergesortMergePRO.html ka


Agora, um exercício completo de proficiência, juntando tudo:

.. avembed:: AV/Sorting/mergesortPRO.html pe

A análise do Mergesort é bastante direta, a despeito de ser um algoritmo que usa recursão.
A parte de mesclagem requer o tempo :math:`\Theta(i)` onde :math:`i` é o comprimento
total das duas sublistas sendo mescladas.

   .. _MergeSortFig:

   .. odsafig:: Images/MrgSort.png
      :width: 250
      :alt: Mergesort
      :capalign: center
      :figwidth: 90%
      :align: center

Exemplo do Mergesort para ilustrar a análise.

Como podemos ver na Figura :num:`Figure #MergeSortFig`, a lista a ser ordenada é repetidamente
divida pela metade até que sublistas de tamanho 1 sejam obtidas. Essas listas de tamanho 1
são mescladas para formar listas de tamanho 2. Listas de tamanho 2 são mescladas para formar
listas de tamanho 4, e assim por diante.
Dessa forma, o número de recursões é :math:`\log n` para :math:`n` registros (assuma,
por simplicidade, que :math:`n` é uma potência de dois).
O primeiro nível de recursão pode ser visto como agindo sobre uma lista de tamanho :math:`n`,
o nível seguinte agindo sobre uma lista de tamanho :math:`n/2`, o seguinte agindo em quatro
listas de tamanho :math:`n/4`, e assim por diante.
No início a recursão tem :math:`n` listas de tamanho 1. Então, :math:`n` listas de tamanho 1
são mescladas (requerendo um total de :math:`\Theta(n)` passos), :math:`n/2` listas de tamanho 2
(novamente requerendo :math:`\Theta(n)` passos), :math:`n/4` listas de tamanho 4 e assim por diante.
A cada um dos :math:`\log n` níveis de recursão, :math:`\Theta(n)` trabalho é realizado, para
um custo total de :math:`\Theta(n \log n)`.
Esse custo não é afetado pela ordem relativa dos valores sendo ordenados, e desse forma essa análise
se aplica tanto para o pior caso quanto para o melhor e médio casos.

.. odsascript:: AV/Sorting/mergesortCON.js

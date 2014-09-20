.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: algorithm analysis chapter introduction
   :topic: Algorithm Analysis

Introdução do Capítulo
======================

Quanto tempo demorará para processar a folha de pagamentos da empresa
depois que tivermos realizado a fusão planejada?
Eu deveria comprar uma novo programa de folha de pagamentos do
fornecedor X ou Y?
Caso um programa em particular seja lento, ele está mal implementado
ou está resolvendo um problema muito difícil?
Questões como essa nos levam a considerar a dificuldade de um
problema, ou a eficiência relativa de duas ou mais abordagens para
solucionar um problema.

Este capítulo introduz a motivação, notação básica, e as técnicas
fundamentais de análise de algoritmos.
Nós focamos numa metodologia conhecida como
:term:`análise assintótica de algoritmos`, ou simplesmente
:term:`análise assintótica`.
A análise assintótica tenta estimar os recursos consumidos por um
algoritmo.
Ela nos permite comparar os custos relativos de dois ou mais
algoritmos na solução do mesmo problema.
A análise assintótica também fornece aos projetistas de algoritmos uma
ferramenta para estimar se uma solução proposta tem chance de
contemplar as limitações de recursos para um problema antes que
implementem um programa real.
Após a leitura desse capítulo, você deverá entender

* o conceito de :term:`taxa de crescimento`,
a taxa na qual o custo de um algoritmo cresce à medida em que o
tamanho da entrada cresce;

* o conceito de :term:`limite superior` e :term:`limite inferior` para
  uma taxa de crescimento, e como estimar esses limites para um
  programa simples, algoritmo ou problema; e

* a diferença entre o custo de um :term:`algoritmo` (ou programa) e o
  custo de um :term:`problema`.

O capítulo conclui com uma breve discussão sobre as dificuldades
práticas encontradas quando medimos empiricamente o custo de um
programa, e alguns princípios de aperfeiçoamento na codificação para
aumentar a eficiência do programa.

.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: best and worst case
   :topic: Algorithm Analysis

Melhor Caso, Pior Caso e Caso Médio
===================================

Considere o problema de encontrar o fatorial de :math:`n`. Para esse
problema há apenas uma entrada de um dado "tamanho" (quer dizer,
existe uma única instância para cada tamanho de :math:`n`). Agora
considere o algoritmo de :term:`busca sequencial pelo maior valor`, o
qual sempre examina cada valor do array. Esse algoritmo processa
muitas entradas de um dado tamanho :math:`n`. Ou seja, existem muitos
arrays possíveis de um dado tamanho. Contudo, não importa qual seja o
tamanho :math:`n` do array pesquisado pelo algoritmo, seu custo será
sempre o mesmo, no sentido de que o algoritmo sempre verifica cada
elemento do array exatamente uma vez.

Para alguns algoritmos, diferentes entradas de um dado tamanho
requerem tempos diferentes.
Por exemplo, considere o problema de pesquisa num array contendo
:math:`n` inteiros para encontrar um particular valor :math:`K` (assuma
que :math:`K` aparece apenas uma vez no array). O algoritmo de
:term:`busca sequencial` começa na primeira posição do array e verifica
cada valor até encontrar :math:`K`.
Uma vez que :math:`K` seja localizado, o algoritmo para.
Isso é diferente  do algoritmo de busca sequencial pelo maior valor, o qual sempre
examina cada valor no array.

Há uma larga faixa de possíveis tempos de execução para o algoritmo de
busca sequencial.
O primeiro inteiro no array poderia ser o valor :math:`K`, e nesse
caso apenas um inteiro seria examinado.
Nesse caso o tempo é curto.
Esse é o :term:`melhor caso` para esse algoritmo, porque não é
possível para um algoritmo de busca verificar menos do que um
valor. Alternativamente, se o valor :math:`K` está na última posição
do array, então o tempo de execução é relativamente longo, porque o
algoritmo deve examinar :math:`n` valores.
Esse é o :math:`pior caso` para esse algoritmo, porque o algoritmo
nunca pode verificar uma quantidade de valores no array maior do que
:math:`n`.
Caso implementemos a busca sequencial como um programa e o executemos
várias vezes com diferentes entradas de tamanho :math:`n`, ou façamos
buscas por vários valores diferentes de :math:`K` no mesmo array,
esperamos que o algoritmo, na média, tenha que percorrer a metade do
array antes de localizar o valor procurado. Na média, o algoritmo
examina :math:`n/2` valores. Chamamos isso de :term:`caso médio` para
esse algoritmo.

Quando analisamos um algoritmo, deveríamos estudar seu melhor caso,
pior caso ou o caso médio?
Normalmente não estamos interessados no melhor caso, porque ele
acontece raramente e, de maneira geral, seria muito otimismode nossa
parte fazer uso dele para uma caracterização justa do tempo de
execução do algoritmo.
Em outras palavras, análises baseadas no melhor caso provavelmente não
são representativas do comportamento do algoritmo.
Contudo, há raras ocasiões onde uma análise de melhor caso é útil
|---| em particular, quando o melhor caso tem alta probabilidade de
ocorrência.
Ambos os algoritmos :ref:`Shellsort <shellsort> <Shellsort>` e
:ref:`Quicksort <Quicksort> <Quicksort>` podem se aproveitar do tempo
de execução para o melhor caso do :ref:`Insertion Sort <Insertion
Sort> <InsertionSort>` de forma a tornarem-se mais eficientes.

E sobre o pior caso?
A vantagem de se analisar o pior caso é que você tem a certeza de que
o algoritmo terá, no mínimo, aquela performance. Isso é especialmente
importante em aplicações de tempo real, tais como as de computadores
que monitoram sistemas de controle de tráfego aéreo. Aqui, não seria
aceitável usar um algoritmo que pudesse controlar :math:`n` aeronaves
rapidamente o suficiente *a maior parte do tempo*, mas que falhasse
ao tentar executar em tempo hábil quando :math:`n` aeronaves
estivessem todas vindos da mesma direção.

Para outras aplicações |---| particularmente quando desejamos agregar o
custo de executar o programa muitas vezes com diferentes entradas
|---| a análise de pior caso pode não ser a mais representativa da
performance do algoritmo.
Frequentemente preferimos conhecer o tempo de execução para o caso
médio. Significa que gostaríamos de conhecer o comportamento *típico*
do algoritmo com entradas de tamanho :math:`n`.
Infelizmente, análises de caso médio nem sempre são
possíveis. Análises de caso médio primeiro requerem que entendamos
como as entradas (e seus custos) estão distribuidas com respeito ao
conjunto de todas as possíveis entradas para o programa.
Por exemplo, foi afirmado anteriormente que o algoritmo de busca
sequencial, na média, examina metade dos valores do array. Isso só é
verdade se o elemento de valor :math:`K` tiver probabilidade de
aparecer igualmente em qualquer posição do array. Caso essa premissa
não seja verdadeira, o algoritmo *não* necessariamente examinará
metade dos valores do array no caso médio.

As peculiaridades da distribuição de dados tem um efeito significativo
em vários algoritmos de busca, tais como aqueles baseados em
:ref:`hashing <hashing> <HashIntro>` e árvores de busca como :ref:`BST
<binary search tree> <BST>`.
Suposições incorretas sobre distribuição de dados podem ter
consequências desastrosas no espaço requerido ou na performance de
tempo de um programa. Distribuições pouco usuais podem também ser
usadas em nosso benefício, tal como é feito por :ref:`self-organizing
lists <self-organizing list> <SelfOrg>`.

Em resumo, para aplicações de tempo real provavelmente iremos preferir
a análise de pior caso dos algoritmos. Por outro lado, frequentemente
desejaremos uma análise de caso médio se conhecermos suficientemente a
distribuição de nossos dados de entrada no caso médio. Se não,
deveremos recorrer à análise de pior caso.

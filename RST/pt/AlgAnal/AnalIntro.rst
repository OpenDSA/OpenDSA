.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: growth rate
   :topic: Algorithm Analysis

Comparando Algoritmos
=====================

Como você compara dois algoritmos para a solução de um problema em
termos de eficiência?
Poderíamos implementar ambos os algoritmos como programas de
computador e então executá-los com uma faixa de entradas apropriadas,
medindo a quantidade de recursos que cada programa usa.
Essa abordagem é, frequentemente, insatisfatória por quatro razões.
Primeiro, há o esforço envolvido na programação e depuração de dois
algoritmos quando, na melhor hipótese, você só deseja manter um.
Segundo, quando comparamos dois algoritmos empiricamente há sempre a
possibilidade de que um dos programas esteja "melhor escrito" do que o
outro, e, portanto, as qualidades relativas dos algoritmos subjacentes
não estão realmente representadas pelas implementações.
Isso pode facilmente ocorrer quando um dos programadores está de
alguma forma inclinado a favor de um dos algoritmos.
Terceiro, a escolha dos testes empíricos pode favorecer injustamente
um dos algoritmos.
Quarto, você pode chegar à conclusão que mesmo sendo melhor, o
algoritmo não cabe no seu orçamento.
Nesse caso terá de recomeçar todo o processo do início, com uma nova
implementação para um novo algoritmo.
Mas, como você poderá saber se algum algoritmo pode acomodar suas
limitações orçamentárias? Talvez o problema seja simplesmente muito
difícil para qualquer implementação dentro do orçamento.

Esse problemas podem frequentemente ser evitados, usando-se análise
assintótica.
A análise assintótica mede a eficiência de um algoritmo, ou de sua
implementação como um programa, à medida em que o tamanho da entrada
se torna maior.
Ela é na verdade uma técnica de estimativa e nada nos diz sobre os
méritos de dois programas onde um é ligeiramente mais veloz que o
outro.
Contudo, a análise assintótica tem-se mostrado útil para cientistas da
computação que precisam determinar se um particular algoritmo merece
ser implementado.

O recurso mais crítico para um programa é, frequentemente, o tempo de
execução.
Contudo, você não pode se preocupar somente com o tempo de execução.
Deve preocupar-se também com outros fatores tais como espaço requerido
para rodar o programa (tanto em termos de memória principal quanto
espaço em disco). Tipicamente você irá analisar o *tempo* requerido
para um *algoritmo* (ou o instanciamento de um algoritmo na forma de
um programa), e o espaço necessário para as *estruturas de dados*.

Muitos fatores afetam o tempo de execução de um programa. Alguns se
relacionam ao ambiente no qual o programa é compilado e executado,
Alguns fatores incluem a velocidade da CPU do computador, barramento,
e periféricos de hardware.
A competição com outros usuários pelos recursos do computador (ou da
rede) podem fazer um computador tornar-se lento como uma lesma.
A linguagem de programação e a qualidade do código gerado por um
compilador em particular podem ter um efeito significativo.
A "perícia na codificação" por parte do programador que converte o
algoritmo em programa pode ter tremendo impacto também.

Se você precisa ter um programa rodando dentro das limitações de tempo
e espaço num computador em particular, todos esses fatores podem ser
relevantes.
Ainda assim, nenhum desses fatores aborda as diferenças entre dois
algoritmos ou estruturas de dados.
Para ser justo, se quer comparar dois programas derivados do mesmo
algoritmo, para resolver o mesmo problema, precisa garantir que ambos
sejam compilados no mesmo compilador e que rodem no mesmo computador
sob as mesmas condições.
Tanto quanto possível, o mesmo zelo deve devotado nos esforços de
programação por cada um dos programadores, de forma a fazer as
implementações "igualmente eficientes".
Nesse sentido, todos os fatores mencionados acima deveriam se cancelar
mutuamente, em termos da comparação, porque se aplicam a ambos os
algoritmos igualmente.

Se você realmente deseja entender o tempo de execução de um algoritmo,
há outros fatores que são mais apropriados para se considerar do que
velocidade da máquina, linguagem de programação, compilador
etc. Idealmente nós deveríamos medir o tempo de execução de um
algoritmos sob condições de referência padronizadas.
Contudo, não temos outro meio de calcular o tempo de execução de forma
confiável a não ser executando uma implementação do algoritmo em algum
computador. A única alternativa é usar alguma outra forma de medida
como substituto para o tempo de execução.

Operações Básicas e Tamanho da Entrada
--------------------------------------

Uma consideração primária quando estamos estimando a performance de um
algoritmo é o número de :term:`operações básicas` requeridas pelo
algoritmo para processar uma entrada de um certo tamanho. A expressão
"operações básicas" e o termo "tamanho" são um tanto quanto vagos e
dependem do algoritmo sendo analisado. Tamanho frequentemente é o
número de entradas processadas. Por exemplo, quando estamos comparando
algoritmos de ordenação o tamanho do problema tipicamente é medido
pelo número de registros sendo ordenados.
Uma operação básica deve ter a propriedade de que o tempo necessário
para que se complete não dependa de valores particulares de
operandos. Adicionar ou comparar duas variáveis inteiras são exemplos
de operações básicas na maior parte das linguagens de programação.
Somar o conteúdo de um array contendo :math:`n` inteiros não é, porque
o custo depende do valor de :math:`n` (i.e., do tamanho da entrada).

.. _SeqMax:

.. topic:: Example
   
   Considere um algoritmo simples para resolver o problema de
   encontrar o maior valor em um array de :math:`n` inteiros. O
   algoritmo verifica cada inteiro, salvando a posição do maior valor
   encontrado até o momento.
   Esse algoritmo é denominado *busca sequencial pelo maior valor* e é
   ilustrado pelo seguinte função:

   .. codeinclude:: Misc/Largest

   Aqui, o tamanho do problema é ``A.lenght``, o número de inteiros
   armazenados no array ``A``. A operação básica é a comparação entre
   um inteiro e o maior encontrado até o momento.
   É razoável assumir que cada comparação consome um tempo fixo,
   independentemente dos valores dos dois inteiros ou de suas posições
   no array.

   Já que o fator mais relevante afetando o tempo de execução é
   normalmente o tamanho da entrada, para um dado tamanho de entrada
   :math:`n` nós frequentemente expressamos o tempo :math:`\mathbf{T}`
   para executar o algoritmo como uma função de :math:`n`, escrita
   como :math:`mathbf{T}`. Sempre assumimos que :math:`\mathbf{T}` é
   um valor não negativo.

   Vamos chamar :mat:`c` a quantidade de tempo requerido para comparar
   dois inteiros na função ``largest``
   Não nos importaremos agora com o valor preciso que :math:`c` pode
   ter. Nem estamos preocupados com o tempo requerido para incrementar
   a variável :math:`i` porque isso deve ser feito para cada valor no
   array, ou com o tempo de atribuição quando um valor maior é
   encontrado, ou ainda com o pequeno tempo extra necessário para
   inicializar ``currlarge``.
   Queremos apenas uma aproximação razoável para o tempo de execução
   do algoritmo.
   O tempo total de execução de ``largest`` é, portanto, aproximadamente
   :math:`cn`, porque devemos realizar :mat:`n` comparações, cada uma
   das quais consumindo um tempo :math:`c`.
   Dizemos que a função ``largest`` (e por estensão, o algoritmo de
   busca sequencial pelo maior valor para uma implementação típica)
   tem um tempo de execução expresso pelo equação

   .. math::

      \mathbf{T}(n) = cn.

   Essa equação descreve a taxa de crescimento para o tempo de
   execução do algoritmo busca sequencial pelo maior valor.

.. topic:: Example

   O tempo de execução de um comando que atribui o primeiro valor de um
   array de inteiros a uma variável é simplesmente o tempo requerido
   para copiar o valor da primeira posição do array.
   Podemos assumir que essa atribuição consome um tempo constante
   independentemente do valor.
   Vamos chamar :math:`c_1` o montante de tempo necessário para copiar
   um inteiro.
   Não importa quão grande seja o array, num computador típico (dadas
   condições razoáveis de memória e tamanho do array), o tempo
   requerido para copiar o valor da primeira posição do array é sempre
   :math:`c_1`. Então, a equação para esse algoritmo é simplesmente

   .. math::

      \mathbf{T}(n) = c_1,

   indicando que o tamanho da entrada :math:`n` não tem efeito sobre o
   tempo de execução.
   Isso é chamado de :term:`tempo constante de execução`.

.. topic:: Example

   Considere o código a seguir:

   .. codeinclude:: Misc/Anal
	:tag: Analp1

   Qual é o tempo de execução para esse fragmento de código?
   Evidentemente, ele leva mais tempo para executar quando :math:`n` é
   maior. A operação básica nesse exemplo é a operação de incremento
   da variável ``sum``. Podemos assumir que o incremento toma um tempo
   constante; chamemos esse tempo :math:`c_2`. (Podemos ignorar o
   tempo requerido para inicializar ``sum``, e para incrementar os
   contadores do laço ``i`` e ``j``. Na prática, esses custos podem
   ser seguramente incorporados pelo tempo :math:`c_2`.) O número
   total de operações de incremento é :math:`n^2`. Dessa forma,
   dizemos que o tempo de execução é :math:`\mathbf{T}(n) = c_2 n^2`.

Taxa de Crescimento
-------------------

O termo :term:`taxa de crescimento` para um algoritmo é a taxa na qual
o custo do algoritmo cresce à medida em que o tamanho da entrada
cresce. A figura a seguir mostra um gráfico para seis equações, cada
uma descrevendo o tempo de execução para um particular programa ou
algoritmo.
Uma variedade de taxas de crescimento que são representativas de
algoritmos típicos é mostrada.

.. _RunTimeGraph:

.. odsafig:: Images/plot.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: A taxa de crescimento para cinco equações

   Duas vistas de um gráfico ilustrando as taxas de crescimento para
   seis equações.
   A vista de baixo mostra em detalhes a porção inferior esquerda da
   vista superior.
   O eixo horizontal representa o tamanho da entrada.
   O eixo vertical pode representar tempo, espaço ou qualquer outra
   medida de custo.

As duas equações rotuladas :math:`10n` e :math:`20n` estão
representadas por linhas retas.
Uma taxa de crescimento de :math:`cn` (para :math:`c` uma constante
qualquer positiva) é frequentemente referida como um tempo de execução
linear ou :term:`taxa de crescimento linear`. Isso significa que à
medida que o valor de :math:`n` cresce o tempo de execução do
algoritmo cresce na mesma proporção.
Dobrar o valor da variável :math:`n`, dobra o tempo de execução.
Um algoritmo cuja equação de tempo de execução contém seu termo de
ordem mais alta da ordem de :math:`n^2` é dito ter uma :term:`taxa de
crescimento quadrática`.
Na figura, a linha rotulada :math:`2n^2` representa uma taxa de
crescimento quadrática.
A linha rotulada :math:`2^n` representa uma :term:`taxa de
crescimento exponencial`.
Esse nome vem do fato de que :math:`n` aparece no expoente.
A linha rotulada :math:`n!` também cresce exponencialmente.

Como você pode ver na figura, a diferença entre um algoritmo cujo
tempo de execução tem custo igual a :math:`\mathbf{T}(n) = 10n` e
outro cujo custo é :math:`\mathbf{T}(2n^2)` torna-se tremenda à medida
em que :math:`n` cresce. Para :math:`n>5`, o algoritmo cujo tempo de
execução é :math:`\mathbf{T}(n) = 2n^2` já muito mais lento. Isso a
despeito do fato de que :math:`10n` tem um fator constante maior do
que :math:`2n^2`.
Uma comparação entre as duas curvas marcadas com :math:`20n` e
:math:`2n^2` mostra que que mudar o fator constante para uma das
equações apenas desloca o ponto no qual as duas curvas se intersectam.
Para :math:`n>10`, o algoritmo com custo :math:`\mathbf{T}(n) = 2n^2`
é mais lento do que o algoritmo com custo :math:`\mathbf{T}(n) =
20n`. Esse gráfico também mostra que a equação :math:`\mathbf{T}(n) =
5 n \log n` cresce um pouco mais rapidamente do que
:math:`\mathbf{T}(n) = 10 n` e :math:`\mathbf{T}(n) = 20 n` mas não tanto
quanto a equação :math:`mathbf{T}(n) = 2n^2`.
Para constantes :math:`a, b > 1, n^a` cresce mais rapidamente do
que :math:`\log^b n` ou :math:`\log n^b`.
Finalmente, algoritmos com custo :math:`mathbf{T}(n) = 2^n` ou
:math:`mathbf{T}(n) = n!` são proibitivamente custosos em termos de
recursos até mesmo para valores modestos de :math:`n`.
Note que para constantes :math:`a, b \geq 1, a^n` cresce mais
rapidamente do que :math:`n^b`.

Podemos ter uma visão mais profunda a respeito das taxas de
crescimento relativo para vários algoritmos a partir das tabelas a
seguir.
A maior parte das taxas de crescimento que aparecem nos algoritmos
típicos são mostradas, junto com algumas entradas de tamanhos
representativos.
Mais uma vez, vemos que a taxa de crescimento tem um tremendo efeito
no consumo de recursos, por parte de um algoritmo.

.. _GrowthTable:

.. topic:: Table

   Custos para taxas de crescimento representativas.

   .. math::

      \begin{array}{c|c|c|c|c|c|c|c}
      \mathsf{n} & \mathsf{\log \log n} & \mathsf{\log n} & \mathsf{n} &
      \mathsf{n \log n} & \mathsf{n^2} & \mathsf{n^3} & \mathsf{2^n}\\
      \hline
      \mathsf{16} & \mathsf{2} & \mathsf{4} & \mathsf{2^{4}} &
      \mathsf{4 \cdot 2^{4} = 2^{6}} &
      \mathsf{2^{8}} & \mathsf{2^{12}} & \mathsf{2^{16}}\\
      \mathsf{256} & \mathsf{3} & \mathsf{8} & \mathsf{2^{8}} &
      \mathsf{8 \cdot 2^{8} = 2^{11}} &
      \mathsf{2^{16}} & \mathsf{2^{24}} & \mathsf{2^{256}}\\
      \mathsf{1024} & \mathsf{\approx 3.3} & \mathsf{10} & \mathsf{2^{10}} &
      \mathsf{10 \cdot 2^{10} \approx 2^{13}} &
      \mathsf{2^{20}} & \mathsf{2^{30}} & \mathsf{2^{1024}}\\
      \mathsf{64 {\rm K}} & \mathsf{4} & \mathsf{16} & \mathsf{2^{16}} &
      \mathsf{16 \cdot 2^{16} = 2^{20}} &
      \mathsf{2^{32}} & \mathsf{2^{48}} & \mathsf{2^{64 {\rm K}}}\\
      \mathsf{1 {\rm M}} & \mathsf{\approx 4.3} & \mathsf{20} & \mathsf{2^{20}} &
      \mathsf{20 \cdot 2^{20} \approx 2^{24}} &
      \mathsf{2^{40}} & \mathsf{2^{60}} & \mathsf{2^{1 {\rm M}}}\\
      \mathsf{1 {\rm G}} & \mathsf{\approx 4.9} & \mathsf{30} & \mathsf{2^{30}} &
      \mathsf{30 \cdot 2^{30} \approx 2^{35}} &
      \mathsf{2^{60}} & \mathsf{2^{90}} & \mathsf{2^{1 {\rm G}}}\\
      \end{array}

.. todo::
   :type: Exercise

   De uma lista grande de funções de taxas de crescimento, selecione
   seis e forneça aos alunos, aleatoriamente. Eles deverão colocá-las
   em ordem de crescimento. Deve haver exercícios KA (não exercícios
   do OpenDSA) do tipo "coloque em ordem", com bibliotecas de
   suporte. Uma implementação alternativa: use um array JSAV invisível para
   armazenar strings.

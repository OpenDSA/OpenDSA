Binary Vs Ternary Relationships
============================

**This section is devoted for:**

•  proving the fact that ***The Ternary relationship is not equivalent to multiple binary relationships**.

• Improving readers’ understanding for ternary relationships.

• When ternary relationship is required and when it isn't?

**This is achieved by:** presenting two problem statements for two different stores' policies of the same application domain.

The design solution of each problem should relate the same three entities. As the two stores have different working policies, so they have to use different ways to relate those entities so as to comply with the requirements of each store.

After presenting the problems, the reader will find that; the solution of the first problem (Store X) requires the use of a ternary relationship between the three entities, whereas the solution of the second problem (Store Y) requires the use of two binary relationships between the same three entities.

**For each problem statement:** $(Store$ $X$ $&$ $Store$ $Y$ $problems)$, all possible solutions that the designer may think of will be analysed starting with the wrong ones and finally presents the right solution. This aims to better understand the drawbacks of the wrong designs. And helps the reader to identify the circumstances in which a ternary relationship between three
entities is required.

General Problem Statement
_________________________

• Both solutions require definning three entities (distributor, product, country).

• The distributor entity is identified by distributor number and has name attribute. 

• Country is identified by country number and and has name attribute

• Product is identified by product number and also has name attribute.

**Tip:** Before start watching the visualizations you should obey all step by step instructions given in the slides for better understanding.


**General problem statement and Store X first solution illustration:**

.. inlineav:: TernaryRelationship ss
   :long_name: TernaryRelationshipEx Slideshow
   :links: AV/Database/TernaryRelationship.css
   :scripts: AV/Database/TernaryRelationship.js
   :output: show

Ternary Relationship Example (Store X)
___________________________________

**Store X second solution illustration:**

.. inlineav:: TernaryRelationshipStoreXSol2 ss
   :long_name: TernaryRelationshipStoreXSol2Ex Slideshow
  :links: AV/Database/TernaryRelationshipStoreXSol2.css
   :scripts: AV/Database/TernaryRelationshipStoreXSol2.js
   :output: show

**Store X third solution illustration:**

.. inlineav:: TernaryRelationshipStoreXSol3 ss
   :long_name: TernaryRelationshipStoreXSol3Ex Slideshow
  :links: AV/Database/TernaryRelationshipStoreXSol3.css
   :scripts: AV/Database/TernaryRelationshipStoreXSol3.js
   :output: show

**Store X forth solution illustration:**

.. inlineav:: TernaryRelationshipStoreXSol4 ss
   :long_name: TernaryRelationshipStoreXSol4Ex Slideshow
  :links: AV/Database/TernaryRelationshipStoreXSol4.css
   :scripts: AV/Database/TernaryRelationshipStoreXSol4.js
   :output: show

Binary Relationship Example (Store Y)
_____________________________________

**Store Y first & second solutions' analysis:**

.. inlineav:: TernaryRelationshipStoreYSol1 ss
   :long_name: TernaryRelationshipStoreYSol1Ex Slideshow
  :links: AV/Database/TernaryRelationshipStoreYSol1.css
   :scripts: AV/Database/TernaryRelationshipStoreYSol1.js
   :output: show

**Store Y third & forth solutions' analysis:**

.. inlineav:: TernaryRelationshipStoreYSol3 ss
   :long_name: TernaryRelationshipStoreYSol3Ex Slideshow
  :links: AV/Database/TernaryRelationshipStoreYSol3.css
   :scripts: AV/Database/TernaryRelationshipStoreYSol3.js
   :output: show
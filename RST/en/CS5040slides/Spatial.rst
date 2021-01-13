.. avmetadata::
   :author: Bob Edmison

.. slideconf::
   :autoslides: False

=============
Spatial Trees
=============

Spatial Trees
-------------

.. slide:: Spatial Trees

    Search trees such as BSTs, AVL trees, splay trees, 2-3 Trees, B-trees, and tries are designed for
    searching on a one-dimensional key.

    Some databases require support for multiple keys. In other words, records can be searched for using any one of several key fields, such as name or ID number.

.. slide:: PR Quadtree

    - :term:`Point-Region quadtree` (hereafter referred to as the :term:`PR quadtree`) each node either has exactly four children or is a leaf.

    - full four-way branching (4-ary) tree in shape.

    - The PR quadtree represents a collection of data points in two dimensions by decomposing the region containing the data points into four equal quadrants, subquadrants, and so on, until no leaf node contains more than a single point.

.. slide:: PR Quadtree

   .. odsafig:: Images/PRexamp.png

        :align: center
        :capalign: justify
        :figwidth: 90%
        :alt: Example of a PR quadtree


.. slide:: PR Quadtree

   .. avembed:: AV/Spatial/PRquadtreeAV.html ss

.. slide::

    .

.. slide:: PR Quadtree

   - On average, half of the leafs in a PR Quadtree are empty

   - How to approach designing for this?

   - "Flyweight" design pattern: A singleton instance that is referenced in multiple places.


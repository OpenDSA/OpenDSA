.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Eric Fouh
   :prerequisites: 
   :topic: Registerbook

.. odsascript:: lib/registerbook-min.js

.. index:: ! Registerbook

Gradebook
=========

.. raw:: html

   <h1>Register Your OpenDSA Book Instance<a class="headerlink" href="#register-book" title="Permalink to this headline">¶</a></h1>
   <p><strong>Welcome to OpenDSA!</strong></p>
   You will be able to send all the information related to the content of your book instance to the
   backend server.
   <label class="book_name">
    <span>Book Name:</span>
    <input type="text" id="bookname" size="50" readonly />
   </label>
   <br>
   <label class="book_id">
    <span>Book ID:</span>
    <input type="text" id="bookid" size="50" readonly />
   </label>
   <br>
   <button type="button" id="registerbook">Send Book Data</button>
   <br>
   <div>
     <code id="bookjson"></code>
   </div>

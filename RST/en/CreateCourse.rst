.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Hosam Shahin
   :prerequisites: 
   :topic: Createcourse

.. odsascript:: lib/createcourse-min.js

.. index:: ! Createcourse

Create OpenDSA Course
=====================

.. raw:: html

   <p><strong>Welcome to OpenDSA!</strong></p>
   <p>You will be able to create a course in your prefered LMS based on this book instance information.</p>
   <table class="course_input_tbl">
       <tbody>
           <tr>
               <th colspan="2">
                   <strong>Canvas Details:</strong>
               </th>
           </tr>
           <tr>
               <td>
                   <label class="canvas_url">
                       <span>Instance URL:</span>
                   </label>
               </td>
               <td>
                   <input type="text" id="canvas_url" size="100">
               </td>
           </tr>
           <tr>
               <td>
                   <label class="course_code">
                       <span>Course Code:</span>
                   </label>
               </td>
               <td>
                   <input type="text" id="course_code" size="100">
               </td>
           </tr>
           <tr>
               <td>
                   <label class="access_token">
                       <span>Access Token:</span>
                   </label>
               </td>
               <td>
                   <input type="text" id="access_token" size="100">
               </td>
           </tr>
           <tr>
               <th colspan="2">
                   <strong>LTI Tool Provider Details:</strong>
               </th>
           </tr>
           <tr>
               <td>
                   <label class="consumer_key">
                       <span>Consumer Key:</span>
                   </label>
               </td>
               <td>
                   <input type="text" id="consumer_key" size="100">
               </td>
           </tr>
           <tr>
               <td>
                   <label class="consumer_secret">
                       <span>Consumer Secret:</span>
                   </label>
               </td>
               <td>
                   <input type="text" id="consumer_secret" size="100">
               </td>
           </tr>
       </tbody>
   </table>
   <br>
   <button type="button" id="createcourse">Create Course</button>
   <br>
   <div>
     <code id="coursejson"></code>
   </div>
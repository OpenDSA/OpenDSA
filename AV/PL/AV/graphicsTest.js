/* global document, console, $, JSAV */

// cube-arrays-rotate.js
// Rotating smooth shaded cube using drawArrays 
console.log("FOO");
var canvas;
var program;
var gl;
var cBuffer;
var vBuffer;
var vColor;
var vPosition;

var NumVertices  = 36;		// Why 36?

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];	// Angles of rotation for each axis

var near = -1;
var far = 1;
var left = -1.0;
var right = 1.0;
var ytop = 1.0;
var bottom = -1.0;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

window.onload = init;
//window.onload = function init()
function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    //    gl = WebGLUtils.setupWebGL( canvas );  // More efficient
    gl = WebGLDebugUtils.makeDebugContext( canvas.getContext("webgl") ); // For debugging
    if ( !gl ) { alert( "WebGL isn't available" );  }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    //event listeners for buttons
    
//     document.getElementById( "xButton" ).onclick = function () {
//         axis = xAxis;
// 	render();
//     };
//     document.getElementById( "yButton" ).onclick = function () {
//         axis = yAxis;
// 	render();
//     };
//     document.getElementById( "zButton" ).onclick = function () {
//         axis = zAxis;
// 	render();
//     };
//     
    render();
};

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
};

// Put position and color data for two triangles from a list of
// indices into the array vertices
function quad(a, b, c, d) 
{
    var vertices = [
        vec3( -0.5, -0.5,  0.5 ),
        vec3( -0.5,  0.5,  0.5 ),
        vec3(  0.5,  0.5,  0.5 ),
        vec3(  0.5, -0.5,  0.5 ),
        vec3( -0.5, -0.5, -0.5 ),
        vec3( -0.5,  0.5, -0.5 ),
        vec3(  0.5,  0.5, -0.5 ),
        vec3(  0.5, -0.5, -0.5 )
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 1.0, 1.0, 1.0, 1.0 ],  // white
        [ 0.0, 1.0, 1.0, 1.0 ]   // cyan
    ];

    // We need to partition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices
    
    // Vertex color assigned by the index of the vertex
    
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        colors.push( vertexColors[indices[i]] );
    }
};

function render()
{
    console.log("Hello " + theta[0] + " " + theta[1] + " " + theta [2]);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;

    modelViewMatrix = mat4();	// identity matrix constructed
    modelViewMatrix = mult(modelViewMatrix, rotateX(theta[xAxis]));
    modelViewMatrix = mult(modelViewMatrix, rotateY(theta[yAxis]));
    modelViewMatrix = mult(modelViewMatrix, rotateZ(theta[zAxis]));
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);
    
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

//    requestAnimFrame( render );
};


(function ($) {
    "use strict";
    var av;


    function runit() {
//	ODSA.AV.reset(true);
	
// 	JSAV.init();
// 	JSAV.ext.SPEED = 500;
// 	var av;

	//     // Use this instatiation for embedding in standalone parseTree1.html file
	// //    av = new JSAV($("#parseTree"));
	//     //////////////////////////////////////////////////////
	// 
	//     // Use this instatiation for embedding as inlineav in RST file
	//     var av_name = "parseTree3a";
	//     var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
	//     av = new JSAV(av_name);
	//     //////////////////////////////////////////////////////

	//	av = new JSAV($('.avcontainer'));

	////////////////////////////////////////////
	init();
    }

    function about() {
	alert("Produce a parse tree visualization for expression you enter");
    }
    
    function help() {
	alert("Enter expression in text box and then click the Parse button");
    }
    
    // Connect action callbacks to the HTML entities
    $('#about').click(about);
    $('#runit').click(init);
//     $('#runit').click(runit);
    $("#ssperform").submit(function(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	runit();
    });
    $('#help').click(help);
    $('#xButton').click( function () {
        axis = xAxis;
	console.log("Hello again "  + theta[0] + " " + theta[1] + " " + theta [2]);
	render();
    } );
    $('#yButton').click( function () {
        axis = yAxis;
	console.log("Hello again "  + theta[0] + " " + theta[1] + " " + theta [2]);
	render();
    } );
    $('#zButton').click( function () {
        axis = zAxis;
	console.log("Hello again "  + theta[0] + " " + theta[1] + " " + theta [2]);
	render();
    } );
    $('#reset').click(ODSA.AV.reset);
}(jQuery));

//});

/* *** ODSATag: HelloWorldSetupJS *** */
// HelloWorld.js
var gl;
var points;

window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLDebugUtils.makeDebugContext( canvas.getContext("webgl") );

    var vertices = [ vec2( -0.5, -0.5 ), vec2(  -0.5,  0.5 ),
		     vec2(  0.5, 0.5 ),  vec2( 0.5, -0.5) ];
    
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    var program = initShaders( gl, "vertex-shader", "fragment-shader" ); 
    gl.useProgram( program );

    // Load the data into the GPU 
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW ); 
    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );    
    
    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

/* *** ODSAendTag: HelloWorldSetupJS *** */

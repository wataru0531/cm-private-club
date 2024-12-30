
precision mediump float;

attribute vec2 aVertexPosition;

varying vec2 vVertexPosition;

void main(){
  vVertexPosition = aVertexPosition;

  gl_Position = vec4(aVertexPosition, 0., 1.);
}


// precision mediump float;

// attribute vec2 aVertexPosition;

// varying vec2 vVertexPosition;

// // 頂点１つ１つで実行される
// void main(){
//   vVertexPosition = aVertexPosition;

//   // -1〜1
//   gl_Position = vec4(aVertexPosition, 0., 1.);
// }

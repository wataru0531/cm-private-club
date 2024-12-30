
precision mediump float;

// -5, -5, 5, 0, -5, 5
// -1, -1    1, 0    -1, 1,
attribute vec2 aVertexPosition;

varying vec2 vVertexPosition;

// 頂点１つ１つで実行
void main(){
	vVertexPosition = aVertexPosition;

	// projectionMatrix、modelViewMatirix をかけずにgl_Positionに
	// 頂点をいれているのでそのままの数値が入る。
  gl_Position = vec4(aVertexPosition, 0., 1.);
}



// precision mediump float;

// // (-5, -5), (5, 0), (-5, 5)
// // -1, -1    1, 0    -1, 1,
// attribute vec2 aVertexPosition;

// varying vec2 vVertexPosition;


// // 各頂点で実行
// void main() {
//     vVertexPosition = aVertexPosition;

//     //  (-5, -5), (5, 0), (-5, 5)が頂点ごとに渡ってくる
//     gl_Position = vec4(aVertexPosition, 0.0, 1.0);
// }



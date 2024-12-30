
precision mediump float;

varying vec2 vUv;
varying vec3 vPosition;


// 頂点１つ１つで実行
void main(){
  vUv = uv;
  vPosition = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}



precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D uTex;
uniform float uProgress;

// フラグメント１つ１つで実行
void main() {

  vec4 tex = texture(uTex, vUv);
  
  // gl_FragColor = vec4(vDelay, 0., 0., 1.);
  gl_FragColor = tex;
}
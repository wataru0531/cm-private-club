precision mediump float;

varying vec2 vUv;
varying float vDelay;

uniform sampler2D uTex;

// gl_PointCoordについての説明
// https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml

void main() {

  // if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
  //   discard;
  // }
  vec4 tex = texture(uTex, vUv);
  gl_FragColor = vec4(tex.rgb, 1. - vDelay);
}



precision mediump float;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb);

varying vec2 vUv;
varying float vDelay;

uniform float uTick;
uniform float uSaturation;
uniform float uLightness;
uniform float uColorTime;
uniform float uColorDelay;

// 各フラグメント１つ１つで実行される
void main(){
  if(length(gl_PointCoord - vec2(.5, .5)) > .5){
    discard;
  }

  // uTickの0〜1から、線形補間されたvDelayを引くことで色に遅延を持たせれる。
  float hue = sin(uTick * uColorTime - vDelay * uColorDelay) * .5 + .5;

  vec3 rgb = hsl2rgb(hue, uSaturation, uLightness);

  gl_FragColor = vec4(rgb, 1.);
}


// precision mediump float;

// varying vec2 vUv;
// varying float vDelay;

// uniform sampler2D uTex;
// uniform float uTick;
// uniform float uSaturation;
// uniform float uLightness;
// uniform float uColorTime;
// uniform float uColorDelay;

// #pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

// // gl_PointCoordについての説明
// // https://khronos.org/registry/OpenGL-Refpages/gl4/html/gl_PointCoord.xhtml


// void main() {

//   if(distance(gl_PointCoord, vec2(0.5, 0.5)) > 0.5) {
//     discard;
//   }
//   // vec4 tex = texture(uTex, gl_PointCoord);

//   float hue = sin(uTick * uColorTime - vDelay * uColorDelay) * 0.5 + 0.5;
//   vec3 rgb = hsl2rgb(hue, uSaturation, uLightness);

//   gl_FragColor = vec4(rgb, 1.);
//   // gl_FragColor = tex;
// }
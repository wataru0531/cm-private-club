
precision mediump float;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb);

varying vec2 vUv;
varying float vDelay;

uniform sampler2D uTex;
uniform float uTick;
uniform float uProgress;
uniform float uSaturation;
uniform float uLightness;
uniform float uColorDelay;
uniform float uColorTime;

// フラグメント１つ１つで実行
void main(){
  if(distance(gl_PointCoord, vec2(.5, .5)) > .5){
    discard;
  };

  float hue = sin(uTick * uColorTime - vDelay * uColorDelay)  * .5 +  .5;
  vec3 rgb = hsl2rgb(hue, uSaturation, uLightness);

  // uv座標から、-.5引いた値がフラグメントに入る
  float planeAlpha = .5 - length(vUv - .5);
  planeAlpha *= 2.;

  float sphereAlpha = 1.;

  float alpha = mix(planeAlpha, sphereAlpha, uProgress);

  gl_FragColor = vec4(rgb, alpha);
  // gl_FragColor = vec4(rgb, planeAlpha);
}




// precision mediump float;

// varying vec2 vUv;
// varying float vDelay;

// uniform sampler2D uTex;
// uniform float uTick;
// uniform  float uProgress;
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

//   float hue = sin(uTick * uColorTime - vDelay * uColorDelay) * 0.5 + 0.5;
//   vec3 rgb = hsl2rgb(hue, uSaturation, uLightness);

//   // planeの時に円になるように透明度を設定(端の透明度を下げる)
//   // vUvには0〜1が渡ってくるので、中心付近は黒くなっていく
//   // lengthはあくまでも0からの距離を取得する
//   // float planeAlpha = length(vUv - vec2(.5, .5));
//   // float planeAlpha = length(vUv);

//   float planeAlpha = .5 - length(vUv - .5);

//   // planeAlpha ... 0〜0.5の値が入ってくるので、0〜1の範囲にするために2倍する。
//   planeAlpha *= 2.;

//   // sphereには透明の部分がないので1にする
//   float sphereAlpha = 1.;

//   float alpha = mix(planeAlpha, sphereAlpha, uProgress);

//   gl_FragColor = vec4(rgb, alpha);
//   // gl_FragColor = vec4(rgb, 1.);
// }


precision mediump float;

#pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)
#pragma glslify: rotate = require(glsl-rotate)

attribute float aDelay;

varying vec2 vUv;
varying float vDelay;

uniform float uProgress;

const float HALF_PI = 1.570796327; // 度数法だと、90°

// 頂点１つ１つで実行
void main(){
  vUv = uv;
  vDelay = aDelay;

  vec3 pos = position;

  // aDelayの値を小さくすると左上から右下までの頂点が動く時間が短くなる。速く頂点が動く。
  float delay = clamp(uProgress * 1.2 - aDelay * 0.2, 0., 1.);
  float progress = easeCubic(delay);

  pos.z = 100.;

  vec3 axis = vec3(1., 1., 1.); // 回転軸(どこで回転させるか)
  pos = rotate(pos, axis, 4. * HALF_PI * progress);

  // pos.z += progress * 300.;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}


// precision mediump float;

// #pragma glslify: easeBack = require(glsl-easings/back-in-out)
// #pragma glslify: easeCubic = require(glsl-easings/cubic-in-out)

// #pragma glslify: rotate = require(glsl-rotate)

// attribute float aDelay;

// varying vec2 vUv;
// varying float vDelay;

// uniform float uProgress;

// const float HALF_PI = 1.570796327; // 90°

// void main(){
//   vUv = uv;
//   vDelay = aDelay;


//   vec3 pos = position;

//   float delay = clamp(uProgress * 1.3 - aDelay * .3, 0., 1.);
//   float progress = easeCubic(delay);

//   // z軸方向に少し手前にずらすことで回転中に画像同士がぶつからない
//   pos.z += 200.;

//   // 回転させる
//   // rotate( ①回転させたい頂点 ②軸 ③どれだけ回転させるか )
//   // * 4.  ... １回転させる
//   vec3 axis = vec3(1., 1., 1.);
//   pos = rotate(pos, axis, 4. * HALF_PI * progress);

//   // pos.z += progress * 250.;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
// }

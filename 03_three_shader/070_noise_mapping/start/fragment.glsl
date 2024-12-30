precision mediump float;

// 2次元のノイズ
#pragma glslify: noise2 = require(glsl-noise/simplex/2d);

// 3次元のノイズ
#pragma glslify: noise3 = require(glsl-noise/simplex/3d);

varying vec2 vUv;
 // vPosition ... gl_Positionに渡される前なので大きな数値が線形補間されて渡ってくる
varying vec3 vPosition;

uniform sampler2D uTex;
uniform float uTick;


// フラグメント１つ１つで実行
void main() {
  // 通常のノイズ。小数値(float)で返る
  // 引数にはvec2型の値を入れる
  // float n = noise2(vUv);
  // float n = noise2(vec2(vUv.x, vUv.y));
  // float n = noise2(vec2(vPosition.x, vPosition.y));

  // より細かく 数値をかけるとノイズが小さくなる
  // n = noise2(vUv * 10.0);

  // 時間が経つにつれて細かく
  // n = noise2(vUv * uTick * 0.1);

  // ノイズを移動
  // n = noise2(vUv * 10.0 - uTick * 0.01);
  // n = noise2(vUv * 10. + uTick * 0.01);

  // x方向に移動
  // n = noise2(vec2(vUv.x * 10. - sin(uTick * 0.01), vUv.y * 10.));

  // 波のように揺れる
  // n = noise2(vec2(vUv.x * 100. - sin(vUv.y + uTick / 100.), vUv.y * 10. - sin(vUv.x + uTick / 100.)));
  // n = noise2(vec2(vUv.x * 100.0 - sin(vUv.y * uTick / 100.0), vUv.y * 10.0));
  // n = noise2(vec2(vUv.x * 100.0 - sin(vUv.y + uTick / 100.0), vUv.y * 10.0 - sin(vUv.x + uTick / 100.0)));

  float n = noise2(vec2(vUv.x * 10.0 - sin(vUv.y * uTick * 0.01), vUv.y * 10.));

  // 3Dノイズ
  // 3次元目には時間軸を指定させるとノイズの発生源をランダムに変更できるようにする。
  // ランダムとはいえ、決まった動き
  // n = noise3(vec3(vUv * 10., uTick * 0.01));
  // n = noise3(vec3(vUv.x * 10., vUv.y * 10., uTick * 0.01));

  // ヨコシマのノイズ。横に細くしたい場合は、,y軸には50をかける。
  // n = noise3(vec3(vUv.x * 10., vUv.y * 50., uTick * 0.01));


  /*******************************************************
  positionの値を渡した場合
  ...positionは、gl_Positionに座標変換される前の値なので大きい。なのでノイズが小さくなる
  ********************************************************/
  // 2次元
  // float n = noise2(vec2(vPosition.x, vPosition.y));

  // 3次元
  // float n = noise3(vec3(vPosition.x, vPosition.y, uTick * 0.01));

  gl_FragColor = vec4(n, 0., 0., 1.);
}

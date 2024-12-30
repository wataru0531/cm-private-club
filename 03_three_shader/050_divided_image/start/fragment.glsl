
precision mediump float;

varying vec2 vUv;

uniform sampler2D uTex;

void main(){
  vec2 fUv = vUv;
  fUv.x = fract(vUv.x * 4.);
  fUv.y = fract(vUv.y * 4.);

  vec4 tex = texture(uTex, fUv);

  gl_FragColor = tex;
}





// precision mediump float;

// varying vec2 vUv;

// uniform sampler2D uTex;

// void main(){
//   vec2 fUv = vUv;
//   fUv.x = fract(fUv.x * 4.);
//   fUv.y = fract(fUv.y * 4.);

//   vec4 color = texture(uTex, fUv);

//   gl_FragColor = color;
// }


// position...(-10, 5, 0) (10, 5, 0) (-10, -5, 0) (10, -5, 0)
// uv...(0, 1) (1, 1) (0, 0) (1, 0)

// varying vec2 vUv;
// uniform sampler2D uTex;

// void main() {
//     // uv...(0, 1) (1, 1) (0, 0) (1, 0)
//     // fract()...整数部分はカットして少数の部分のみ取り出し表示する。

//     // 例えば(0.24, 0.0)のフラグメントでは、(0.96, 0.0)のuTexの座標が取得
    
//     vec2 fUv = vUv;
//     fUv.x = fract(fUv.x * 4.0);
//     fUv.y = fract(fUv.y * 4.0);

//     vec4 color = texture(uTex, fUv);

//     // vec4 color2 = vec4(1.0);
//     // color2.rgb = color.gbr;

//     gl_FragColor = color;
//     // gl_FragColor = color2;
// }

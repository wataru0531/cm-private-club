

precision mediump float;

#pragma glslify: hsl2rgb = require(glsl-hsl2rgb);

varying vec2 vUv;

uniform float uTick;

void main(){
	float time = uTick * 0.001;

	vec3 rgb = hsl2rgb(fract(vUv.x + time), 1., .5);

	gl_FragColor = vec4(rgb, 1.);
}


// varying vec2 vUv;
// uniform float uTick;
// #pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

// void main(){
// 	float time = uTick * 0.001;
	
// 	// vec3 rgb = hsl2rgb(vUv.x, 1., .5);
// 	vec3 rgb = hsl2rgb(fract(vUv.x + time), 1., .5);
// 	// vec3 rgb = hsl2rgb(fract(vUv.x - time), 1., .5);

// 	// vec3 rgb = hsl2rgb(fract(vUv.y - time), 1., .5);

//   gl_FragColor = vec4(rgb,1.);
// }



// uv...(0, 1) (1, 1) (0, 0) (1, 0)

// varying vec2 vUv;

// uniform sampler2D uTex;
// uniform float uTick;

// // hslを使うライブラリ読み込み(glslify も必要)
// // Hue...色　Saturation...彩度　Lightness...輝度
// #pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

// void main() {
//     float time = uTick * 0.0001;

//     // vec3 rgbには0から1までのrgbの情報が入る。
//     // hsl...(色(0から360までの数値), 彩度, 明るさ)
//     // 例...((75 / 360), 1.0, 0.5);
//     // hslでは0から1で、360°の色々を取得
//     // fractを使い整数値を抜かした小数を取得

//     vec3 rgb = hsl2rgb(fract(vUv.x + time), 1., .5);

//     // vec3 rgb = hsl2rgb(.1, 1., .5);
//     // vec3 rgb = hsl2rgb(fract(vUv.x + time), 1., .5);
//     // vec3 rgb  = hsl2rgb(fract(vUv.y + time), 1., .5);

//     vec4 color = vec4(rgb, 1.0);
		
//     gl_FragColor = color;
// }


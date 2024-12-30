// 座標
// {x, y, z, w}
// 色
// {r, g, b, a}
// テクスチャ座標
// {s, t, p, q}


precision mediump float;

varying vec3 vVertexColor;
uniform vec2 uColor;

// #define ... 定数を牴牾
// #define PI 3.14

void main() {
    const float PI = 3.14;

    vec4 color = vec4(1.0, sin(PI / 2), 0.5, 1.0);
    gl_FragColor = color;
}

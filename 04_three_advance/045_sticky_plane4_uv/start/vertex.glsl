
precision mediump float;

#pragma glslify: easeBack = require(glsl-easings/back-in-out)

// aDelay ... gl_Positionに渡さなくても、既にgeometryの頂点に紐づいている。
attribute float aDelay;

varying vec2 vUv;
varying float vDelay;

uniform float uProgress;

// 各頂点1つ1つで実行
void main() {
    vUv = uv;
    vDelay = aDelay;

    vec3 pos = position;

    // 0 〜 1 の長さにしたいので、
    //「左上からのuv座標の長さ」 を 「左上から右下までの長さ(最長で√２)」 で割る
    // uv座標もpositionと同様に左上から右に頂点が並ぶ。
    float delay = distance(vec2(0.0, 1.0), uv) / distance(vec2(0.0, 1.0), vec2(1.0, 0.0));

    // vDelay = delay; // デバッグ

    // uProgressの値がプラスになった頂点から動く
    float x = clamp(uProgress * 1.3 - delay * 0.3, 0., 1.);
    float progress = easeBack(x);
    pos.z += progress * 250.;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
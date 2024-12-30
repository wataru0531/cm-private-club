
precision mediump float;

attribute float aDelay;

varying vec2 vUv;
varying float vDelay;
varying vec3 vPosition;

void main(){
	vUv = uv;
	vDelay = aDelay;
	vPosition = position;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}


// precision mediump float;

// attribute float aDelay;

// varying vec2 vUv;
// varying vec3 vPosition;
// varying float vDelay;


// void main(){
// 	vUv = uv;
// 	vPosition = position;
// 	vDelay = aDelay;

// 	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
// }

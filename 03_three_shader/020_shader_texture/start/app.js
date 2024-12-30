/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";

init();
async function init () {

  const scene = new THREE.Scene(); 
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  /**************************************************************
  geometry
  ***************************************************************/
  const geometry = new THREE.PlaneGeometry(4, 2);

  /**************************************************************
  material
  ***************************************************************/
  const url = "/img/output2.jpg";
  // const url = "/img/uv.jpg";

  // テクスチャ読み込み
  const loadTex = async (_url) => {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(_url);

    return texture;
  }

  const material = new THREE.ShaderMaterial({
    uniforms: {
      // valueの値を取ってくる仕様となっている。
      uTex: { value: await loadTex(url) },
    },

    vertexShader: `
      varying vec2 vUv;

      void main(){
        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
      }
    `,

    // 左右左右の順で格納
    // position...(-1, 1, 0) (1, 1, 0) (-1, -1, 0) (1, -1, 0)
    // uv...(0, 1) (1, 1) (0, 0) (1, 0)
    fragmentShader: `
      varying vec2 vUv;

      // sampler2D...テクスチャの型
      uniform sampler2D uTex;

      void main() {

        // uTex ... 各フラグメントに対しての色が配列で格納
        // uTexとvUvを掛け合わせて(0, 0)から(1, 1)の値で取得することで、texColorには各フラグメントのrgbaの色情報が4次元ベクトルとして入る
        // vec4 texColor = texture(uTex, vUv);
        vec4 texColor = texture(uTex, vec2((vUv.x - .5) * .5 + .5, (vUv.y - .5) * .5 + .5));

        gl_FragColor = texColor;
      }
    `,
    // wireframe: true
  });

  /**************************************************************
  mesh
  ***************************************************************/
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  console.log(geometry);

  camera.position.z = 5;

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

};
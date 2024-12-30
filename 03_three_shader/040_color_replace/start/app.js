/**
* Three.js
* https://threejs.org/
*/

import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

init();
async function init() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);
  
  const geometry = new THREE.PlaneGeometry(20, 10);

  /**************************************************************
  material
  ***************************************************************/
  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    return texture;
  };

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex: { value: await loadTex('/img/output2.jpg') },
      // 時間軸の情報
      uTick: { value: 0 }, // 数値なのでfloat
    },
    vertexShader,
    fragmentShader,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  console.log(geometry);
  
  camera.position.z = 30;
  
  /**************************************************************
  animate
  ***************************************************************/
  let i = 0;

  function animate() {
    requestAnimationFrame(animate);
  
    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;

    // 時間軸を作成
    material.uniforms.uTick.value++;
    // console.log(material.uniforms.uTick.value)
  
    renderer.render(scene, camera);
  }
  
  animate();
}
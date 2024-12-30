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
  
  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);

    //  テクスチャを横軸に繰り返す。S...x軸
    texture.wrapS = THREE.RepeatWrapping; // 横軸に繰り返す
    // texture.wrapS = THREE.MirroredRepeatWrapping; // 反転
    // texture.wrapS = THREE.ClampToEdgeWrapping; // デフォルト(最後の色情報を継続して使う)

    // テクスチャを縦軸に繰り返す。T...y軸
    texture.wrapT = THREE.RepeatWrapping;

    return texture;
  }
  /**************************************************************
  geometry
  ***************************************************************/
  const geometry = new THREE.PlaneGeometry(20, 10);
  console.log(geometry);
  
  /**************************************************************
  material
  ***************************************************************/
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTex: { value: await loadTex('/img/output2.jpg') },
      uTick: { value: 0 }
    },
    vertexShader,
    fragmentShader,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  camera.position.z = 30;
  
  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
  
    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;
    material.uniforms.uTick.value++;

    renderer.render(scene, camera);
  }
  
  animate();
}

/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { gsap } from "gsap";

init();
async function init() {
  /**************************************************************
  scene
  ***************************************************************/
  const scene = new THREE.Scene();

  /**************************************************************
  camera
  ***************************************************************/
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    10,
    3000
  );

  camera.position.z = 1000;

  /**************************************************************
  renderer
  ***************************************************************/
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);
  // console.log(renderer.domElement)

  // OrbitControls...カメラに適用
  const control = new OrbitControls(camera, renderer.domElement);

  /**************************************************************
  geometry
  ***************************************************************/
  // 遅延時間を持った頂点を格納していく
  function setupGeometry(){
    const wSeg = 2; // Y軸の頂点の数
    const hSeg = 2; // X軸の頂点の数

    const geometry = new THREE.PlaneGeometry(600, 300, wSeg, hSeg);

    const delayVertices = []; // 遅延時間を持った頂点の配列
    const maxCount = (wSeg + 1) * (hSeg + 1); // 頂点の総数

    for(let i = 0; i < maxCount; i++){
      // 遅延時間を、0 〜 1 で格納
      const delayDuration = ( 1 / maxCount ) * i;
      delayVertices.push(delayDuration);
    };
    
    console.log(delayVertices);

    // geometryの頂点に追加
    // 第２引数 ... count(頂点の数)、itemSize... (x, y, z)のこと。1 なので 1 とする
    geometry.setAttribute("aDelay", new THREE.Float32BufferAttribute(delayVertices, 1));

    return geometry;
  };

  const geometry = setupGeometry();
  window.geometry = geometry;

  console.log(geometry)

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
      uTex: { value: await loadTex("/img/output1.jpg") },
      uTick: { value: 0 },
      uProgress: { value: 0 },
    },
    vertexShader,
    fragmentShader,

    wireframe: true,
  });

  /**************************************************************
  mesh
  ***************************************************************/
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  /**************************************************************
  lil-gui
  ***************************************************************/
  const gui = new GUI();
  const folder1 = gui.addFolder("Animation");
  folder1.open();

  folder1.add(material.uniforms.uProgress, "value", 0, 1, 0.01).name("progress").listen();

  //  boolean に切り換え
  const datData = { next: !!material.uniforms.uProgress.value };

  folder1.add(datData, "next").onChange(() => {
    gsap.to(material.uniforms.uProgress, {
      value: +datData.next, // 1まで進む
      duration: 1.5,
      ease: "power3.inOut",
    });
  });

  /**************************************************************
  animate
  ***************************************************************/
  function animate() {
    requestAnimationFrame(animate);

    control.update();

    material.uniforms.uTick.value++;

    renderer.render(scene, camera);
  }

  animate();
}

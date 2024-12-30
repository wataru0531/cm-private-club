/**
 * Three.js
 * https://threejs.org/
 */
 import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import GUI from "lil-gui";
import { gsap } from "gsap";

init();
async function init() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  
  /***************************************************
  renderer
  ****************************************************/
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);
  
  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    return texture;
  };

  /***************************************************
  geometry
  ****************************************************/
  const geometry = new THREE.PlaneGeometry(20, 10);

  /***************************************************
  material
  ****************************************************/
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexCurrent: { value: await loadTex('/img/output1.jpg') },
      uTexNext: { value: await loadTex('/img/output2.jpg') },

      uProgress: { value: 0 },
      uTick: { value: 0 },
      uNoiseScale: { value: new THREE.Vector2(10, 10) },

    },
    vertexShader,
    fragmentShader,
  });

  /***************************************************
  mesh
  ****************************************************/
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  camera.position.z = 30;
  
  /***************************************************
  lil-gui
  ****************************************************/
  const gui = new GUI();
  const folder1 = gui.addFolder("Noise");
  // folder1.close();

  folder1.add(material.uniforms.uNoiseScale.value, "x", 0, 100, 1);
  folder1.add(material.uniforms.uNoiseScale.value, "y", 0, 100, 1);

  // listen ... gsapの中で値が変化するのと同期させる
  folder1.add(material.uniforms.uProgress, "value", 0, 1, 0.01).name("Progress").listen()



  // クリック
  // datDataのnextがtrueになる → onChangeが発火
  // uProgress の valueの値が datDataのnextの値となる。
  
  const datData = {
    // !を2つつけて、数値からbooleanに変換 0はfalse → true → false
    next: !!material.uniforms.uProgress.value
  }

  folder1.add(datData, "next").onChange(() => {
    gsap.to(material.uniforms.uProgress, {
      value: +datData.next, // +をつけることで数値になり、1となる。

      duration: 1.5,
      ease: "power4.inOut",
    })
  })


  /***************************************************
  animate
  ****************************************************/
  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
  
    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;
    material.uniforms.uTick.value++;
    renderer.render(scene, camera);
  }
  
  animate();
};

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
  /**************************************************************
  scene
  ***************************************************************/
  const scene = new THREE.Scene();

  /**************************************************************
  camera
  ***************************************************************/
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;
  
  /**************************************************************
  renderer
  ***************************************************************/
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);
  
  /**************************************************************
  geometry
  ***************************************************************/
  const geometry = new THREE.PlaneGeometry(20, 10);

  /*****************************************************
    material
  *******************************************************/
  async function loadTex(url) {
    const texLoader = new THREE.TextureLoader();
    const texture = await texLoader.loadAsync(url);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    
    return texture;
  };

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTexCurrent: { value: await loadTex('/img/output1.jpg') },
      uTexNext: { value: await loadTex('/img/output2.jpg') },
      uTick: { value: 0 },
      uProgress: { value: 0 },

      uNoiseScale: { value: new THREE.Vector2(5, 5) }
    },
    vertexShader,
    fragmentShader,
  });

  /*****************************************************
  mesh
  *******************************************************/
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  /*****************************************************
  lil-gui
  *******************************************************/
  const gui = new GUI();
  const folder1 = gui.addFolder("Noise");
  folder1.open();

  folder1.add(material.uniforms.uNoiseScale.value, "x", 0, 100, 1);
  folder1.add(material.uniforms.uNoiseScale.value, "y", 0, 100, 1);
  folder1.add(material.uniforms.uProgress, "value", 0, 1, 0.01).name('progess').listen();
    

  const datData = { 
    next: !!material.uniforms.uProgress.value
  }
  
  folder1.add(datData, "next").onChange(() => {
    gsap.to(material.uniforms.uProgress, {
      value: +datData.next,
      
      duration: 1.5,
      ease: "power3.inOut"
    })
  });

  /*****************************************************
  animation
  *******************************************************/
  let i = 0;
  function animate() {
    requestAnimationFrame(animate);
  
    // cube.rotation.x = cube.rotation.x + 0.01;
    // cube.rotation.y += 0.01;
    material.uniforms.uTick.value++;

    // renderer
    renderer.render(scene, camera);
  }
  
  animate();
}

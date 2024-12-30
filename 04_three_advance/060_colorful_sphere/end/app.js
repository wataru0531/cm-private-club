/**
 * Three.js
 * https://threejs.org/
 */
 import * as THREE from "three";
 import vertexShader from "./vertex.glsl";
 import fragmentShader from "./fragment.glsl";
 import GUI from "lil-gui";
 import { gsap } from "gsap";
 import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
 
 init();
 async function init() {
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(
     50,
     window.innerWidth / window.innerHeight,
     10,
     3000
   );
 
   camera.position.z = 1000;
 
   const renderer = new THREE.WebGLRenderer({ antialias: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   // renderer.setClearColor(0xffffff);
   document.body.appendChild(renderer.domElement);
 
   const control = new OrbitControls(camera, renderer.domElement);
 
   async function loadTex(url) {
     const texLoader = new THREE.TextureLoader();
     const texture = await texLoader.loadAsync(url);
     return texture;
   }
 
   function setupGeometry() {
     const wSeg = 30,
       hSeg = 30;
     const geometry = new THREE.SphereGeometry(200, wSeg, hSeg);
 
     // 対角線上に詰められた遅延時間用の頂点データ
     const delayVertices = getDiagonalVertices(hSeg, wSeg, getValue, 0);
     //  printMat(delayVertices, wSeg + 1, '遅延時間行列');
 
     // 0~1までの値をstep毎に返す
     function getValue(previousValue, currentIndex) {
       let step = 1 / (hSeg + 1) / (wSeg + 1);
       return previousValue + step;
     }
 
     // 対角線上に頂点を詰めた配列を返す
     function getDiagonalVertices(hSeg, wSeg, getValue, defaultValue) {
       const hSeg1 = hSeg + 1,
         wSeg1 = wSeg + 1;
       let arry = [],
         currentValue = defaultValue;
       for (let i = 0; i < hSeg1 + wSeg1 - 1; i++) {
         for (
           let j = Math.min(hSeg1, i + 1) - 1;
           j >= Math.max(0, i - wSeg1 + 1);
           j--
         ) {
           let currentIndex = j * wSeg1 + i - j;
           currentValue = getValue(currentValue, currentIndex);
           arry[currentIndex] = currentValue;
         }
       }
       return arry;
     }
 
     console.log(delayVertices);
 
     geometry.setAttribute(
       "aDelay",
       new THREE.Float32BufferAttribute(delayVertices, 1)
     );
 
     return geometry;
   }
 
   const geometry = setupGeometry();
   window.geometry = geometry;
   const material = new THREE.ShaderMaterial({
     uniforms: {
       uTex: { value: await loadTex("/img/output1.jpg") },
       uTick: { value: 0 },
       uProgress: { value: 0 },
     },
     vertexShader,
     fragmentShader,
     side: THREE.DoubleSide
     //  wireframe: true,
   });
    // const material1 = new THREE.PointsMaterial({ color: 0xff0000 });
   const sphere = new THREE.Points(geometry, material);
   scene.add(sphere);
 
   // 軸ヘルパー
   const axis = new THREE.AxesHelper(300);
   scene.add(axis);

   // lil gui
   const gui = new GUI();
   const folder1 = gui.addFolder("Animation");
   folder1.open();
 
   folder1
     .add(material.uniforms.uProgress, "value", 0, 1, 0.1)
     .name("progess")
     .listen();
 
   const datData = { next: !!material.uniforms.uProgress.value };
   folder1.add(datData, "next").onChange(() => {
     gsap.to(material.uniforms.uProgress, {
       value: +datData.next,
       duration: 2,
       ease: "power2.inOut",
     });
   });
 
   function animate() {
     requestAnimationFrame(animate);
 
     control.update();
 
     material.uniforms.uTick.value++;
 
     renderer.render(scene, camera);
   }
 
   animate();
 }
 
 function printMat(targetMatrix, col = 4, label = "") {
   const mat1D = targetMatrix?.elements ?? targetMatrix?.array ?? targetMatrix;
   console.log(mat1D);
   if (!mat1D instanceof Array) return;
   setTimeout(() => {
     // 非同期でマトリクスが更新されるため、非同期で実行
     let mat2D = mat1D.reduce((arry2D, v, i) => {
       if (i % col === 0) {
         arry2D.push([]);
       }
       const lastArry = arry2D[arry2D.length - 1];
       lastArry.push(v);
       return arry2D;
     }, []);
     console.log(
       `%c${label}`,
       "font-size: 1.3em; color: red; background-color: #e4e4e4;"
     );
     console.table(mat2D);
   });
 }
 
function loadTex() {
  const tex = new THREE.Texture(document.querySelector("#target-img"));
  tex.needsUpdate = true;
  console.log(tex);
  return tex;
}

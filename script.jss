// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Geometry
const shape = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.3, 120, 16),
  new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    metalness: 0.7,
    roughness: 0.3,
  }),
);
scene.add(shape);

// 3D Text
const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeo = new THREE.TextGeometry("Mohammed Aqib", {
      font,
      size: 0.4,
      height: 0.1,
    });
    textGeo.center();
    const textMesh = new THREE.Mesh(
      textGeo,
      new THREE.MeshStandardMaterial({ color: 0xffffff }),
    );
    textMesh.position.y = 1.6;
    scene.add(textMesh);

    function floatText() {
      textMesh.position.y = 1.6 + Math.sin(Date.now() * 0.002) * 0.1;
      requestAnimationFrame(floatText);
    }
    floatText();
  },
);

// Mouse
let targetX = 0,
  targetY = 0,
  curX = 0,
  curY = 0;
document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Scroll
document.addEventListener("scroll", () => {
  shape.rotation.y = window.scrollY * 0.002;
});

// Animate
function animate() {
  curX += (targetX - curX) * 0.05;
  curY += (targetY - curY) * 0.05;

  shape.rotation.x += curY * 0.02;
  shape.rotation.y += curX * 0.02;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

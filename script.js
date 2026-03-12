/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.style.background =
        window.scrollY > 50 ?
        "rgba(10, 10, 10, 0.98)" :
        "rgba(10, 10, 10, 0.90)";
});

/* =========================
   THREE.JS SCENE SETUP
========================= */
const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

/* =========================
   LIGHTING
========================= */
const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(5, 5, 5);
scene.add(light);

/* =========================
   MAIN GEOMETRY
========================= */
const shape = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.3, 120, 16),
    new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        metalness: 0.7,
        roughness: 0.3
    })
);
scene.add(shape);

/* =========================
   3D TEXT
========================= */
const fontLoader = new THREE.FontLoader();
let textMesh = null;

fontLoader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    font => {
        const textGeo = new THREE.TextGeometry("Mohammed Aqib", {
            font,
            size: 0.4,
            height: 0.1
        });
        textGeo.center();

        textMesh = new THREE.Mesh(
            textGeo,
            new THREE.MeshStandardMaterial({ color: 0xffffff })
        );

        textMesh.position.y = 1.6;
        scene.add(textMesh);
    }
);

/* =========================
   MOUSE INTERACTION
========================= */
let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0;

document.addEventListener("mousemove", e => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* =========================
   SCROLL INTERACTION
========================= */
document.addEventListener("scroll", () => {
    shape.rotation.y = window.scrollY * 0.002;
});

/* =========================
   ANIMATION LOOP
========================= */
function animate() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    shape.rotation.x += currentY * 0.02;
    shape.rotation.y += currentX * 0.02;

    if (textMesh) {
        textMesh.position.y =
            1.6 + Math.sin(Date.now() * 0.002) * 0.12;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

/* =========================
   RESPONSIVE RESIZE
========================= */
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/* =========================
   TOUCH SUPPORT (MOBILE FIX)
========================= */
document.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    targetX = (touch.clientX / window.innerWidth - 0.5) * 2;
    targetY = (touch.clientY / window.innerHeight - 0.5) * 2;
}, { passive: true });

/* =========================
   MOBILE PERFORMANCE FIX
========================= */
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
// Update the existing shape geometry based on device
shape.geometry = isMobile ?
    new THREE.TorusGeometry(0.8, 0.25, 16, 50) :
    new THREE.TorusKnotGeometry(0.8, 0.3, 120, 16);

// Shape already added to scene above
shape.needsUpdate = true;

renderer.setAnimationLoop(animate);
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Kalp Partikülleri
const particles = 20000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particles * 3);

for (let i = 0; i < particles; i++) {
  let t = Math.random() * Math.PI * 2;
  let s = Math.random();
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  x *= s * 0.9;
  y *= s * 0.9;
  let z = (Math.random() - 0.5) * 6;
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xff0000,
  size: 0.12,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending
});
const heart = new THREE.Points(geometry, material);
scene.add(heart);

// Sparkles
const sparkleGeometry = new THREE.BufferGeometry();
const sparkleCount = 1500;
const sparklePositions = new Float32Array(sparkleCount * 3);
for (let i = 0; i < sparkleCount; i++) {
  sparklePositions[i * 3] = (Math.random() - 0.5) * 15;
  sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
  sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
}
sparkleGeometry.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));
const sparkleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0.7 });
const sparkles = new THREE.Points(sparkleGeometry, sparkleMaterial);
scene.add(sparkles);

// Yıldızlı Arka Plan
const starsGeometry = new THREE.BufferGeometry();
const starCount = 3000;
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  starPositions[i * 3] = (Math.random() - 0.5) * 2000;
  starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
  starPositions[i * 3 + 2] = -Math.random() * 2000;
}
starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

camera.position.z = 85;
camera.position.y = 5;

// GSAP animasyonları
gsap.to(heart.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 1.5, yoyo: true, repeat: -1, ease: "sine.inOut" });
gsap.to(material, { opacity: 0.5, duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut" });
gsap.to(sparkleMaterial, { opacity: 1, duration: 1.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

let targetHue = 0;
let currentHue = 0;

function animate() {
  requestAnimationFrame(animate);

  heart.rotation.y += 0.001;
  sparkles.rotation.y += 0.001;
  stars.rotation.y += 0.0005;

  if (Math.random() < 0.005) {
    targetHue = Math.random() * 360;
  }
  currentHue += (targetHue - currentHue) * 0.01;
  material.color.setHSL((currentHue % 360) / 360, 1, 0.5);

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Müzik
const music = new Audio("music.mp3");
music.loop = true;
const btn = document.getElementById("musicBtn");
btn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    btn.textContent = "Müziği Kapat";
  } else {
    music.pause();
    btn.textContent = "Müzik Aç";
  }
});

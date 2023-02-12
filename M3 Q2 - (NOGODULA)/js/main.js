
import * as THREE from './three.module.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';

//Camera Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);

//WebGL Portion
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Target Values
let stars, starGeo;
let textMesh = new THREE.Mesh();


//Values
lighting();
name();
particles();


//Particles Portion
function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("./assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: "#00FF00",
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

//Animate Particles Portion
function animateParticles() {
    starGeo.verticesNeedUpdate = true;
    stars.position.z -= 2;
    
    if(stars.position.z < -200){
      stars.position.z = 200;
    }
  };

  function starColor() {
    let r = Math.random(256);
    let g = Math.random(256);
    let b = Math.random(256);
  
    star.material.color.setRGB(r, g, b);
  }
  
  setInterval(starColor, 3000);

//The Name Function Portion
function name(){
  let textgeo = "J-vie Nogodula";
  const texture = new THREE.TextureLoader().load("./assets/textures/wooden.jpg");
  const textLoader = new FontLoader();
  textLoader.load("./assets/fonts/Roboto Medium_Regular.json",function(font){
    const tGeometry = new TextGeometry(textgeo,{
      font: font,
      size: 2,
      height: 2
    });
    const tMaterial = new THREE.MeshPhongMaterial({map: texture});
    
    textMesh = new THREE.Mesh(tGeometry, tMaterial);
    tGeometry.center();
    scene.add(textMesh);
    camera.position.z = 15;
    
  });
};

//The Lighting Effects Portion
function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

//Animate Renderer Portion
function animate() {
  requestAnimationFrame(animate);
  animateParticles();
  textMesh.rotation.x += 0.009;
  textMesh.rotation.y += 0.009;
  
  renderer.render(scene, camera);
}

animate();

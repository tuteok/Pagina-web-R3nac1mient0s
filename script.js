// ===== THREE.JS =====

const canvas = document.getElementById("bg");

if (canvas) {

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas,
alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

camera.position.z = 30;

// PARTICULAS

const particlesGeometry =
new THREE.BufferGeometry();

const particlesCount = 1500;

const posArray =
new Float32Array(
particlesCount * 3
);

for(let i=0;i<particlesCount*3;i++){

posArray[i] =
(Math.random()-0.5)*120;

}

particlesGeometry.setAttribute(
'position',
new THREE.BufferAttribute(
posArray,
3
)
);

const particlesMaterial =
new THREE.PointsMaterial({

size:0.12,
color:"#ff1f3d"

});

const particlesMesh =
new THREE.Points(
particlesGeometry,
particlesMaterial
);

scene.add(
particlesMesh
);

function animate(){

requestAnimationFrame(
animate
);

particlesMesh.rotation.y += 0.0007;
particlesMesh.rotation.x += 0.0002;

renderer.render(
scene,
camera
);

}

animate();

window.addEventListener(
'resize',
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});

}

// ===== CONTADORES =====

const stats =
document.querySelectorAll(
".stat-box span"
);

stats.forEach(counter=>{

const texto =
counter.innerText.replace("+","");

const target =
parseInt(texto);

if(isNaN(target)) return;

let count = 0;

const update = ()=>{

if(count < target){

count += Math.ceil(
target / 100
);

counter.innerText =
count + "+";

requestAnimationFrame(
update
);

}else{

counter.innerText =
target + "+";

}

}

update();

});

// ===== ANIMACIONES =====

const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform=
"translateY(0px)";

}

});

});

document
.querySelectorAll(
".card,.step,.stat-box"
)
.forEach(el=>{

el.style.opacity="0";
el.style.transform=
"translateY(60px)";
el.style.transition=
"all 1s ease";

observer.observe(el);

});
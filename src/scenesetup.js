import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let div = document.getElementById('threescene')

// create canvas 
const renderer = new THREE.WebGLRenderer({antialias: true, canvas: div});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// create geometry
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial( { color: "#ffb399" } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


// CREATE A TWINGLY LINE 
const centerX = window.innerWidth / 2
const centerY = window.innerHeight / 2
console.log(centerX, centerY)


const lp = new THREE.BufferGeometry()
const positions = new Float32Array( MAX_POINTS * 3);
lp.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const drawCount = 2; 
lp.setDrawRange(0, drawCount); 


const line = new THREE.Line( lp, m2 );
scene.add( line );
renderer.render( scene, camera );

// UPDATE TWINGLY LINE BASED ON MOUSE POSITION

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
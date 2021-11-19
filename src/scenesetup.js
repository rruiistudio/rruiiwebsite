import * as THREE from 'https://unpkg.com/three/build/three.module.js'

let renderer, scene, camera;

let line;
const MAX_POINTS = 500000;
let drawCount;

init();
animate();
window.addEventListener('resize', onWindowResize, false);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function init() {

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// scene
	scene = new THREE.Scene();

	// camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 0, 1000);

	// geometry
	const geometry = new THREE.BufferGeometry();

	// attributes
	const positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
	geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

	// drawcalls
	drawCount = 2; // draw the first 2 points, only
	geometry.setDrawRange(0, drawCount);

	// material
	const material = new THREE.LineBasicMaterial({
		color: "#47524a",
		linewidth: 3, 
		linecap: 'round', 
	});

	// line
	line = new THREE.Line(geometry, material);
	scene.add(line);

	// update positions
	updatePositions();


}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// update positions
function updatePositions() {

	const positions = line.geometry.attributes.position.array;

	let x, y, z, index;
	x = y = z = index = 0;

	for (let i = 0, l = MAX_POINTS; i < l; i++) {

		positions[index++] = x;
		positions[index++] = y;
		positions[index++] = z;

		x += (Math.random() - 0.5) * 30;
		y += (Math.random() - 0.5) * 30;
		z += (Math.random() - 0.5) * 30;

	}

}

// render
function render() {

	renderer.render(scene, camera);

}

// animate
function animate() {

	requestAnimationFrame(animate);

	drawCount = (drawCount + 1) % MAX_POINTS;

	line.geometry.setDrawRange(0, drawCount);

	if (drawCount === 0) {

		// periodically, generate new data

		updatePositions();

		line.geometry.attributes.position.needsUpdate = true; // required after the first render

	}

	render();

}

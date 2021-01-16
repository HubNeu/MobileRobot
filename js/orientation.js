let package;

const reading = async () =>
{
 	package = await sendRequest('GET', path + 'php/orientation.php');
    	package = JSON.parse(package);
	console.log(package);

	let rotX = Math.atan2(package['ay'], package['az']);
    	let rotZ = Math.atan2(package['ax'], package['az']);

	point.rotation.x = rotX;
    	point.rotation.z = rotZ;

	renderer.render(scene, camera);

	reading();
}

reading();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const pointColor = new THREE.Color("rgb(255, 0, 0)");
const lightColor = new THREE.Color("rgb(255, 255, 255)");

const pointGeometry = new THREE.BoxGeometry(2, 0.25, 5);

const pointMaterial = new THREE.MeshPhongMaterial({
    color: pointColor,
    shininess: 80
});

const point = new THREE.Mesh(pointGeometry, pointMaterial);
const light = new THREE.AmbientLight(lightColor);

point.position.set(0, 0, 0);

scene.add(point);
scene.add(light);

var camera_pivot = new THREE.Object3D();
var X_AXIS = new THREE.Vector3(1, 0, 0);
var Y_AXIS = new THREE.Vector3(0, 1, 0);

var rotation= 0.05;
var move = 0.2;

scene.add(camera_pivot);
camera_pivot.add(camera);
camera.position.set(0, 0, 10);
camera.lookAt(camera_pivot.position);

renderer.render(scene, camera);

$(window).keypress(function(e)
{
    var keyCode = e.which;

    if (keyCode == 68 || keyCode == 100)
        camera_pivot.rotateOnAxis(Y_AXIS, rotation);
    else if (keyCode == 65 || keyCode == 97)
        camera_pivot.rotateOnAxis(Y_AXIS, -rotation);
    else if (keyCode == 87 || keyCode == 119)
        camera_pivot.rotateOnAxis(X_AXIS, -rotation);
    else if (keyCode == 83 || keyCode == 115)
        camera_pivot.rotateOnAxis(X_AXIS, rotation);
    else if (keyCode == 73 || keyCode == 105)
        camera.position.z -= move;
    else if (keyCode == 79 || keyCode == 111)
        camera.position.z += move;
    
    renderer.render(scene, camera);
})
import { Boid } from './Boid.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let lstBoid = [];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function setup() {
    ctx.fillStyle = "black";
    for (var i = 0; i <170; i++) {
        let x_part = getRndInteger(canvas.width, 0);
        let y_part = getRndInteger(0, canvas.height);
        lstBoid.push(new Boid(x_part, y_part, getRndInteger(2, 7), "white"));
    }
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let boid of lstBoid) {
        boid.update(lstBoid);
    }
}

setup();
animate();
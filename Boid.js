import { Vector } from './Vector.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

export class Boid {
    constructor(x, y, radius, color) {
        this.pos = new Vector(x, y)
        this.vel = new Vector(1, 1);
        this.radius = radius;
        this.color = color;
        this.mass = 1;
        this.colliding = false;
        this.cor = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    changeColor(color) {
        this.color = color;
    }

    dist(other) {
        return Math.sqrt(Math.pow(this.pos.x - other.pos.x, 2) + Math.pow(this.pos.y - other.pos.y, 2));
    }

    intersect(other) {
        let d = this.dist(other);
        return d <= this.radius + other.radius;
    }

    checkCollideWith(other) {
        if (this.intersect(other)) {
            this.colliding = true;
            other.colliding = true;
            this.changeVelocityAndDirection(other);
        }
    }

    checkCollision(boids) {
        boids.forEach((circle) => (circle.colliding = false));
        for (let i = 0; i < boids.length; i++) {
            for (let j = i + 1; j < boids.length; j++) {
                boids[i].checkCollideWith(boids[j]);
            }
        }
    }

    addLine(boids) {
        for (let other of boids) {
            if (this.dist(other) <= 150) {
                ctx.lineWidth = Math.random() * (0.4 - 0.2) + 0.2;
                ctx.beginPath();
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(other.pos.x, other.pos.y);
                ctx.strokeStyle = this.color;
                ctx.stroke();
            }
        }
    }

    bouncingWalls() {
        if (this.pos.x + this.vel.x > canvas.width - this.radius || this.pos.x + this.vel.x < this.radius) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y + this.vel.y > canvas.height - this.radius || this.pos.y + this.vel.y < this.radius) {
            this.vel.y = -this.vel.y;
        }
    }

    changeVelocityAndDirection(other) {
        let velocity1 = new Vector(this.vel.x, this.vel.y);
        let velocity2 = new Vector(other.vel.x, other.vel.y);

        let vNorm = new Vector(this.pos.x - other.pos.x, this.pos.y - other.pos.y);

        let unitVNorm = vNorm.normalize();
        let unitVTan = new Vector(-unitVNorm.y, unitVNorm.x);

        let v1n = velocity1.dotProduct(unitVNorm);
        let v1t = velocity1.dotProduct(unitVTan);

        let v2n = velocity2.dotProduct(unitVNorm);
        let v2t = velocity2.dotProduct(unitVTan);

        let cor = Math.min(this.cor, other.cor);

        let v1nAfter =
            (this.mass * v1n + other.mass * v2n + cor * other.mass * (v2n - v1n)) /
            (this.mass + other.mass);

        let v2nAfter =
            (this.mass * v1n + other.mass * v2n + cor * this.mass * (v1n - v2n)) /
            (this.mass + other.mass);

        if (v1nAfter < v2nAfter) {
            return;
        }

        let v1VectorNorm = unitVNorm.multiply(v1nAfter);
        let v1VectorTan = unitVTan.multiply(v1t);

        let v2VectorNorm = unitVNorm.multiply(v2nAfter);
        let v2VectorTan = unitVTan.multiply(v2t);

        let velocity1After = v1VectorNorm.add(v1VectorTan);
        let velocity2After = v2VectorNorm.add(v2VectorTan);

        this.vel.x = velocity1After.x;
        this.vel.y = velocity1After.y;

        other.vel.x = velocity2After.x;
        other.vel.y = velocity2After.y;
    }

    update(boids) {
        this.draw();
        this.pos = this.pos.add(this.vel.multiply(10));
        this.color = this.colliding ? "red" : "white";
        this.bouncingWalls();
        this.checkCollision(boids);
        this.addLine(boids);
    }
}
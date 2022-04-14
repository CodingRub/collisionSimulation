export class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    add(vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    }
  
    subtract(vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
    }
  
    multiply(scalar) {
      return new Vector(this.x * scalar, this.y * scalar);
    }
  
    dotProduct(vector) {
      return this.x * vector.x + this.y * vector.y;
    }
  
    get magnitude() {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
  
    get direction() {
      return Math.atan2(this.x, this.y);
    }

    normalize() {
      let distance = Math.sqrt(this.x * this.x + this.y * this.y);
      return new Vector(this.x / distance, this.y / distance);
    }
}
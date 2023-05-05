const enemyMissiles = [];

class EnemyMissiles {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 4;
    this.height = 18;
  }

  draw() {
    context.fillStyle = "orange";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
    context.fill();
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
  }
}
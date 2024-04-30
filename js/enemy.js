class Enemy1 {
  constructor({ position }) {
    this.width = 30;
    this.height = 30;
    this.velocity = {
      x: 0,
      y: 0
    };
    const image = new Image();
    image.src = '../img/enemy2.png';
    image.onload = () => {
      this.image = image;
      this.width = 34;
      this.height = 34;
      this.position = {
        x: position.x,
        y: position.y
      };
    };
  }

  draw() {
    if (this.image) {
      context.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  update({ velocity }) {
    if (this.image) {
      this.position.x += velocity.x;
      this.position.y += velocity.y;
      if (this.position.y + this.height >= world.height && this.height) {
        alert("😨 Les aliens t'échappent. Vite, rattrappes-les. 😨");
        init();
      }
    }
    this.draw();
  }

  shoot(enemyMissiles) {
    if (this.position) {
      enemyMissiles.push(new EnemyMissiles({
        position: {
          x: this.position.x,
          y: this.position.y
        },
        velocity: {
          x: 0,
          y: 2
        }
      }));
    }
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    };
    this.velocity = {
      x: 0.5, // Vitesse déplacement
      y: 0
    };
    this.aliens = [];
    let rows = Math.floor((world.height / 34) * (1 / 3));
    const columns = Math.floor((world.width / 34) * (2 / 3));
    this.height = rows * 34;
    this.width = columns * 34;
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.aliens.push(
          new Enemy1({
            position: {
              x: x * 34,
              y: y * 34
            }
          })
        );
      }
    }
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y = 0;
    if (this.position.x + this.width >= world.width || this.position.x == 0) {
      this.velocity.x = -this.velocity.x;
      this.velocity.y = 34;
    }
  }
}

class Player {
  constructor() {
    this.velocity = {
      x: 0, // Vitesse de déplacement du joueur sur l'axe horizontal
      y: 0 // Vitesse de déplacement du joueur sur l'axe vertical
    };
    const image = new Image();
    image.src = "../img/player.png";
    image.onload = () => {
      this.image = image;
      this.width = 50;
      this.height = 50;
      this.position = {
        x: world.width / 2 - this.width / 2,
        y: world.height - this.height - 10
      };
    };
  }

  draw() {
    // Le joueur sera une image
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  shoot() {
    missiles.push(
      new Missiles({
        position: {
          x: this.position.x + this.width / 2.1,
          y: this.position.y
        },
        velocity: {
          x: 0,
          y: -6
        }
      })
    );
  }

  update() {
    // À chaque mis à jour on dessine le joueur
    if (this.image) {
      if (keys.ArrowLeft.pressed && keys.ArrowRight.pressed) {
        this.velocity.x = 0;
      } else if (keys.ArrowLeft.pressed && this.position.x >= 0) {
        this.velocity.x = -6;
      } else if (
        keys.ArrowRight.pressed &&
        this.position.x <= world.width - this.width
      ) {
        this.velocity.x = 6;
      } else {
        this.velocity.x = 0;
      }

      this.position.x += this.velocity.x;
      this.draw();
    }
  }
}

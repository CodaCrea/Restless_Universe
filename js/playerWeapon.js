class Missiles {
  constructor ({position}) {
    this.position = position;
    this.velocity = {x: 0, y: -5};
    this.width = 3;
    this.height = 10;
  }

  draw () {
    context.save();
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
    context.fill();
    context.restore();
  }



  update () {
    this.position.y += this.velocity.y;
    this.draw();
  }
}

class Particule {
  constructor ({position, velocity, radius, color}) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
  }
  draw () {
    context.save();
    context.globalAlpha = this.opacity;
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    context.restore();
  }
  update () {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.opacity > 0) {
      this.opacity -= 0.01;
    }
    this.draw();
  }
}
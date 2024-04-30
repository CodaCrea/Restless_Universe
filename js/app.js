const world = document.querySelector("#gameBoard");
const context = world.getContext("2d");
world.width = world.clientWidth;
world.height = world.clientHeight;

let frames = 0;
let missiles;
let alienMissiles;
let grids;
let player;
let particules;
let lifes;

///////////////////////////////////
///////// ANIMATIONS /////////////
/////////////////////////////////

const init = () => {
  missiles = [];
  alienMissiles = [];
  grids = [new Grid()];
  player = new Player();
  particules = [];
  lifes = 3;
  keys.ArrowLeft.pressed = false;
  keys.ArrowRight.pressed = false;
};

init();

// Boucle d'animation
const animationLoop = () => {
  context.clearRect(0, 0, world.width, world.height);
  player.update();
  requestAnimationFrame(animationLoop);

  missiles.forEach((missile, index) => {
    if (missile.position.y + missile.height <= 0) {
      setTimeout(() => {
        missiles.splice(index, 1);
      }, 0);
    } else {
      missile.update();
    }
  });
  grids.forEach((grid, indexGrid) => {
    grid.update();
    // Nombre de missiles par frame
    if (frames % 50 === 0 && grid.aliens.length > 0) {
      grid.aliens[Math.floor(Math.random() * grid.aliens.length)].shoot(
        alienMissiles
      );
    }
    grid.aliens.forEach((aliens, indexI) => {
      aliens.update({ velocity: grid.velocity });
      missiles.forEach((missile, indexM) => {
        if (
          missile.position.y <= aliens.position.y + aliens.height &&
          missile.position.y >= aliens.position.y &&
          missile.position.x + missile.width >= aliens.position.x &&
          missile.position.x - missile.width <= aliens.position.x + aliens.width
        ) {
          for (let i = 0; i < 12; i++) {
            particules.push(
              new Particule({
                position: {
                  x: aliens.position.x + aliens.width / 2,
                  y: aliens.position.y + aliens.height / 2
                },
                velocity: {
                  x: (Math.random() - 0.5) * 2,
                  y: (Math.random() - 0.5) * 2
                },
                radius: Math.random() * 5 + 1,
                color: "orange"
              })
            );
          }
          setTimeout(() => {
            grid.aliens.splice(indexI, 1);
            if (grid.aliens.length === 0) {
              alert("💪 Félicitation, tu as arrêté l'invasion alien 💪");
              init();
            }
            missiles.splice(indexM, 1);
            if (grid.aliens.length === 0 && grids.length == 1) {
              grids.splice(indexGrid, 1);
              grids.push(new Grid());
            }
          }, 0);
        }
      });
    });
  });
  alienMissiles.forEach((alienMissile, index) => {
    if (alienMissile.position.y + alienMissile.height >= world.height) {
      setTimeout(() => {
        alienMissiles.splice(index, 1);
      }, 0);
    } else {
      alienMissile.update();
    }
    if (
      alienMissile.position.y + alienMissile.height >= player.position.y &&
      alienMissile.position.y <= player.position.y + player.height &&
      alienMissile.position.x >= player.position.x &&
      alienMissile.position.x + alienMissile.width <=
        player.position.x + player.width
    ) {
      alienMissiles.splice(index, 1);
      for (let i = 0; i < 22; i++) {
        particules.push(
          new Particule({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y + player.height / 2
            },
            velocity: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 5,
            color: "white"
          })
        );
      }
      lostLife();
    }
  });
  document.getElementById("life").textContent = lifes;

  particules.forEach((particule, index) => {
    if (particule.opacity <= 0) {
      particules.splice(index, 1);
    } else {
      particule.update();
    }
  });
  frames++;
};
animationLoop();

const lostLife = () => {
  lifes--;
  document.getElementById("life").textContent = lifes;
  if (lifes < 0) {
    alert("🙏 Ton compteur de vie est à zéro. La fin du monde est proche ! 🙏");
    init();
  }
};

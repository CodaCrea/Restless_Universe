const keys = {
  ArrowLeft: {pressed: false},
  ArrowRight: {pressed: false},
};

addEventListener('keydown', ({key}) => {
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      break;
  }
});

addEventListener("keyup", ({key}) => {
  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case " ":
      player.shoot();
      break;
  }
});
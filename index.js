import { BACKGROUND_COLOR } from "./consts.js";
import { getBodyPart, getHead } from "./scripts/body.js";
import Snake from "./scripts/snake.js";

const canvas = document.getElementById("main-field");
const ctx = canvas.getContext("2d");

const drawBackground = () => {
  ctx.fillStyle = `rgb(${BACKGROUND_COLOR.r}, ${BACKGROUND_COLOR.g}, ${BACKGROUND_COLOR.b}, 143)`;
  ctx.fillRect(20, 20, 256, 256);
};

const snake = new Snake(ctx, { r: 255, g: 20, b: 147, a: 255 });

drawBackground();
snake.drawSnake();

setInterval(() => {
  drawBackground();
  snake.move();
  snake.drawSnake();
}, 1000);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      snake.setMove("up");
      break;
    case "ArrowDown":
      snake.setMove("down");
      break;
    case "ArrowLeft":
      snake.setMove("left");
      break;
    case "ArrowRight":
      snake.setMove("right");
      break;
  }
});

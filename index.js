import { getBodyPart, getHead } from "./scripts/body.js";
import Snake from "./scripts/snake.js";

const canvas = document.getElementById("main-field");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(143, 188, 143)";
ctx.fillRect(20, 20, 256, 256);

const snake = new Snake({ r: 255, g: 20, b: 147, a: 255 });
console.log(snake);
const head = getHead(ctx, snake.parts[0].color, {
  r: 143,
  g: 188,
  b: 143,
  a: 255
});
ctx.putImageData(
  head,
  20 + snake.parts[0].x * 16,
  20 + 20 + snake.parts[0].y * 16
);

setInterval(() => {
  console.log("step");
  ctx.fillStyle = "rgb(143, 188, 143)";
  ctx.fillRect(20, 20, 256, 256);
  snake.moveRight();
  const head = getHead(ctx, snake.parts[0].color, {
    r: 143,
    g: 188,
    b: 143,
    a: 255
  });
  ctx.putImageData(
    head,
    20 + (snake.parts[0].x % 16) * 16,
    20 + (snake.parts[0].y % 16) * 16
  );
}, 1000);

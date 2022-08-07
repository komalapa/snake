import { BACKGROUND_COLOR, SIZE } from "./consts.js";
import Snake from "./scripts/snake.js";
import { getColor } from "./utils.js";
import { getFoodSprite } from "./scripts/food.js";

const canvas = document.getElementById("main-field");
const ctx = canvas.getContext("2d");

let foodX, foodY, foodColor;

const drawBackground = () => {
  ctx.fillStyle = `rgb(${BACKGROUND_COLOR.r}, ${BACKGROUND_COLOR.g}, ${BACKGROUND_COLOR.b}, 143)`;
  ctx.fillRect(0, 0, 256, 256);
};

const setFoodParams = (snake) => {
  do {
    foodX = Math.floor(Math.random() * SIZE);
    foodY = Math.floor(Math.random() * SIZE);
  } while (snake.isSnakeBody(foodX, foodY));
  foodColor = getColor();
};

const drawFood = () => {
  ctx.putImageData(
    getFoodSprite(ctx, BACKGROUND_COLOR, foodColor),
    foodX * 16,
    foodY * 16
  );
};

const snake = new Snake(ctx, getColor());

setFoodParams(snake);
drawFood();
drawBackground();
snake.drawSnake();

let gameInterval;

const stopGame = () => {
  clearInterval(gameInterval);
  gameInterval = 0;
  snake.renew();
};

const startGame = () =>
  (gameInterval = setInterval(() => {
    drawBackground();
    snake.move();
    if (snake.isSelfEaten()) {
      alert("Do not eat yourself!");
      stopGame();
    }
    if (snake.parts[0].x === foodX && snake.parts[0].y === foodY) {
      snake.eat(foodX, foodY, foodColor);
      setFoodParams(snake);
    }
    drawFood();
    snake.drawSnake();
  }, 200));

// keyboard
document.addEventListener("keydown", (e) => {
  if (!gameInterval) startGame();
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
// buttons
const setListenerToButton = (direction) =>
  document
    .querySelector(`#button-${direction}`)
    .addEventListener("click", () => {
      if (!gameInterval) startGame();
      snake.setMove(direction);
    });
setListenerToButton("up");
setListenerToButton("down");
setListenerToButton("left");
setListenerToButton("right");

document.addEventListener("touchmove", (event) => {
  console.log(event);
});

//swipe
let startX, startY, moveX, moveY;
//here clientX, and clientY means X and Y coordinates
const setTouchStart = (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
};

const getTouchMove = (e) => {
  return [e.touches[0].clientX, e.touches[0].clientY];
};

const applySwipe = (e) => {
  const [moveX, moveY] = getTouchMove(e);
  if (startX + 100 < moveX) {
    snake.setMove("right");
  } else if (startX - 100 > moveX) {
    snake.setMove("left");
  } else if (startY + 100 < moveY) {
    snake.setMove("down");
  } else if (startY - 100 > moveY) {
    snake.setMove("up");
  }
  if (!gameInterval) startGame();
};

document.addEventListener("touchstart", (e) => setTouchStart(e));
document.addEventListener("touchmove", (e) => {
  applySwipe(e);
});

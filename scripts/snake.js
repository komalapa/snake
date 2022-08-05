import { SIZE, BACKGROUND_COLOR } from "../consts.js";
import { getHead } from "./body.js";

export default class Snake {
  constructor(context, color, x = 0, y = 0) {
    this.context = context;
    this.parts = [{ x, y, color }];
    this.headSprite = getHead(
      this.context,
      this.parts[0].color,
      BACKGROUND_COLOR
    );
    this.move = this.moveDown;
  }

  setMove = (direction) => {
    console.log(direction);
    switch (direction) {
      case "down":
        this.move = this.moveDown;
        break;
      case "up":
        this.move = this.moveUp;
        break;
      case "left":
        this.move = this.moveLeft;
        break;
      case "right":
        this.move = this.moveRight;
        break;
    }
  };

  updateTail = (newSnakePosition) => {
    for (let i = 1; i < this.parts.length; i++) {
      newSnakePosition.push({
        ...this.parts(i - 1),
        color: this.parts[i].color
      });
    }
  };
  moveDown = () => {
    const newSnakePosition = [
      {
        x: this.parts[0].x,
        y: (this.parts[0].y + 1) % SIZE,
        color: this.parts[0].color
      }
    ];
    this.updateTail(newSnakePosition);
    this.parts = newSnakePosition;
  };
  moveUp = () => {
    const newSnakePosition = [
      {
        x: this.parts[0].x,
        y: this.parts[0].y > 0 ? this.parts[0].y - 1 : SIZE - 1,
        color: this.parts[0].color
      }
    ];
    this.updateTail(newSnakePosition);
    this.parts = newSnakePosition;
  };
  moveLeft = () => {
    const newSnakePosition = [
      {
        x: this.parts[0].x > 0 ? this.parts[0].x - 1 : SIZE - 1,
        y: this.parts[0].y,
        color: this.parts[0].color
      }
    ];
    this.updateTail(newSnakePosition);
    this.parts = newSnakePosition;
  };
  moveRight = () => {
    const newSnakePosition = [
      {
        x: (this.parts[0].x + 1) % 16,
        y: this.parts[0].y,
        color: this.parts[0].color
      }
    ];
    this.updateTail(newSnakePosition);
    this.parts = newSnakePosition;
  };

  drawSnake = () => {
    this.context.putImageData(
      this.headSprite,
      20 + this.parts[0].x * 16,
      20 + this.parts[0].y * 16
    );
  };
}

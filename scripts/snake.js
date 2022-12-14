import { SIZE, BACKGROUND_COLOR } from "../consts.js";
import { getBodyPart, getHead } from "./body.js";
import { getColor } from "../utils.js";

export default class Snake {
  constructor(context, color, x = 0, y = 0) {
    this.context = context;
    this.parts = [{ x, y, color }];
    this.headSprite = getHead(
      this.context,
      this.parts[0].color,
      BACKGROUND_COLOR
    );
    this.bodySprites = this.parts
      .slice(1)
      .map((part) => getBodyPart(this.context, part.color, BACKGROUND_COLOR));
    this.move = this.moveDown;
  }

  setMove = (direction) => {
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
        ...this.parts[i - 1],
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

  eat = (x, y, color) => {
    this.parts.push({ x, y, color });
    this.bodySprites.push(getBodyPart(this.context, color, BACKGROUND_COLOR));
  };

  drawSnake = () => {
    this.context.putImageData(
      this.headSprite,
      this.parts[0].x * 16,
      this.parts[0].y * 16
    );
    this.bodySprites.forEach((sprite, index) =>
      this.context.putImageData(
        sprite,
        this.parts[index + 1].x * 16,
        this.parts[index + 1].y * 16
      )
    );
  };

  renew = () => {
    this.parts = [
      { x: this.parts[0].x, y: this.parts[0].y, color: getColor() }
    ];
    this.headSprite = getHead(
      this.context,
      this.parts[0].color,
      BACKGROUND_COLOR
    );
    this.bodySprites = this.parts
      .slice(1)
      .map((part) => getBodyPart(this.context, part.color, BACKGROUND_COLOR));
    this.move = this.moveDown;
  };

  isSnakeBody = (x, y) =>
    this.parts.some((part) => part.x === x && part.y === y);

  isSelfEaten = () =>
    this.parts
      .slice(1)
      .some((part) => part.x === this.parts[0].x && part.y === this.parts[0].y);
}

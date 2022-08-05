export default class Snake {
  constructor(color, x = 0, y = 0) {
    this.parts = [{ x, y, color }];
    this.move = this.moveDown;
  }

  setMove = (direction) => {
    switch (direction) {
      case "down":
        this.move = this.moveDown;
      case "up":
        this.move = this.moveDown;
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
        y: this.parts[0].y + 1,
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
        y: this.parts[0].y - 1,
        color: this.parts[0].color
      }
    ];
    this.updateTail(newSnakePosition);
    this.parts = newSnakePosition;
  };
  moveLeft = () => {
    const newSnakePosition = [
      {
        x: this.parts[0].x - 1,
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
        x: this.parts[0].x + 1,
        y: this.parts[0].y,
        color: this.parts[0].color
      }
    ];
    this.updateTail(newSnakePosition);
    this.parts = newSnakePosition;
  };
}

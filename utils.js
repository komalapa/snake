import { COLORS } from "./consts.js";

const setPixel = (imageData, x, y, r, g, b, a) => {
  const index = (x + y * imageData.width) * 4;
  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
};

export const drawSprite = (imageData, map, colors) => {
  for (let i = 0; i < map.length; i++) {
    const line = map[i];
    for (let j = 0; j < line.length; j++) {
      setPixel(
        imageData,
        j,
        i,
        colors[line[j]].r,
        colors[line[j]].g,
        colors[line[j]].b,
        colors[line[j]].a
      );
    }
  }
};

export const getColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

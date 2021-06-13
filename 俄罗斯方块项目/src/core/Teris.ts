import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandom } from "./util";

export class TShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}
export class LShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}
export class LMirrorShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}
export class SShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}
export class SMirrorShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}
export class SquareShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  afterRotateShape() {
    return this.shape;
  }
}
export class LineShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      _centerPoint,
      _color
    );
  }
  rotate() {
    super.rotate();
    this.isClock = !this.isClock;
  }
}
const shapeArr = [
  // TShape,
  // LShape,
  // LMirrorShape,
  // SShape,
  // SMirrorShape,
  SquareShape,
  // LineShape,
];
const colorArr = ["red", "blue", "green", "yellow", "orange"];

//随机生成一个俄罗斯方块
export function createTeris(centerPoint: Point): SquareGroup {
  let index = getRandom(0, shapeArr.length);
  const shape = shapeArr[index];
  index = getRandom(0, colorArr.length);
  const color = colorArr[index];
  return new shape(centerPoint, color);
}

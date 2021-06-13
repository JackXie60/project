//俄罗斯方块规则类
import { Direction, Point, Shape } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

function isPoint(obj: any): obj is Point {
  if (typeof obj.x !== "undefined") {
    return true;
  } else {
    return false;
  }
}
export class TerisRules {
  static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
    const target: Point[] = shape.map((p) => {
      return {
        x: p.x + targetPoint.x,
        y: p.y + targetPoint.y,
      };
    });
    //如果result为true表明不能够移动
    let result = target.some((p) => {
      if (
        p.x < 0 ||
        p.x >= GameConfig.panelWidth ||
        p.y < 0 ||
        p.y >= GameConfig.panelHeight
      ) {
        return true;
      }
      return false;
    });
    if (!result) {
      result = target.some((p) => {
        return exists.some((sq) => {
          return sq.point.x === p.x && sq.point.y === p.y;
        });
      });
      if (!result) {
        return true;
      }
    }
    return false;
  }
  static move(
    teris: SquareGroup,
    targetPoint: Point,
    exists: Square[]
  ): boolean;
  static move(
    teris: SquareGroup,
    direction: Direction,
    exists: Square[]
  ): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point | Direction,
    exists: Square[]
  ) {
    let target: Point;
    if (isPoint(targetPointOrDirection)) {
      target = targetPointOrDirection;
    } else {
      if (targetPointOrDirection == Direction.down) {
        target = {
          x: teris.centerPoint.x,
          y: teris.centerPoint.y + 1,
        };
      } else if (targetPointOrDirection == Direction.left) {
        target = {
          x: teris.centerPoint.x - 1,
          y: teris.centerPoint.y,
        };
      } else {
        target = {
          x: teris.centerPoint.x + 1,
          y: teris.centerPoint.y,
        };
      }
    }
    if (this.canIMove(teris.shape, target, exists)) {
      teris.centerPoint = target;
      return true;
    }
    return false;
  }
  static moveDirectly(
    teris: SquareGroup,
    direction: Direction,
    exists: Square[]
  ) {
    while (this.move(teris, direction, exists)) {}
  }
  //旋转是否越界规则判断
  static rotate(teris: SquareGroup, exists: Square[]) {
    const shape = teris.afterRotateShape();
    if (this.canIMove(shape, teris.centerPoint, exists)) {
      teris.rotate();
      return true;
    } else {
      return false;
    }
  }
  //清除
  static deleteSquares(exists: Square[]):number {
    let num = 0;
    const yArr = exists.map((sq) => {
      return sq.point.y;
    });
    const yMin = Math.min(...yArr);
    const yMax = Math.max(...yArr);
    //判断每一行是否填满了
    for (let i = yMin; i <= yMax; i++) {
      const squares = exists.filter((sq) => {
        return sq.point.y === i;
      });
      //将填满的行删除
      if (squares.length === GameConfig.panelWidth) {
        num += 1;
        squares.forEach((sq) => {
          sq.viewer.remove();
          // 删除exists中保存的方块数据
          const index = exists.indexOf(sq);
          exists.splice(index, 1);
        });
        //删除行上面的方块下移一个
        exists.forEach((sq) => {
          if (sq.point.y < i) {
            sq.point = {
              x: sq.point.x,
              y: sq.point.y + 1,
            };
          }
        });
      }
    }
    return num;
  }
}

import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRules } from "./TerisRule";
import { Direction, GameStatus, GameViewer, Shape } from "./types";
import GameConfig from "./GameConfig";
import { Square } from "./Square";

export class Game {
  private _status: GameStatus = GameStatus.init;
  private curTeris?: SquareGroup;
  private nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
  private timer?: number;
  private duration?:number;
  private _viewer?: GameViewer;
  private _exists: Square[] = [];
  private _score: number = 0;

  public get score() {
    return this._score;
  }
  public set score(val) {
    this._score = val;
    this._viewer.showScore(val);
    const curLevel = GameConfig.level
      .filter((level) => {
        return this._score > level.score;
      })
      .pop();
    if (curLevel && this._score !== curLevel.duration) {
      this.duration = curLevel.duration;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.autoDrop();
      }
    }

  }
  public get viewer() {
    return this._viewer;
  }
  public set viewer(val) {
    this._viewer = val;
  }
  public get status() {
    return this._status;
  }
  public set status(val) {
    this._status = val;
    if (this._status === GameStatus.pause) {
      this._viewer.onPagePause();
    } else if (this._status === GameStatus.over) {
      this._viewer.onPageOver();
    } else if (this._status === GameStatus.playing) {
      this._viewer.onPageStart();
    }
  }
  public constructor(_viewer: GameViewer) {
    this.duration = GameConfig.level[0].duration;
    this._viewer = _viewer;
    this._viewer.showNext(this.nextTeris);
    this.resetCenterPoint(GameConfig.nextWidth, this.nextTeris);
    this._viewer.init(this);
  }
  //开始
  start() {
    if (this.status === GameStatus.playing) {
      return;
    }
    if (this.status === GameStatus.over) {
      this.init();
    }
    this.status = GameStatus.playing;
    if (!this.curTeris) {
      this.switch();
    }
    this.autoDrop();
  }
  //初始化操作
  init() {
    this._exists.forEach((sq) => {
      sq.viewer.remove();
    });
    this.curTeris = undefined;
    this.nextTeris = createTeris({ x: 0, y: 0 });
    this._exists = [];
    this.score = 0;
  }
  //游戏启动过程中控制运动
  controlLeft() {
    if (this.curTeris && this.status === GameStatus.playing) {
      TerisRules.move(this.curTeris, Direction.left, this._exists);
    }
  }
  controlRight() {
    if (this.curTeris && this.status === GameStatus.playing) {
      TerisRules.move(this.curTeris, Direction.right, this._exists);
    }
  }
  controlDown() {
    if (this.curTeris && this.status === GameStatus.playing) {
      TerisRules.moveDirectly(this.curTeris, Direction.down, this._exists);
      //触底
      this.hitBottom();
    }
  }
  rotate() {
    if (this.curTeris && this.status === GameStatus.playing) {
      TerisRules.rotate(this.curTeris, this._exists);
    }
  }
  //切换目前方块和下一个方块
  switch() {
    this.curTeris = this.nextTeris;
    this.nextTeris = createTeris({ x: 0, y: 0 });
    this._viewer.switch(this.curTeris);
    this.resetCenterPoint(GameConfig.panelHeight, this.curTeris);
    if (
      !TerisRules.canIMove(
        this.curTeris.shape,
        this.curTeris.centerPoint,
        this._exists
      )
    ) {
      this.curTeris.squares.forEach((sq) => {
        sq.viewer.remove();
      });
      this.status = GameStatus.over;
      clearInterval(this.timer);
      this.timer = null;
      this.curTeris = undefined;
    }
    this._viewer.showNext(this.nextTeris);
    this.resetCenterPoint(GameConfig.nextWidth, this.nextTeris);
  }
  autoDrop() {
    //自动下落
    if (this.timer || this.status !== GameStatus.playing) {
      return;
    }
    this.timer = window.setInterval(() => {
      if (this.curTeris) {
        const result = TerisRules.move(
          this.curTeris!,
          Direction.down,
          this._exists
        );
        if (!result) {
          this.hitBottom();
        }
      }
    }, this.duration);
  }
  //暂停
  pause() {
    if (this.status === GameStatus.playing) {
      clearInterval(this.timer);
      this.timer = null;
      this.status = GameStatus.pause;
    }
  }
  //重新设置中心点坐标
  private resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil((width - 1) / 2) - 1;
    teris.centerPoint = {
      x: x,
      y: teris.centerPoint.y,
    };
    while (
      teris.squares.some((sq) => {
        return sq.point.y < 0;
      })
    ) {
      teris.centerPoint = {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y + 1,
      };
    }
  }
  //触底逻辑
  private hitBottom() {
    this.curTeris.squares.forEach((sq) => {
      this._exists.push(sq);
    });
    //清除并且根据清除元素积分
    const num = TerisRules.deleteSquares(this._exists);
    if (num === 1) {
      this.score += 5;
    } else if (num === 2) {
      this.score += 15;
    } else if (num === 3) {
      this.score += 30;
    } else if (num >= 4) {
      this.score += 50;
    }
    this.switch();
  }
}

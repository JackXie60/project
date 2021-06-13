import { Game } from "./Game";
import { SquareGroup } from "./SquareGroup";

export interface Point{
    readonly x:number,
    readonly y:number,
}

export interface IViewer{
    show():void,
    remove():void,
}
export type Shape=Point[];

export enum Direction{
    left,
    right,
    down,
}
//游戏状态
export enum GameStatus{
    init,//游戏初始化
    playing,//游戏开始
    pause,//游戏暂停
    over,//游戏结束
}
//游戏显示接口
export interface GameViewer{
    showNext(teris:SquareGroup):void;
    switch(teris:SquareGroup):void;
    showScore(score:number):void;
    init(game:Game):void;
    onPageStart():void;
    onPagePause():void;
    onPageOver():void;
}
import {Shape,Point} from './types';
import {Square} from './Square'

//方块组合类
export class SquareGroup{
    private _squares?:readonly Square[];

    public get squares(){
        return this._squares;
    }

    public get centerPoint(){
        return this._centerPoint;
    }
    public get shape(){
        return this._shape;
    }
    public set shape(val){
        this._shape = val;
        this.setNewSquares();
    }
    public set centerPoint(val){
        this._centerPoint = val
        this.setNewSquares();
    }
    private setNewSquares(){
        this._squares?.forEach((sq,i)=>{
            sq.point = {
                x:this._centerPoint.x+this._shape[i].x,
                y:this._centerPoint.y+this._shape[i].y,
            };
        })
    }
    public constructor(
        private _shape:Shape,
        private _centerPoint:Point,
        private _color:string
    ){
        let arr:Square[] = [];
        this._shape.forEach((item)=>{
            const sq = new Square();
            sq.point = {
                x:_centerPoint.x+item.x,
                y:_centerPoint.y+item.y,
            };
            sq.color = _color;
            arr.push(sq);
        })
        this._squares = arr;
    }
    //旋转功能
    
    //是否是顺时针旋转
    protected isClock = true; 
    //旋转之后的形状
    public afterRotateShape():Shape{
        let newSh:Shape;
        if(this.isClock){
            newSh = this._shape.map(p=>{
                return {
                    x:-p.y,
                    y:p.x
                }
            })
        }else{
            newSh = this._shape.map(p=>{
                return {
                    x:p.y,
                    y:-p.x,
                }
            })
        };
        return newSh;
    }
    //进行图形上的旋转变换
    public rotate(){
        const newShape = this.afterRotateShape();
        this.shape = newShape;
    }
}
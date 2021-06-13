import {Square} from '../Square';
import {IViewer} from '../types';
import $ from "jquery"
import SquareConfig from './SquareConfig'

//方块显示类
export class SquarePageViewer implements IViewer{
    private dom?:JQuery<HTMLElement>;
    private isRemove=false;
    //将小方块显示到页面上
    show(): void {
        if(!this.isRemove){
            if(!this.dom){
                this.dom = $("<div>").css({
                    width:SquareConfig.size.width,
                    height:SquareConfig.size.height,
                    border:"1px solid #ccc",
                    position:"absolute",
                    boxSizing:'border-box'
                });
                this.dom.appendTo(this.container);
            }
            this.dom.css({
                left:this.sq.point.x*SquareConfig.size.width,
                top:this.sq.point.y*SquareConfig.size.height,
                backgroundColor:this.sq.color,
            })
        }
    }
    remove(): void {
        if(this.dom&&!this.isRemove){
            this.dom.remove();
            this.isRemove = true;
        }
    }
    public constructor(
        private sq:Square,
        private container:JQuery<HTMLElement>
    ){}
}
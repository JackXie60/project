import { SquareGroup } from "../SquareGroup";
import { GameStatus, GameViewer } from "../types";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery"
import { Game } from "../Game";

export class GamePageViewer implements GameViewer{
    private scoreDom:JQuery<HTMLElement> = $("#score");
    private statusDom:JQuery<HTMLElement> = $("#msg");
    showScore(score:number): void {
        this.scoreDom.html(score.toString());
    }
    onPageStart(){
        this.statusDom.css({
            display:"none",
        });
    }
    onPagePause(){
        this.statusDom.css({
            display:"block",
        });
        this.statusDom.find("p").html("游戏暂停")
    }
    onPageOver(){
        this.statusDom.css({
            display:"block",
        });
        this.statusDom.find("p").html("游戏结束")
    }
    //初始化
    init(game:Game){
        $(document).on("keydown",(e)=>{
            if(e.keyCode===37){
                game.controlLeft();
            }
            else if(e.keyCode===38){
                game.rotate();
            }
            else if(e.keyCode===39){
                game.controlRight();
            }
            else if(e.keyCode===40){
                game.controlDown();
            }
            else if(e.keyCode===32){
                if(game.status===GameStatus.playing){
                    game.pause();
                }else{
                    game.start(); 
                }
            }
        })
    }
    //显示下一个方块
    showNext(teris: SquareGroup): void {
        teris.squares.forEach(sq=>{
            sq.viewer = new SquarePageViewer(sq,$("#next"));
            sq.viewer.show();
        })
    }
    switch(teris: SquareGroup): void {
        teris.squares.forEach(sq=>{
            sq.viewer?.remove();
            sq.viewer = new SquarePageViewer(sq,$("#panel"));
            sq.viewer.show();
        })
    }
    
}
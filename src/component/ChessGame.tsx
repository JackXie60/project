import React from "react";
import { ChessResult, ChessType, NextChess } from "../type/enum";
import BoardComp from "./BoardComp";
import ShowComp from "./ShowComp";

interface IState{
    chessArr:ChessType[]
    chessResult:ChessResult
    nextChess:NextChess
}
export class GameComp extends React.Component<{},IState> {
    state:IState={
        chessArr:[],
        chessResult:ChessResult.gaming,
        nextChess:NextChess.black,
    }

    componentDidMount(){
        this.init();
    }

    getChessStatus(chessArr:ChessType[],index:number):ChessResult{
        const chessNumOne = (index/3)*3;
        const chessNumTwo = index%3;
        if(chessArr[chessNumOne]===chessArr[chessNumOne+1]&&chessArr[chessNumOne]===chessArr[chessNumOne+2]&&chessArr[chessNumOne]!==ChessType.none){
            if(this.state.nextChess===NextChess.black){
                return ChessResult.blackwin
            }
            else{
                return ChessResult.redwin
            }
        }
        else if(chessArr[chessNumTwo]===chessArr[chessNumTwo+3]&&chessArr[chessNumTwo]===chessArr[chessNumTwo+6]&&chessArr[chessNumTwo]!==ChessType.none){
            if(this.state.nextChess===NextChess.black){
                return ChessResult.blackwin
            }
            else{
                return ChessResult.redwin
            }
        }
        else if((chessArr[0]===chessArr[4]&&chessArr[0]===chessArr[8]&&chessArr[0]!==ChessType.none)
            || (chessArr[2]===chessArr[4]&&chessArr[2]===chessArr[6]&&chessArr[2]!==ChessType.none))
        {
            if(this.state.nextChess===NextChess.black){
                return ChessResult.blackwin
            }
            else{
                return ChessResult.redwin
            }
        }
        if(!chessArr.includes(ChessType.none)){
            return ChessResult.equal
        }
        return ChessResult.gaming
        
    }

    handleClick(index:number){
        const chessArr:ChessType[] = [...this.state.chessArr];
        if(this.state.nextChess===NextChess.black){
            chessArr[index] = ChessType.black;
            this.setState({
                nextChess:NextChess.red,
            })
        }
        else{
            chessArr[index] = ChessType.red;
            this.setState({
                nextChess:NextChess.black,
            })
        }
        this.setState({
            chessArr:chessArr,
            chessResult:this.getChessStatus(chessArr,index),
        })
    }

    init(){
        let arr:ChessType[] = [];
        for(let i = 0; i < 9; i++){
            arr.push(ChessType.none);
        }
        this.setState({
            chessArr:arr
        })
    }

    render(){
        return(
            <div>
                <ShowComp 
                status={this.state.chessResult}
                nextChess={this.state.nextChess}
                />
                <BoardComp 
                chessArr={this.state.chessArr}
                isGameOver={this.state.chessResult!==ChessResult.gaming}
                onClick={this.handleClick.bind(this)}
                />
            </div>
        )
    }
}

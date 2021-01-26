import React from 'react'
import { ChessResult, NextChess } from '../type/enum'
import './ShowComp.css'

interface IProp{
    status:ChessResult
    nextChess:NextChess
}
export default function ShowComp(props:IProp) {
    let context:JSX.Element;
    if(props.status===ChessResult.redwin){
        context = <div className='win redstyle'>红子获胜</div>
    }
    else if(props.status===ChessResult.blackwin){
        context = <div className='win blackstyle'>黑子获胜</div>
    }
    else if(props.status===ChessResult.equal){
        context = <div className='equal'>平局</div>
    }
    else{
        if(props.nextChess===NextChess.red){
            context = <div className='gaming redstyle'>红子出棋</div>
        }
        else{
            context = <div className='gaming blackstyle'>黑子出棋</div>
        }
    }
    return (
        <div className='show-wrapper'>
            {context}
        </div>
    )
}

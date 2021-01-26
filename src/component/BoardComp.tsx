import React from 'react'
import { ChessType } from '../type/enum'
import ChessComp from './ChessComp'
import './BoardComp.css'

interface IProp {
    chessArr:ChessType[]
    isGameOver?:Boolean
    onClick?:(index:number)=>void
}
const BoardComp:React.FC<IProp> = function (props) {
    const isGameOver = props.isGameOver!;
    const chessArr = props.chessArr.map((item,i)=><ChessComp 
        key={i} 
        type={item}
        onClick={()=>{
            if(props.onClick&&!isGameOver){
                props.onClick(i);
            }
        }}
        />);
    return (
        <div className='board-wrapper'>
            { chessArr }    
        </div>
    )
}
export default BoardComp;

BoardComp.defaultProps = {
    isGameOver:false
}
import React from 'react'
import { ChessType } from '../type/enum'
import './ChessComp.css'

interface IProps  {
    type:ChessType
    onClick?:()=>void
}
export default function ChessComp(props:IProps) {
    let chess = null;
    if(props.type===ChessType.red){
        chess = <div className='chess red'></div>
    }
    else if(props.type===ChessType.black){
        chess = <div className='chess black'></div>
    }
    return (
        <div className='chess-wrapper' onClick={()=>{
            if((props.type === ChessType.none&&props.onClick)){
                props.onClick();
            }
        }}>
            { chess }
        </div>
    )
}

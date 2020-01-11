import React, {useCallback , useEffect, useRef , memo} from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td =  memo(({rowIndex, cellIndex, dispatch , cellData}) => {
  console.log('td rendered');

  const ref = useRef([]);

  /* 디버그하는방법
  useEffect(()=>{
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    console.log(cellData,ref.current[3]);
    ref.current = [rowIndex,cellIndex,dispatch,cellData];
  },[rowIndex,cellIndex,dispatch,cellData]);
  */

  const onClickTd = useCallback(() => {
    if(cellData){
      return;
    }
    console.log(rowIndex, cellIndex);
    dispatch({type : CLICK_CELL, row : rowIndex, cell : cellIndex });
    //dispatch({type : CHANGE_TURN });
  },[cellData]);

  return (
      <td onClick={onClickTd}>{cellData}</td>
  );
});

export default Td;

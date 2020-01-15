import React, { useContext,useCallback ,memo,useMemo} from 'react';
import {
  TableContext , CODE  , OPEN_CELL , CLICKED_MINE , CLICK_MINE,
  FLAG, FLAG_MINE, QUESTION_MINE, QUESTION, FLAG_CELL, NORMALIZE_CELL,
  QUESTION_CELL,
} from './MineSearch';

const getTdStyle = (code) => {
  switch(code){
    case CODE.MINE :
    case CODE.NORMAL :
      return {
        background:'#444',
      }
      break;

    case CODE.CLICKED_MINE :
    case CODE.OPENED :
      return {
        background : 'white',
      }
      break;

      case CODE.FLAG_MINE:
      case CODE.FLAG:
      return {
        background : 'red',
      }
      break;

      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
      return {
        background : 'yellow',
      }
      break;

    default :
      return{
        background : 'white',
      }
  }
};

const getTdText = (code) => {
  console.log('getTdText');
  switch (code) {

    case CODE.NORMAL:
      return '';
    break;

    case CODE.MINE:
      return 'X';
    break;

    case CODE.CLICKED_MINE:
      return '펑티모';
    break;

    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    break;

    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    break;

    default:
      return code || '';
  }
};

const Td = memo(({ rowIndex, cellIndex, dispatch }) => {
  const {tableData,halted} = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if(halted){
      return;
    }

    switch(tableData[rowIndex][cellIndex]){
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return;

      case CODE.NORMAL :
        dispatch({type:OPEN_CELL, row:rowIndex, cell:cellIndex });
        return;

      case CODE.MINE :
        dispatch({type:CLICK_MINE, row:rowIndex, cell:cellIndex});
        return;
    }
  },[tableData[rowIndex][cellIndex],halted]);

  const onRightClickTd = useCallback((e)=>{
    e.preventDefault();
    if(halted){
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({type:FLAG_CELL,row:rowIndex, cell:cellIndex});
        break;

      case CODE.FLAG_MINE:
      case CODE.FLAG:
        dispatch({type:QUESTION_CELL , row:rowIndex , cell:cellIndex});
        break;

      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        dispatch({type:NORMALIZE_CELL , row:rowIndex, cell:cellIndex});
        break;

      default:
        return;
    }
  },[tableData[rowIndex][cellIndex],halted]);

  console.log('td rendered');

  return useMemo(() => (
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick = {onClickTd}
      onContextMenu={onRightClickTd}
      >{getTdText(tableData[rowIndex][cellIndex])}</td>
  ), [tableData[rowIndex][cellIndex]]);
});


export default Td;

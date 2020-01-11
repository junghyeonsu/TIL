import React , { useState , useEffect , useReducer, useCallback, useMemo, memo } from 'react';
import Table from './Table';

// state초기화
// useReducer쓰는이유 ?? state들이 많으면 구조가 복잡할수록(많아질수록)
// state값들을 넘기기가 힘들기때문에 하나의 변수로 넘겨주는 것이다.

/*
 initialState 로 state 들을 모아주고,
 dispatch로 action 이름과 매개변수들을 넘겨주고
 reducer 에서 action 을 처리해준다.
*/

const initialState = {
  winner : '',
  turn : 'O',
  tableData : [
    ['','',''],
    ['','',''],
    ['','','']
  ],
  recentCell : [-1,-1],
  draw : false,
}

//모듈로 만든다. 왜냐하면 td에서 쓸거기떄문에
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const DRAW_GAME = 'DRAW_GAME';

// reducer는 함수이다.
// reducer에서 initialState에 있는 state들이 어떻게 바뀔지 적어준다.
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER :
      return {
        ...state,
        winner : action.winner,
      }

    case CLICK_CELL : {
      const tableData = [...state.tableData]; // 얕은 복사
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell : [action.row , action.cell],
      };
    }
    case CHANGE_TURN : {
      return {
        ...state,
        turn : state.turn === 'O' ? 'X' : 'O' ,
      }
    }

    case RESET_GAME : {
      return {
        ...state,
        turn : 'O',
        tableData : [
          ['','',''],
          ['','',''],
          ['','','']
        ],
        recentCell : [-1,-1],
        draw : false,
      }
    }

    case DRAW_GAME : {
      return {
        ...state,
        draw : true,
        turn : 'O',
        tableData : [
          ['','',''],
          ['','',''],
          ['','','']
        ],
        recentCell : [-1,-1],
        winner : '',
      }
    }
  }


}

const TicTacToe = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData , turn, winner, recentCell } = state;

  //const [winner,setWinner] = useState('');
  //const [turn,setTurn] = useState('0');
  //const [tableData,setTableDate] = useState([['','',''],['','',''],['','','']]);

  const onClickTable = useCallback(() => {
    // dispatch 는 action 이라고 생각하면되는데
    // dispatch해줄때마다 reducer가 실행된다.
    dispatch({type : SET_WINNER , winner : 'O'});
  }, []);

  useEffect( () => {
    const [row, cell] = recentCell;
    if(row < 0) {
      return;
    }
    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
      win = true;
    }
    if(win) {
      console.log('win');
      dispatch({type:RESET_GAME});
      dispatch ({type:SET_WINNER, winner : turn});
    }else{
      //무승부검사
      let all = true; // all이 true => 무승부 라는 뜻
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if(!cell){
            all = false;
          }
        });
      });
      if(all){
      dispatch({type:DRAW_GAME});
      }else{
      dispatch({type : CHANGE_TURN });
      }
    }
  },[recentCell]);


  return (
      <>
        <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
        {state.winner && <div>{state.winner}님의 승리</div>}
        {state.draw && <div> 비겼습니다! </div>}
      </>
  )
});


export default TicTacToe;

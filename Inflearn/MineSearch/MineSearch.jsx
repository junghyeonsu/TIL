import React, { useReducer, createContext , useMemo , useEffect} from 'react';
import Table from './Table';
import Form from './Form';

/*
자식 컴포넌트들에게 값을 넘겨주려면 3가지를 기억하자!
1. createContext 만들어준다음
2. provider로 감싸주기
3 .값들은 value에다가 넣어주기

*/

export const CODE = {
  MINE : -7, //마인있는자리
  NORMAL : -1,  // 마인없는자리
  QUESTION: -2, //물음표 자리
  FLAG : -3, //깃발자리
  QUESTION_MINE:-4, // 물음표꽂힌 마인
  FLAG_MINE:-5, // 깃발꽂힌 마인
  CLICKED_MINE:-6, // 클릭된 마인
  OPENED:0, // 0 이상이면 전부 오픈이 되게
}

export const TableContext = createContext({
  tableData : [],
  halted : true,
  dispatch : () => {},
});

const initialState = {
  tableData: [],
  data : {
    row:0,
    cell:0,
    mine:0,
  },
  timer : 0,
  result:'',
  halted : true,
  openedCount : 0,
};

const plantMine = (row, cell, mine) => {
  console.log(row,cell,mine);
  const candidate = Array(row * cell).fill().map((arr,i)=>{
    return i;
  });
  const shuffle = [];
  while(candidate.length > row * cell - mine){
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for(let i = 0; i<row; i++){
    const rowData = [];
    data.push(rowData);
    for(let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL);
    }
  }

  for(let k = 0; k < shuffle.length; k++){
    const ver = Math.floor(shuffle[k]/cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state,action) => {
  switch (action.type) {
    case START_GAME :
      return{
        ...state,
        data: {
          row:action.row,
          cell:action.cell,
          mine:action.mine,
        },
        tableData:plantMine(action.row, action.cell, action.mine),
        halted:false,
        openedCount:0,
        timer:0,
      };
      break;

    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row,i) => {
        tableData[i] = [...state.tableData[i]];
      });

      const checked = [];
      let openedCount = 0;

      const checkAround = (row , cell) => {
        if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG , CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])){
          return;
        }
        if(row < 0 || row >= tableData.length || cell<0 || cell >= tableData[0].length) { //상화좌우 칸이 아닌경우 필터링
          return;
        }
        if(checked.includes(row+','+cell)){ //체크한곳은 다시 안가게
          return;
        }else{
          checked.push(row+','+cell);
        }
        let around = [];
        if(tableData[row-1]){
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1]
        );
        }
        around = around.concat(
          tableData[row][cell - 1],
          tableData[row][cell + 1],
        );
        if(tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1]
          );
        }

        const count = around.filter((v) => [CODE.MINE ,CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        tableData[row][cell] = count;
        console.log(around, count);

        if(count === 0){
          const near = [];
          if(row - 1 > -1){
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1 , cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if(row + 1 < tableData.length){
            near.push([row+1, cell - 1]);
            near.push([row+1, cell]);
            near.push([row+1, cell + 1]);
          }
          near.forEach((n) => {
            if(tableData[n[0]][n[1]] !== CODE.OPENED){
            checkAround(n[0],n[1]);
            }
          })
        }
      //  console.log(tableData[row][cell],CODE.NORMAL,tableData[row][cell] === CODE.NORMAL);
      //  if(tableData[row][cell] === CODE.NORMAL){
           openedCount += 1;
      //  }
        tableData[row][cell] = count;
    };
    checkAround(action.row, action.cell);
    let halted = false;
    let result = '';
    console.log(state.data.row * state.data.cell - state.data.mine,state.openedCount + openedCount);
    if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){ //승리
      halted = true;
      result = `${state.timer}초 만에 승리하셨습니다`;
    }


      return {
        ...state,
        tableData,
        openedCount : state.openedCount + openedCount,
        halted,
        result,
      }
}
    break;

    case CLICK_MINE:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted : true,
      };
    }

    break;

    case FLAG_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.MINE){
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      }else{
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    break;

    case QUESTION_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      }else{
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    break;

    case NORMALIZE_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
        tableData[action.row][action.cell] = CODE.MINE;
      }else{
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    break;

    case INCREMENT_TIMER : {
      return {
        ...state,
        timer:state.timer+1,
      }
    }
    break;

    default:
      return state;

  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer,initialState);
  const { tableData, halted, timer, result } = state;
  //TableContext.Provider로 묶어줘야 그 아래 컴포넌트에서 데이터에 접근할수있다.
  //데이터는 value에다가 넣는다.

  const value = useMemo(()=>({tableData:tableData, halted:halted ,dispatch}),[tableData,halted]);

  useEffect(() => {
    let timer;
    if(halted === false){
      timer = setInterval( () => {
        dispatch({type:INCREMENT_TIMER});
      },1000);
    }
    return () => {
      clearInterval(timer);
    }
  }, [halted]);

  return (
    <TableContext.Provider value={value}>
    <Form dispatch={dispatch} />
    <div>{timer}</div>
    <Table dispatch={dispatch} />
    <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;

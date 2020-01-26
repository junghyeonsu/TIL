import React , { createContext,useReducer,useMemo,useCallback } from 'react';
import Ul from './Ul';

export const TableContext = createContext({
  dispatch : () => {},
});

const initialState = {
  message : '',
};

export const CLICK_LI = 'CLICK_LI';
export const CLICK_BTN = 'CLICK_BTN';

const reducer = (state,action) => {
  switch (action.type) {
    case CLICK_LI:
      console.log("clicked li");
      return {
        ...state,
      };
      break;

    case CLICK_BTN:
     console.log("clicked btn");
     return {
       ...state,
     };
     break;

    default:

  }
}


const CheckMemo = () => {

  const [state, dispatch] = useReducer(reducer,initialState);

  // useMemo = 리턴값을 기억
  // useCallback = 함수값을 기억

  const value = useMemo(() => ({dispatch}),[]);

  const onClickBtn = (e) => {
    e.preventDefault();
    dispatch({type:CLICK_BTN,});
  }

  return (
    <TableContext.Provider value={value}>
    <div>Title</div>
    <form>
      <input type="text" /><button onClick={onClickBtn}>제출</button>
    </form>
    <Ul />
    </TableContext.Provider>
  )
}


export default CheckMemo;

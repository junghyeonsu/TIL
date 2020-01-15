import React, {useState, useCallback, useContext, memo} from 'react';
import { TableContext, START_GAME } from './MineSearch';
//부모에있는 데이터값을 가져올때는 useContext를 써서 가져온다.

const Form = memo(() => {
  const [row, setRow] = useState(5);
  const [cell, setCell] = useState(5);
  const [mine, setMine] = useState(10);
  const { dispatch } = useContext(TableContext);

  // useCallback으로 감싸주는 습관을 들이면 좋음
  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  },[]);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  },[]);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  },[]);

  const onClickBtn = useCallback(()=>{
    dispatch({ type: START_GAME, row, cell, mine});
  },[row,cell,mine]);

  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );

});

export default Form;

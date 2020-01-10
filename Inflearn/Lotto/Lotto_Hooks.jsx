import React, { useState , useRef, useEffect , useMemo , useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers(){
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v,i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
  return [...winNumbers , bonusNumber];
}

const Lotto = () => {
  const [winBalls, setWinBalls] = useState([]);
  const timeouts = useRef([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), [timeouts.current]);
  /*값을 기억해줌 [] 안에 값이 바뀌기전에는 다시 실행안됨
  useMemo는 함수의 리턴값을 기억!
   callback은 함수자체를 기억!! */
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const [items, setItems] = useState('');
  const [isLoaded,setIsLoaded] = useState(false);

  const runTimeouts = () => {
    console.log('runTimeouts');
    for(let i = 0; i < winNumbers.length - 1; i++){
    timeouts.current[i] = setTimeout( () => {
        setWinBalls((prevBalls) => [...prevBalls , winNumbers[i]]);
        }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout( () => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  useEffect( () => {
    console.log('php통신!');
    fetch("./test.php")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("php통신 성공");
          setItems(result);
          setIsLoaded(true);
        },
        // 주의: 컴포넌트의 실제 버그에서 발생하는 예외사항들을 넘기지 않도록
        // 에러를 catch() 블록(block)에서 처리하기보다는
        // 이 부분에서 처리하는 것이 중요합니다.
        (error) => {
          setIsLoaded(true);
        }
      )
  }, []);

  useEffect( () => {
    console.log('useEffect');
    runTimeouts();
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  },  [timeouts.current]); // 두번째 인자가 비어있으면 componentDidMount 랑 동일
  // 배열에 요소가 있으면 componentDidMount 랑 componentDidUpdate 둘다 실행


  /* useCallback으로 함수를 감싸도 대부분 비슷하게 작동함
  근데 문제는 기억을 너무 잘해서 state를 쓸때 조심해야됨
  useMemo 랑 useCallback 두번째 인자가 바뀔때 함수들이 다시 시작됨
  그래서 winNumbers 를 콘솔로 찍을때 두번째 인자에 안넣어주면 값이 안바뀜

  useCallback을 꼭 써야 할때??
  자식한테 함수를 전해줄때 !!
  */
  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]); // 어떨때 다시 실행될지 결정해준다.

  return (
      <>
        <div>당첨 숫자</div>
        <div id="결과량">
         {winBalls.map( (v) => <Ball key={v} number ={v} />)}
        </div>
        <div> 보너스 </div>
        {bonus && <Ball number = {bonus} />}
        {bonus && <button onClick={redo ? onClickRedo : () => {}}>한 번 더</button>}
      </>
      // <Ball number = {bonus} onClick = {onClickRedo}/> 이렇게 하면
      // 자식으로 넘기는거기 때문에 꼭 useCallback을 써줘야한다.
      // 왜 ? 자식은 useCallback을 안쓰면 계속 props 가 바뀐다고 생각하기떄문에
      // 렌더링을 자꾸 해버린다!
  );

}

export default Lotto;

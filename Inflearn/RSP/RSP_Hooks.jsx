import React, { useState , useRef , useEffect } from 'react';

// 클래스의 경우 -> constructor -> render 한번 -> ref -> componentDidMount -> (setState / props) 바뀔 떄
//  -> shouldComponentUpdate (true)-> render -> componentDidUpdate --> 부모가 나를 없앨 때 -> componentWillUnmount -> 소멸

// useEffect => react에서 componentDidMount , componentDidUpdate , componentWillUnmount 쓰기위해 쓰는거

const rspCoords = {
  바위 : '0',
  가위 : '-142px',
  보 : '-284px',
};

const scores = {
  가위 : 1,
  바위 : 0,
  보 : -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v){
    return v[1] === imgCoord;
  })[0];
};

//                    result, imgCoord , score
//componentDidMount
//componentDidUpdate
//componentWillUnmount
// hooks에서는 세로로보고 , react에서는 가로로본다.
// 말그대로 react는 한꺼번에 관리를하고 ,
// hooks에서는 하나의 state 를 한꺼번에 (여러개도 됨) 처리해주는 식

const RSP_Hooks = () => {
  const [result,setResult] = useState('');
  const [imgCoord,setImgCoord] = useState(rspCoords.바위);
  const [score,setScore] = useState(0);
  const interval = useRef();

  useEffect( () => { // componentDidMount , componentDidUpdate 역할 ( 1 : 1 대응은아님 )
    interval.current = setInterval(changeHand , 50);
    return () => { //componentWillUnmount 역할 !
        clearInterval(interval.current);
    }
  }, [imgCoord]);

  /* useEffect 에 두번째 인자로 넣은 imgCoord 가 바뀔때마다 useEffect 가 실행된다. */

  const changeHand = () => {
    if(imgCoord === rspCoords.바위){ // 이 컴포넌트가 없어져도 이 interval 함수는 안 없어지기 떄문에
      setImgCoord(rspCoords.가위);
    }else if(imgCoord === rspCoords.가위){
      setImgCoord(rspCoords.보);
    }else if(imgCoord === rspCoords.보){
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff === 0){
      setResult('비김!');
    }else if([-1, 2].includes(diff)) {
      setResult('승리!');
      setScore((prevScore) => prevScore+1);
    }else{
      setResult('패배!');
      setScore((prevScore) => prevScore-1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand,50);
    },1000);
  }

  return (
      <>
        <div id="computer" style={{background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
        <div>
          <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
    </>
  );
}


export default RSP_Hooks;

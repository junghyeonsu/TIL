import React, {Component} from 'react';

// 클래스의 경우 -> constructor -> render 한번 -> ref -> componentDidMount -> (setState / props) 바뀔 떄
//  -> shouldComponentUpdate (true)-> render -> componentDidUpdate --> 부모가 나를 없앨 때 -> componentWillUnmount -> 소멸

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

class RSP extends Component {
  state = {
    result : '',
    imgCoord : '0',
    score : 0,
  };

  interval;

  changeHand = () => { //interval 같은 함수가 컴포넌트가 생기고나서 계속돌아가는데
    const {imgCoord} = this.state;
    if(imgCoord === rspCoords.바위){ // 이 컴포넌트가 없어져도 이 interval 함수는 안 없어지기 떄문에
      this.setState({
        imgCoord : rspCoords.가위,
      });
    }else if(imgCoord === rspCoords.가위){
      this.setState({
        imgCoord : rspCoords.보,
      });
    }else if(imgCoord === rspCoords.보){
      this.setState({
        imgCoord : rspCoords.바위,
      });
    }
  }


  componentDidMount() { // 컴포넌트가 첫 렌더링 되고난 후에 한번 -> 비동기 요청을 많이 함
    this.interval = setInterval(this.changeHand, 10);             // componentWillUnmount 에서 없애줌
  }

  componentDidUpdate(){ // 리렌더링 후에 실행되는 함수 ex : 프롭스가 바뀌거나, 스테이트가 바뀔떄

  }

  componentWillUnmount() { // 컴포넌트가 제거되기 직전 -> 비동기 요청 정리를 많이 함
    clearInterval(this.interval);
  }

  onClickBtn = (choice) => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff === 0){
      this.setState({
        result : '비김!',
      });
    }else if([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return{
          result: '승리!',
          score: prevState.score + 1,
        };
      });
    }else{
      this.setState((prevState) => {
        return{
          result : '패배!',
          score : prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand,10);
    },1000);
  };

  render(){
    const {result , score , imgCoord} = this.state;
    return(
      <>
        <div id="computer" style={{background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
        <div>
          <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
    </>
    );
  }
}
export default RSP;

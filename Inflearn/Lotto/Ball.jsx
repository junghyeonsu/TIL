import React, { memo } from 'react';

const Ball = memo(({number}) => {
  let background;
  if(number <= 10){
    background = 'red';
  }else if(number <=  20){
    background = 'orange';
  }else if(number <=  30){
    background = 'yellow';
  }else if(number <=  40){
    background = 'blue';
  }else {
    background = 'green';
  }
  return(
    <div className="ball" style={{background}}>{number}</div>
  );
});

/*  이거는 class 컴포넌트 위에는 함수형 컴포넌트 (훅스는 아님)
class Ball extends PureComponent {
  render(){
    const {number} = this.props;
      let background;
      if(number <= 10){
        background = 'red';
      }else if(number <=  20){
        background = 'orange';
      }else if(number <=  30){
        background = 'yellow';
      }else if(number <=  40){
        background = 'blue';
      }else {
        background = 'green';
      }
      return(
        <div className="ball" style={{background}}>{number}</div>
    );
  }
}

*/
export default Ball;

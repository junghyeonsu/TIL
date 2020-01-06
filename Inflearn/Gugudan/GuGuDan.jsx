const React = require('react'); // 노드의 모듈 시스템을 위해서 리콰이어 하는것!
const { useState , useRef } = React; // React 반복되는거 없애줌

const GuGuDan = () => {
  const [first,setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second,setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value,setValue] = useState('');
  const [result,setResult] = useState('');
  const [count,setCount] = useState(0);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(parseInt(value) === first * second){
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      setResult((prevResult) => {
        return '정답입니다!' + value;
      });
      setCount( (prevCount) => {
        return prevCount + 1;
      });
      inputRef.current.focus();
    }else{
      setValue('');
      setResult('오답입니다!' + value);
      inputRef.current.focus();
    }
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <React.Fragment>
    <div>{first} 곱하기 {second} 는 무엇일까요? </div>
    <form onSubmit={onSubmitForm}>
      <input type='number' ref={inputRef} onChange={onChangeInput} value={value} />
      <button>클릭</button>
    </form>
    <div>{result}</div>
    <div>맞춘 횟수 {count} </div>
    </React.Fragment>
  );
}

module.exports = GuGuDan; //이 파일이 다른 곳에서 쓰이니까 이렇게해줘야 쓰일수있음.

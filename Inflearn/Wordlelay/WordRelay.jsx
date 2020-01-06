const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const[word, setWord] = useState('정현수');
  const[value, setValue] = useState('');
  const[result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(word[word.length-1] === value[0]){
      setWord(value);
      setValue('');
      setResult('정다압');
      inputRef.current.focus();
    }else{
      setValue('');
      setResult('실패에');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
      <React.Fragment>
        <div>{word}</div>
        <form onSubmit = {onSubmitForm}>
          <input ref={inputRef} value = {value} onChange = {onChangeInput} />
          <button className ="wordInput" id="wordInput">입력!!</button>
        </form>
        <div>{result}</div>
      </React.Fragment>
    );
}

module.exports = WordRelay;

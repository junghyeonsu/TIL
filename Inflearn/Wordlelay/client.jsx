const React = require('react');
const ReactDom = require('react-dom');
const {hot} = require('react-hot-loader/root'); // 개발할때 자동으로 업데이트 해주게 하기위해서 쳐줘야됨

const WordRelay = require('./WordRelay');

const Hot = hot(WordRelay); // 개발할때 자동으로 업데이트 해주게 하기위해서 쳐줘야됨

ReactDom.render(<Hot />,document.querySelector('#root'));
// Hot으로 변경

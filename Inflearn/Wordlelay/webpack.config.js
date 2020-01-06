const path = require('path');

module.exports = {
  name : 'wordrelay-setting',
  mode : 'development', //실서비스에선 production
  devtool : 'eval', // 빠르게

  resolve : {
    extensions : ['.jsx', '.js'] // 웹팩이 알아서 찾아준다. 파일을
  },

  entry : {
    app : ['./client'], // 얘네둘 합쳐서
  }, //입력

  // entry 꺼를 module를 적용해서 output으로 뺸다
  module : {
    rules : [{
      test : /\.jsx?$/,
      loader : 'babel-loader',
      options : {
        presets : [
          ['@babel/preset-env', { // preset은 플러그인 모음들이다.
            targets : {
              browsers : ['> 5% in KR'], //옛날거로 계속 맞추기 힘들기 때문에 또 옵션을 넣어준다.
            },
            debug : true,
          }],
          '@babel/preset-react',
        ],
          plugins : ['@babel/plugin-proposal-class-properties','react-hot-loader/babel',],
        }
      }
    ]
  },

  output : {
    path: path.join(__dirname, 'dist'),
    filename : 'app.js',  // 얘로 만들어준다.
  }, //출력

};

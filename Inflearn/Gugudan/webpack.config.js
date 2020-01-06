const path = require('path');

module.exports = {

  mode : 'development', //개발시에는 production
  devtool : 'eval',  //개발시에는 hidden-source-map
  resolve : {
    extensions : ['.jsx', '.js'] //확장자 생략 가능
  },

  entry : {
    app : './client' // client 는 고정이아니고 entry는 웬만하면 client로 하신대 ! zerocho 님께선
  },

  module : {

    rules : [{
      test : /\.jsx?$/,
      loader : 'babel-loader',
      options : {
        presets : [
          ['@babel/preset-env', { // preset은 플러그인 모음들이다.
            targets : {
              browsers : ['> 5% in KR','last 2 chrome versions'], //옛날거로 계속 맞추기 힘들기 때문에 또 옵션을 넣어준다.
            },
            debug : true,
          }] ,
          '@babel/preset-react',
        ],
        plugins : [], // 플러그인들은 하면서 추가하는게 좋음 (확장 프로그램)
      },
    }],

  },

  output : {
    filename : 'app.js',
    path : path.join(__dirname,'dist'),
  },

};

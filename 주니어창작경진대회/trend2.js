function daumAjax(){
  $.ajax({
    type:"GET",
    url:"./webCrawling/daum.php",
    success:function(result){
      $("#daum").html(result);
    }
  });
}

function googleAjax(){
  $.ajax({
    type:"GET",
    url:"./webCrawling/google.php",
    success:function(result){
      $("#google").html(result);
    }
  });
}

function naverAjax() {
    $.ajax({
      type:"GET",
      url:"./webCrawling/naver.php",
      success:function(result){
          $("#naver").html(result);
      }
    });
}

function googleplaystoreAjax() {
    $.ajax({
      type:"GET",
      url:"./webCrawling/googleplaystore.php",
      success:function(result){
          $("#googleplaystore").html(result);
      }
    });
}
/* 맨처음 홈페이지 로드되면 한번 ajax로 받기 */
$(window).on('load',function(){
  naverAjax();
  setInterval(() => {
    naverAjax();
  },10000);
  googleAjax();
  daumAjax();
  googleplaystoreAjax();
})

/* setInterval 변수들 */
var naver_Reload;
var google_Reload;
var daum_Reload;

$( "#nav-btn" ).click(function() {
  $( "nav" ).toggle( "slow" );
});

var naverView = $("#naver-modal");
var daumView = $("#daum-modal");
var googleView = $("#google-modal");

$("#naver_li").on('click',function(){
  naverView.css('display','block');
  daumView.css('display','none');
  googleView.css('display','none');
});

$("#daum_li").on('click',function(){
  naverView.css('display','none');
  daumView.css('display','block');
  googleView.css('display','none');
});

$("#google_li").on('click',function(){
  naverView.css('display','none');
  daumView.css('display','none');
  googleView.css('display','block');
});



function go_link(event){
  var a = $(event.target).prev('td').find(".ah_k").text();
  $("#ifr").attr('src',`http://www.donga.com/news/search?query=${a}&x=0&y=0`);
}

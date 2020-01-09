function reloadNaver() {
  $(".naver").load(window.location.href + ".naver");
};

function reloadNaverTime(){
      setTimeout(reloadNaver(),100); 
}

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php

    $count = 1;

    include 'simple_html_dom.php'; //라이브러리 필요함 이 파일을 이 php 파일이 있는곳에 위치하게 해야됨


    $page1 = file_get_html('https://www.naver.com/'); // 우리가 따오고 싶은 데이터가 있는 홈페이지 주소
    echo "네이버 실시간 검색어"."<br>";
    foreach ($page1->find('li.ah_item a') as $value) { // 네이버 주소의 li 태그중 클래스명 이 ah_item  -> a태그 -> span 태그 중 클래스명이 ah_k 인것을 $value로 넣는다.

      echo $value.'<br>'; //받아온거 출력
      $count ++ ;
      if($count == 21){
        break;
      }
    }



    $count = 1;
    echo "<br>";


    $page2 = file_get_html('https://www.daum.net/');
    echo "다음 일별 인기 급상승 검색어"."<br>";
    foreach ($page2->find('ol.list_hotissue li span.txt_issue a.link_issue') as $value) {

      if($count % 2 == 1){
        $temp = $count/2 + 0.5;
        echo $temp.'위 '.$value.'<br>';
      }

      $count++;

      if($count == 21){
        break;
      }
    }
     ?>
  </body>
</html>

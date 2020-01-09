<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./trend2.css?=1">
    <title></title>
  </head>
  <body>

    <h1>세계의 이슈들</h1>
    <h2>지금 세계에선 어떤일들이 일어나고 있을까?</h2>

    <div class="bgimg"></div>
    <div class='pin'></div>
    <div class='pulse'></div>

    <!-- 네이버 -->
    <div class='naver'>
      <table>
    <?php
    $count = 1;
    $rank = 1;
    include 'simple_html_dom.php'; //라이브러리 필요함 이 파일을 이 php 파일이 있는곳에 위치하게 해야됨
    $page1 = file_get_html('https://www.naver.com/'); // 우리가 따오고 싶은 데이터가 있는 홈페이지 주소
    echo "<thead> <td colspan ='2'> 네이버 실시간 검색어 </td> </thead>";
    foreach ($page1->find('.ah_list li.ah_item a[href]') as $value) { // 네이버 주소의 li 태그중 클래스명 이 ah_item  -> a태그 -> span 태그 중 클래스명이 ah_k 인것을 $value로 넣는다.

      echo "<tr>";
      echo "<td class='rankcol'>".$rank++."위</td>";
      echo  "<td class='navervalue'>".$value."</td>"; //받아온거 출력
      echo "</tr>";
      $count ++ ;
      if($count == 21){
        break;
      }
    }
    ?>
    </table>
  </div>

  <!-- 다음 -->
  <div class='daum'>
    <table>
    <?php
    $count = 1;
    $rank = 1;
    $page2 = file_get_html('https://www.daum.net/');
    echo "<thead> <td colspan ='2'> 다음 실시간 검색어 </td> </thead>";
    foreach ($page2->find('ol.list_hotissue li span.txt_issue a.link_issue') as $value) {
      if($count % 2 == 1){
        $temp = $count/2 + 0.5;
        echo "<tr>";
        echo "<td class='rankcol'> ".$rank++."위</td>";
        echo  "<td class='daumvalue'>".$value."</td>"; //받아온거 출력
        echo "</tr>";
      }
      $count++;
      if($count == 21){
        break;
      }
    }
       ?>
     </table>
   </div>

  <!-- 구글 -->
  <div class='google'>
    <table>
    <?php
    $data = file_get_contents("https://trends.google.co.kr/trends/hottrends/atom/feed?pn=p23");
    $item_arr = explode("<item>",$data);
    $temp = [];
    $index = 0;
    $now_day = [];

    for($ii=1; $ii<20; $ii++) {

      $link_exp = explode("<link>",$item_arr[$ii]);
      $link = explode("</link>",$link_exp[1]);
      $temp[$ii] = $link[0];

      $pubdate_exp = explode("<pubDate>",$item_arr[$ii]);
      $pubdate = explode("</pubDate>",$pubdate_exp[1]);


      if($ii == 1){
        $tday = explode(" ",$pubdate[0]);

        $now_day[0] = $tday[0];
        $now_day[1] = $tday[1];
        $now_day[2] = $tday[2];
        $now_day[3] = $tday[3];
      }

      $tday = explode(" ",$pubdate[0]);
      if($now_day[0] != $tday[0] || $now_day[1] != $tday[1] || $now_day[2] != $tday[2] || $now_day[3] != $tday[3]){
        $index = $ii;
        break;
      }

    }



    $count = 1;
     $google = [];
     $google_link = [];

     $page3 = file_get_html('https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR');
    echo "<thead> <td colspan ='2'> 구글 실시간 검색어 </td> </thead>";
     foreach ($page3->find('item title') as $value) {
       $str = "'".$value."'";
       $pattern = '#<title>(.*?)</title>#';
       preg_match($pattern, $str, $matches);
       $google[$count] = $matches[1];
       $count++;
       if($count == 21){
         break;
       }
     }

     $count = 1;
     $page3_1 = file_get_html('https://trends.google.co.kr/trends/trendingsearches/daily/rss?geo=KR');
     foreach ($page3_1->find('item ht:news_item_url') as $value) {
       $str = "'".$value."'";
       $pattern = '#<ht:news_item_url>(.*?)</ht:news_item_url>#';
       preg_match($pattern, $str, $matches);
       $google_link[$count] = $matches[1];
       $count++;
       if($count == 21){
         break;
       }
     }
     $rank = 1;
     for($i = 1; $i < $index; $i++){
       echo "<tr>";
       echo "<td class='rankcol'>".$rank++."위</td>";
       echo "<td class='googlevalue'>";
       echo '<a href = "'.$temp[$i].'">'.$google[$i].'</a>'."<br>";
       echo "</td>";
       echo "</tr>";
     }
     ?>
   </table>
 </div>

 <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script src="trend2.js"></script>
  </body>
</html>

<?php
include 'simple_html_dom.php'; //라이브러리 필요함 이 파일을 이 php 파일이 있는곳에 위치하게 해야됨
echo "<table class='table-fill'>";
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
 echo "<tbody class='table-hover'>";
 for($i = 1; $i < $index; $i++){
   echo "<tr>";
   echo "<td class='rankcol'>".$rank++."위</td>";
   echo "<td class='googlevalue'>";
   echo '<a href = "'.$temp[$i].'">'.$google[$i].'</a>'."<br>";
   echo "</td>";
   echo "</tr>";
 }
 echo "</tbody>";
 echo "</table>";
 ?>

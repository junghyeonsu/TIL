<?php

$count = 1;
$rank = 1;
echo "<table class='table-fill'>";
include 'simple_html_dom.php'; //라이브러리 필요함 이 파일을 이 php 파일이 있는곳에 위치하게 해야됨
$page1 = file_get_html('https://www.naver.com/'); // 우리가 따오고 싶은 데이터가 있는 홈페이지 주소
echo "<thead id='head'> <td colspan ='3'> 네이버 실시간 검색어 </td> </thead>";
echo "<tbody class='table-hover'>";
foreach ($page1->find('.ah_list li.ah_item a[href]') as $value) { // 네이버 주소의 li 태그중 클래스명 이 ah_item  -> a태그 -> span 태그 중 클래스명이 ah_k 인것을 $value로 넣는다.
  $data += $value."|";
  echo "<tr>";
  echo "<td class='text-left'>".$rank++."위</td>";
  echo "<td class='text-left'>".$value."</td>"; //받아온거 출력
  echo "<td onclick='go_link(event)'>클릭</td>";
  echo "</tr>";
  $count ++ ;
  if($count == 21){
    break;
  }
}
echo "</tbody>";
echo "</table>";

?>

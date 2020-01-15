
<?php

$count = 1;
$rank = 1;
echo "<table class='table-fill'>";

include 'simple_html_dom.php'; //라이브러리 필요함 이 파일을 이 php 파일이 있는곳에 위치하게 해야됨
$page = file_get_html('https://play.google.com/store/apps/collection/cluster?clp=0g4jCiEKG3RvcHNlbGxpbmdfZnJlZV9BUFBMSUNBVElPThAHGAM%3D:S:ANO1ljKs-KA&gsr=CibSDiMKIQobdG9wc2VsbGluZ19mcmVlX0FQUExJQ0FUSU9OEAcYAw%3D%3D:S:ANO1ljL40zU'); // 우리가 따오고 싶은 데이터가 있는 홈페이지 주소
echo "<thead> <td colspan ='2'> 구글 플레이 스토어 어플 순위 </td> </thead>";
echo "<tbody class='table-hover'>";
foreach ($page->find('div.WsMG1c') as $value) { // 네이버 주소의 li 태그중 클래스명 이 ah_item  -> a태그 -> span 태그 중 클래스명이 ah_k 인것을 $value로 넣는다.
  $data += $value."|";
  echo "<tr>";
  echo "<td class='text-left'>".$rank++."위</td>";
  echo "<td class='text-left'>".$value."</td>"; //받아온거 출력
  echo "</tr>";
  $count ++ ;
  if($count == 21){
    break;
  }
}
echo "</tbody>";
echo "</table>";

 ?>

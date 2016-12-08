<?php
if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
  echo "Staff only";
	exit;
}

if($_POST){
  $ajaxBack = array('result' => "Success");
}

echo json_encode($ajaxBack);
?>

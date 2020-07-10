<?php

	$cvdd = $_POST['gttx'];

	$fp = fopen("data.txt", "w");
	fputs($fp, $cvdd);
	fclose($fp);
	

?>
<?php

	$cvdd = $_POST['folls'];

	$fp = fopen("data.txt", "w");
	fputs($fp, $cvdd);
	fclose($fp);
	

?>
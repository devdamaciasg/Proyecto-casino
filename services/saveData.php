<?php 
	$id = $_POST['id'];
	$nombre = $_POST['nombre'];
	$cedula = $_POST['cedula'];
	$dinero = 10000;

	$fp = fopen("data.txt", "r");
	while (!feof($fp)){
	    $linea = fgets($fp);
	}
	fclose($fp);

	if($linea == '' || $linea == '[]'){
		$jugadores[] = array('id'=> $id, 'cedula'=> $cedula, 'nombre'=> $nombre, 'dinero'=> $dinero);
		$json_string = json_encode($jugadores);
		$file = 'data.txt';
 		file_put_contents($file, $json_string);
 		echo $json_string;
	}else{
		$itcntns = substr($linea, 0, -1);
		$lastchrctr = substr($linea, -1);

		$toadd = ',{"id":"'.$id.'","cedula":"'.$cedula.'","nombre":"'.$nombre.'","dinero":'.$dinero.'}';
		$uploaded = $itcntns.''.$toadd.''.$lastchrctr;

		$fp = fopen("data.txt", "w");
		fputs($fp, $uploaded);
		fclose($fp);

		echo $uploaded;
	}

	

	/*

	$actual_data = explode('}',$linea);

	$jugadores[] = array('cedula'=> $cedula, 'nombre'=> $nombre, 'dinero'=> $dinero);
	

	$json_string = json_encode($jugadores);

	$file = 'data.txt';
 	file_put_contents($file, $json_string);

 	var_dump($actual_data)*/


?>
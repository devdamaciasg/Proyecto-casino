<?php 
$fp = fopen("data.txt", "r");
while (!feof($fp)){
    $linea = fgets($fp);
    echo $linea;
    return json_encode($linea);
}
fclose($fp);




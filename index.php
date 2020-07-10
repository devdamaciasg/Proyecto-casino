<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>CASINO | INICIO</title>
	<link rel="stylesheet" type="text/css" href="css/casino.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css">
</head>
<body>
	<div class="nav">
		<p><a href="admin.php">Administrador de jugadores</a></p>
	</div>
	<div class="contenido_apuesta hidden">
		<p>Por favor ingrese su cédula.</p>
		<input type="number" name="cedula" id="cedula" placeholder="Cédula" required>
		<button id="buscar_jugador">Buscar</button>
		<div class="result"></div>
	</div>
	<div class="rptx hidden"></div>



	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="js/casino.js"></script>
</body>
</html>

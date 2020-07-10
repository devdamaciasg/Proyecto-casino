
$('.content').append(`
	<p>Por favor, seleccione una opción del menú.</p>
	`);

$('#jugadores').click(function(){
	verJugadores();
})

$(document).on('click','#eliminar_jugador',function(e){
	e.preventDefault();
	ceu_temp = $(this).data('delete');
	eliminarJugador(ceu_temp);
});

$('#a_jugador').click(function(){
	$('#jugadores').removeClass('active');
	$('#a_jugador').addClass('active');
	$('.content').empty();
	$('.content').append(`
		<h1>Agregar jugador</h1>
		<input type="number" name="cedula" id="cedula" size="50" placeholder="Cédula" required>
		<input type="text" name="nombre" id="nombre" size="30" placeholder="Nombre" required>
		<button id="guardar_jugador">Guardar</button>`);
});

$(function(){
	var operacion = 'A';
	
	var datos = localStorage.getItem('datos');
	vDatos = JSON.parse(datos);
	if(vDatos == null)
		vDatos = [];
})

$(document).on('click','#guardar_jugador',function(e){
    e.preventDefault();
    var name = $('#nombre').val(),
    	identificacion = $('#cedula').val();

    var datos = JSON.stringify({
    	nombre: name,
    	cedula: identificacion,
    	dinero: 10000
    });
                    

    if(name === '' || cedula === ''){
    	alert('Por favor, llene los campos.');
    }else{
    	vDatos.push(datos);
    	localStorage.setItem('datos', JSON.stringify(vDatos));
    	alert('Jugador registrado.');
    }

    $('#nombre').val('');
    $('#cedula').val('');
            
});

function verJugadores(){
	$('#a_jugador').removeClass('active');
	$('#jugadores').addClass('active');
	$('.content').empty();
	$('.content').append(`
		<h1>Jugadores</h1>
		<small>Jugadores actualmente en el sistema.</small>
		<table>
			<tbody>
				<tr>
					<th>Cédula</th>
					<th>Nombre</th>
					<th>Dinero disponible</th>
					<th>Acciones</th>
				</tr>							
			</tbody>			
		</table>`);

	for(var i in vDatos){
		var player = JSON.parse(vDatos[i]);
		//console.log(vDatos.indexOf(player.nombre));
		$('.content tbody').append(`
			<tr>
				<td>`+player.cedula+`</td>
				<td>`+player.nombre+`</td>
				<td>`+formatCurrency("es-CO", "COP", 0, player.dinero)+`</td>
				<td>
					<span id="editar_jugador" style="cursor:pointer;background-color:orange;">Editar</span> &nbsp;
					<span id="eliminar_jugador" style="cursor:pointer;background-color:red;color:white;" data-delete="`+player.cedula+`">Eliminar</span>
				</td>
			</tr>
			`);
	}
	console.log('datos: '+vDatos);
}

$(document).on('click','#editar_jugador',function(e){
	e.preventDefault();
	editarJugador();
});



function editarJugador(){

}

function eliminarJugador(data){
	//console.log(data);
	const index = vDatos.filter(q => q['1']);
	console.log(index);
	//vDatos.splice(index, 1);
	/*for(var i in vDatos){
		var player = JSON.parse(vDatos[i]);
		if(data == player.cedula){
			
			
			
		}
		
	}*/

	//console.log(player.nombre);
	/*vDatos.forEach(function(value, i) {
		datainLS = localStorage.getItem('datos');
		vDatos = JSON.parse(datainLS);
		vDatos.splice(i, 1);
      if (value.nombre == nombre) {
        vDatos.splice(i, 1);
      }
    })*/
	//vDatos.splice(-1+1,1);
	//localStorage.setItem("datos", JSON.stringify(vDatos));
	//alert("Jugador eliminado.");
	verJugadores();
}

function formatCurrency(locales, currency, fractionDigits, number) {
  var formatted = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: fractionDigits
  }).format(number);
  return formatted;
}

$('#salir').click(function(){
	console.log('salir');
});


$('.content').append(`
	<p>Por favor, seleccione una opción del menú.</p>
	`);

$('#jugadores').click(function(){
	verJugadores();
})

$(document).on('click','#eliminar_jugador',function(e){
	e.preventDefault();
	ceu_temp = $(this).data('delete');
	var onf_del = confirm('¿Desea eliminar este jugador?\nRecuerde que esta acción no se puede deshacer.');
	if(onf_del == true)
		eliminarJugador(ceu_temp);
		
});

$('#a_jugador').click(function(){
	$('#jugadores').removeClass('active');
	$('#a_jugador').addClass('active');
	$('.content').empty();
	$('.content').append(`
		<h1>Agregar jugador</h1>
		<form id="nuevo_jugador">
		<input type="number" class="hidden" name="id" id="id" placeholder="Cédula" required>
		<input type="number" name="cedula" id="cedula" size="50" placeholder="Cédula" required>
		<input type="text" name="nombre" id="nombre" size="30" placeholder="Nombre" required>
		<button id="guardar_jugador">Guardar</button>
		</form>`);
	searchActualId();
});

$(function(){
	var operacion = 'A';
	var actual_data;

	$.ajax({
		method: "GET",
        dataType: 'JSON',
        url: "services/getData.php",
        success: function(data){
        	actual_data = data;             
        }
    });
	
	if(actual_data == null)
		actual_data = [];
})

function searchActualId(){
	$.ajax({
		method: "GET",
		dataType: 'JSON',
		url: "services/getData.php",
		success: function(data){
			$.each(data, function (key, value){
				prxid = value.id;
		        prxid++;
				$('#id').val(prxid);
			});
		}
	});
	
	valorid = $('#id').val();	

	if(valorid == ''){
		$('#id').val('0');
	}else{
		$.ajax({
			method: "GET",
		    dataType: 'JSON',
		    url: "services/getData.php",
		    success: function(data){
		        $.each(data, function (key, value){
		        	prxid = value.id;
		        	prxid++;
					$('#id').val(prxid);
					//console.log(prxid);
		       	});
		    }
    	});
	}	
	//console.log(prxid);
}

$(document).on('click','#guardar_jugador',function(e){
    e.preventDefault();    
    new_player = $('#nuevo_jugador').serialize();

    if($('#id').val() === '' || $('#nombre').val() === '' || $('cedula').val() === ''){
    	alert('Por favor, llene los campos.');
    }else{
    	$.ajax({
	    	data: new_player,
			method: "POST",
	        url: "services/saveData.php",
	        success: function(data){
	        	alert('Datos almacenados exitosamente.');
	        	searchActualId();
	        	$('#nombre').val('');
    			$('#cedula').val('');
	        	//console.log(data);        	                  
	        },
	        error: function(xhr, ajaxOptions, thrownError){
	            console.log(thrownError);
	        }
    	});
    }                
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

	$.ajax({
		method: "GET",
        dataType: 'JSON',
        url: "services/getData.php",
        success: function(data){
        	console.log(data);
        	$.each(data, function (key, value){
        		$('.content tbody').append(`
					<tr>
						<td>`+value.cedula+`</td>
						<td>`+value.nombre+`</td>
						<td>`+formatCurrency("es-CO", "COP", 0, value.dinero)+`</td>
						<td>
							<span id="editar_jugador" style="cursor:pointer;background-color:orange;" data-cedula="`+value.cedula+`" data-nombre="`+value.nombre+`" data-dinero="`+value.dinero+`" data-id="`+value.id+`">Editar</span> &nbsp;
							<span id="eliminar_jugador" style="cursor:pointer;background-color:red;color:white;" data-delete="`+value.id+`">Eliminar</span>
						</td>
					</tr>
				`);
        	});                   
        }
    });
}

$(document).on('click','#editar_jugador',function(e){
	e.preventDefault();
	ced = $(this).data('cedula');
	nom = $(this).data('nombre');
	din = $(this).data('dinero');
	id_update = $(this).data('id');
	var cedula = prompt("Cédula:", ced);
	var nombre = prompt("Nombre:", nom);
	var dinero = prompt("Dinero:", din);
	if (cedula == null || cedula == "" || nombre == null || nombre == "" || dinero == null || dinero == ""){
	  txt = "Modificación cancelada o campos vacíos.";
	}else{
	  editarJugador(cedula, nombre, dinero, id_update);
	}
	//editarJugador(key);
});

function editarJugador(ced, nom, din, crf_t){
	//console.log(crf_t);
	$.ajax({
	    dataType: "JSON",
		method: "GET",
	    url: "services/getData.php",
	    success: function(rs){
	    	$.each(rs, function (key, value){
	    		if(crf_t == value['id']){
	    			toedit = value['id'];
	    			elementoAEditar = rs.find(json_data => json_data.id === toedit);
	    			elementoAEditar.cedula = ced;
	    			elementoAEditar.nombre = nom;
	    			elementoAEditar.dinero = parseInt(din);
	    			folls = JSON.stringify(rs);
	    			//console.log(folls);
	    			$.ajax({
	    				dataType: "text",
	    				method: "POST",
	    				data: {folls},
	    				url: "services/updateData.php",
	    				success: function(drv){
	    					//console.log('cos: '+drv);
	    					verJugadores();
	    				},
	    				error: function(xhr, ajaxOptions, thrownError){
	    					console.log(thrownError);
	    				}
	    			});	    			
	    		}	    		
	    	});      	                  
	    },
	    error: function(xhr, ajaxOptions, thrownError){
	        console.log(thrownError);
	    }
   	});   	
}

function eliminarJugador(crf_xt){
	//console.log(crf_xt);
	$.ajax({
	    dataType: "JSON",
		method: "GET",
	    url: "services/getData.php",
	    success: function(rs){
	    	$.each(rs, function (key, value){
	    		//console.log(value['id']);
	    		if(crf_xt == value['id']){
	    			toedit = value['id'];
	    			objectToDelete = rs.findIndex(json_data => json_data.id === toedit);	    			

	    			gttx = JSON.stringify(objectToDelete);
	    			tpss = parseInt(gttx);	    			
	    			rs.splice(tpss,1);
	    			gttx = JSON.stringify(rs);
	    			//console.log(rs);
	    			$.ajax({
	    				dataType: "text",
	    				method: "POST",
	    				data: {gttx},
	    				url: "services/deleteData.php",
	    				success: function(drv){
	    					//console.log('cos: '+drv);
	    					verJugadores();
	    				},
	    				error: function(xhr, ajaxOptions, thrownError){
	    					console.log(thrownError);
	    				}
	    			});
	    		}	    		
	    	});      	                  
	    },
	    error: function(xhr, ajaxOptions, thrownError){
	        console.log(thrownError);
	    }
   	});
	//const index = vDatos.filter(q => q['1']);
	//console.log(index);
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
	//verJugadores();
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
	window.location.replace("index.php");
});


$(document).ready(function(){
	var is_read = parseInt(localStorage.getItem('isRead'));
	var b_apos = parseInt(localStorage.getItem('vApostar'));
	var g_gan = parseInt(localStorage.getItem('vApostado'));
	var v_tlk = parseInt(localStorage.getItem('vTotal'));
	var ug_p = b_apos - g_gan;
	var lastg_r = parseInt(localStorage.getItem('last_game_r'));
	var sect_kj = parseInt(localStorage.getItem('selected_arg'));

    if(is_read == 0){    	
    	$('.rptx').removeClass('hidden');
    	$('.rptx').append(`
    		<p class="goback">&xlarr; Volver a jugar</p>
    		<h1>Usted apostó: <span style="color:red;">`+formatCurrency("es-CO", "COP", 0, b_apos)+`</span></h1>
    		<h1>Usted ganó: <span style="color:red;">`+formatCurrency("es-CO", "COP", 0, ug_p)+`</span></h1>
    		<p style="text-transform:uppercase;margin:0;margin-bottom:16px;">Dinero disponible: <span style="color:red;">`+formatCurrency("es-CO", "COP", 0, v_tlk)+`</span></p>
    	`)
    	if(lastg_r == 1){
    		$('.rptx').append(`
    			<h1>El resultado de la ruleta fue <span style="color:green;">verde</span>.</h1>
    		`);
    	}else if(lastg_r == 2){
    		$('.rptx').append(`
    			<h1>El resultado de la ruleta fue <span style="color:red;">rojo</span>.</h1>
    		`);
    	}else if(lastg_r == 3){
    		$('.rptx').append(`
    			<h1>El resultado de la ruleta fue <span style="color:black;text-decoration:underline;">negro</span>.</h1>
    		`);
    	}

    	if(sect_kj == 1){
    		$('.rptx').append(`
    			<h2>Usted seleccionó <span style="color:green;">verde</span>.</h2>
    		`);
    	}else if(sect_kj == 2){
    		$('.rptx').append(`
    			<h2>Usted seleccionó <span style="color:red;">rojo</span>.</h2>
    		`);
    	}else if(sect_kj == 3){
    		$('.rptx').append(`
    			<h2>Usted seleccionó <span style="color:black;text-decoration:underline;">negro</span>.</h2>
    		`);
    	}
    }else{
    	$('.contenido_apuesta').removeClass('hidden');
    	//console.log(is_read);
    }
});

$(document).on('click','.goback', function(e){
	localStorage.setItem('isRead', 1);
	$('.rptx').addClass('hidden');
	$('.contenido_apuesta').removeClass('hidden');
});

$('#buscar_jugador').click(function(){
	buscarJugador();
});

function formatCurrency(locales, currency, fractionDigits, number) {
  var formatted = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: fractionDigits
  }).format(number);
  return formatted;
}

function buscarJugador(){
	cedula_player = $('#cedula').val();
	$.ajax({
		method: "GET",
		dataType: 'JSON',
		url: "services/getData.php",
		success: function(data){
			$.each(data, function (key, value){
				if(cedula_player == value.cedula){
					nombre_player = value.nombre;
					dinero_player = value.dinero;
					localStorage.setItem('vTotal', dinero_player);
					localStorage.setItem('id', value.id);
					if(dinero_player > 1000){
						dineroMayorA1000(nombre_player, dinero_player);
					}else if(dinero_player > 0 && dinero_player <= 1000){
						dineroMenorOIgualA1000(nombre_player, dinero_player);
					}else if(dinero_player == 0){
						dineroEn0(nombre_player, dinero_player);
					}
				}					
			});				
		}
	});
}

function dineroMayorA1000(nombre, dinero){
	var xi_abm = i_abm(dinero);
	var xi_abmx = i_abmx(dinero);
	$('.result').empty();
	$('.result').append(`						
	<h2><span style="color:green;">Online</span>: `+nombre+`</h2>
	<p>Dinero disponible: <b id="dinero_disponible">`+formatCurrency("es-CO", "COP", 0, dinero)+`</b></p>
	<input style="margin-bottom:5px;" type="number" name="dinero_apostar" id="dinero_apostar" placeholder="Cantidad" width="20"></input>
	<button id="dinero_apostar_save" data-monto="`+dinero+`">Aceptar</button><br>
	<p style="color:green;">Dinero a apostar: <b id="idxx">`+formatCurrency("es-CO", "COP", 0, dinero)+`</b></p>
	<small style="margin-top:5px;text-transform:uppercase;">Ingrese la cantidad que desea apostar.</small><br>
	<small><strong>Con el dinero que posee, puede apostar entre `+formatCurrency("es-CO", "COP", 0, xi_abm)+` y `+formatCurrency("es-CO", "COP", 0, xi_abmx)+`.</strong></small>
	<div class="content"></div>
	`);	
}

function i_abm(monto){
	var calc_m = monto * 0.008;
	return calc_m;
}

function i_abmx(monto){	
	var calc_mx = monto * 0.15;
	return calc_mx;
}

$(document).on('click','#dinero_apostar_save',function(e){
	e.preventDefault();
	monto = $(this).data('monto');
	chkDinero(monto);
});

function chkDinero(monto){	
	emin = i_abm(monto);
	emax = i_abmx(monto);
	var i_gftt = $('#dinero_apostar').val();
	if(i_gftt == ''){
		alert('Por favor ingrese una cantidad para apostar.');
	}else if(i_gftt < emin){
		$('.content').empty();
		alert('No puedes apostar menos de '+formatCurrency("es-CO", "COP", 0, emin)+'.');
	}else if(i_gftt > emax){
		$('.content').empty();
		alert('No puedes apostar más de '+formatCurrency("es-CO", "COP", 0, emax)+'.');
	}else if(i_gftt >= emin && i_gftt <= emax){
		localStorage.setItem('vApostar', i_gftt);
		$('#idxx').empty().append(formatCurrency("es-CO", "COP", 0, i_gftt));
		//contenido apuesta
		$('.content').empty();
		$('.content').append(`		
			<div class="c_verde c1" data-id="1">Apostar a verde.</div>	
			<div class="c_rojo c2" data-id="2">Apostar a rojo.</div>
			<div class="c_negro c3" data-id="3">Apostar a negro.</div>			
		`);
	}
}

$(document).on('click','.c_verde',function(e){
	e.preventDefault();
	num_id = $(this).data('id');
	dataApuesta(num_id);
});

$(document).on('click','.c_rojo',function(e){
	e.preventDefault();
	num_id = $(this).data('id');
	dataApuesta(num_id);
});

$(document).on('click','.c_negro',function(e){
	e.preventDefault();
	num_id = $(this).data('id');
	dataApuesta(num_id);
});

function dataApuesta(arg){
	localStorage.setItem('selected_arg', arg);
	var wioti = parseInt($('#dinero_apostar').val());
	var vf_t = parseInt(localStorage.getItem('vTotal'));
	var din_apos = localStorage.getItem('vApostar');
	var num_result = getProbabilities();
	localStorage.setItem('last_game_r', num_result);
	$('.content div').empty();
	$('.c'+num_result).addClass('isthis').append('ESTE ES EL GANADOR.');	
	//console.log(num_result);
	if(num_result == arg){
		if(arg == 2 || arg == 3){
			var wgan = din_apos * 2;
			localStorage.setItem('vApostar', wgan);
		}else if(arg == 1){
			var wgan = din_apos * 15;
			localStorage.setItem('vApostar', wgan);			
		}		
	}
	localStorage.setItem('vApostado', wioti);
	localStorage.setItem('isRead', 0);
	var cust_p = parseInt(localStorage.getItem('vApostar'));
	var val_tog = (vf_t - wioti) + cust_p;
	editarJugador(val_tog);
	setTimeout(location.reload(), 10000);
	//console.log(val_tog);
	//chkDinero(din_apos);
}

function editarJugador(din){
	var crf_t = localStorage.getItem('id');
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

function getProbabilities(){
    var probabilities = Math.random();    
    console.log(probabilities);
    if(probabilities >= 0 && probabilities <= 0.02){
    	return 1;  
    }else if(probabilities >= 0.03 && probabilities <= 0.49){
    	return 2;
    }else if(probabilities >= 0.50 && probabilities <= 1){
    	return 3;
    }
}

function randomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}


/*----------------------------------------------------------------*/

function dineroMenorOIgualA1000(nombre, dinero){	
	$('.result').empty();
	$('.result').append(`						
	<h2><span style="color:green;">Online</span>: `+nombre+`</h2>
	<p>Dinero disponible: <b id="dinero_disponible">`+formatCurrency("es-CO", "COP", 0, dinero)+`</b></p>
	<small style="color:blue;"><b>Tienes $ 1.000 o menos, si apuestas vas a All In.</b></small>
	<div class="content"></div>
	`);

	//contenido apuesta
	$('.content').empty();
	$('.content').append(`		
		<div class="c_verde c1" data-id="1">Apostar a verde.</div>	
		<div class="c_rojo c2" data-id="2">Apostar a rojo.</div>
		<div class="c_negro c3" data-id="3">Apostar a negro.</div>			
	`);
}

/*----------------------------------------------------------------*/

function dineroEn0(nombre, dinero){
	$('.result').empty();
	$('.result').append(`						
	<h2><span style="color:red;">Offline</span>: `+nombre+`</h2>
	<p>Dinero disponible: <b id="dinero_disponible">`+formatCurrency("es-CO", "COP", 0, dinero)+`</b></p>
	<small style="color:red;"><b>No tienes suficiente dinero para apostar.</b></small>
	`);
}



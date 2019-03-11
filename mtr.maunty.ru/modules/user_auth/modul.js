function password_recovery_form(elem){
	if ( $(elem).is("[tmpl]") ){
		var template =  $(elem).attr('tmpl');
	}else{
		var template = 'tpl_default';
	}
	
	$.ajax({ 
		url: '/modules/user_auth/ajax.php',
		type: 'POST',
		dataType: 'json',
		data: ({action:'password_recovery_form', template:template}),
		success:  
			function(data, textStatus, jqXHR){
				if(data.result == 'true'){
					var buttons = {		
								continues : {
									title : 'Восстановить',
									class : 'send',
									id : 'recovery-send-button',
									click_action : 'password_recovery()'
								},
								cancel : {
									title : 'Закрыть',
									class : 'close',
									click_action : 'close_dialog()'
								}
					}
					var html = '<div id="users-popup-container">'+data.html+'</div>'
					fancy_popup(html, 'Восстановление доступа', buttons);
				}else{
				 	alert(data.error);
				}
			},
		error: 
			function(){
			//alert('Ошибка удаления(02). Обратитесь к администратору'+table+id);
			}
	});	
}

function password_recovery(){
	var recovery_email = $('#recovery_email').val();
	$.ajax({ 
		url: '/modules/user_auth/ajax.php',
		type: 'POST',
		dataType: 'json',
		data: ({action:'password_recovery', recovery_email:recovery_email}),
		success:  
			function(data, textStatus, jqXHR){
				if(data.result == 'true'){
					$('#users-popup-container').html(data.html);
					$('#recovery-send-button').hide();
				}else{
				 	alert(data.error);
				}
			},
		error: 
			function(){
			//alert('Ошибка удаления(02). Обратитесь к администратору'+table+id);
			}
	});	
}

function user_login_form(elem){
	if ( $(elem).is("[tmpl]") ){
		var template =  $(elem).attr('tmpl');
	}else{
		var template = 'tpl_default';
	}
	
	$.ajax({ 
		url: '/modules/user_auth/ajax.php',
		type: 'POST',
		dataType: 'json',
		data: ({action:'user_login_form', template:template}),
		success:  
			function(data, textStatus, jqXHR){
				if(data.result == 'true'){
					maunty_popup_window_open({
							content : '<div id="users-popup-container">'+data.html+'</div>'
						});  
				}else{
				 	alert(data.error);
				}
			},
		error: 
			function(){
			//alert('Ошибка удаления(02). Обратитесь к администратору'+table+id);
			}
	});	
}
function user_login(){
	var authorization = {};
	$('.login-field').each(function(index, elem){
		name = $(this).attr('field');
		value = $(this).val();
		authorization[name] = value;
	});
		
	$.ajax({ 
		url: '/modules/user_auth/ajax.php',
		type: 'POST',
		dataType: 'json',
		data: ({action:'user_login', authorization:authorization}),
		success:  
			function(data, textStatus, jqXHR){
				if(data.result == 'true'){
					if(data.login == 'true'){
						location.reload();
					}else{
						$('#login-error').html('<span>'+data.login_error+'</span>');	
					}
					
				}else{
				 	alert(data.error);
				}
			},
		error: 
			function(){
			//alert('Ошибка удаления(02). Обратитесь к администратору'+table+id);
			}
	});	
}


;
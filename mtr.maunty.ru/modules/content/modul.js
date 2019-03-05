
function to_basket_action(elem){
		var product_id = $(elem).attr('product_id');
		var product_title = $(elem).attr('product_title');
		var quantity_elem = $('#'+$(elem).attr('quantity_elem'));
		var product_price_type = $(elem).attr('product_price_type');
		var basket_alias = $(elem).attr('basket_alias');
		
		if(quantity_elem.length >0)	var quantity = $(quantity_elem).val();	
			else var quantity = 1;
		
		if($('#basket_dialog').length == 0) $('body').append('<div id="basket_dialog" class="basket_dialog"></div>');
			else $('#basket_dialog').html('');
		
		$.ajax({ 
			url: '/modules/catalog/ajax.php',
			type: 'POST',
			dataType: 'json',
			data: ({action:'add_to_basket', product_id:product_id, quantity:quantity, product_price_type:product_price_type, basket_alias:basket_alias}),
			success:  
				function(data, textStatus, jqXHR){
					if(data.result == 'true'){
						//alert(data.quantity_count_elem);
						if(typeof (data.quantity_count_elem) != 'undefined'){
							$('#'+data.quantity_count_elem).html(data.quantity_count);
						}

						$("#basket_dialog").html(data.message).dialog({
						  modal: true,
						  title:'',
						  dialogClass: 'basket-dialog',
						 // buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ],
						  buttons: 
						  	[ {
								text: "Продолжить покупки",
								class: 'cont',
								click: function() {
										  $("#basket_dialog").dialog( "close" );							
										}
							},
							{
								text: "Оформить заказ",
								class: 'to-basket',
								click: function() {
							 				window.location.assign('/'+basket_alias);	
							 			}
							}
							],
						   close: function( event, ui ) {
							   $("#basket_dialog" ).dialog( "destroy" );
							   $('#basket_dialog').remove();
						  }
						});
						
					}else{
						if(data.error != ''){
							alert(data.error);
						}else{
							alert('Не удается добавить товар в корзину: ADO-10.');
						}
					}
				},
			error: 
				function(){
					alert('Не удается добавить товар в корзину: ADO-20. Проверьте соединение с Интернетом и обновите страницу. Если ошибка повториться, просьба обратиться к нам по контактным телефонам.');
				}
		});	
}
function to_basket_fast_pay(elem){
		var product_id = $(elem).attr('product_id');
		var product_title = $(elem).attr('product_title');
		var quantity_elem = $('#'+$(elem).attr('quantity_elem'));
		var product_price_type = $(elem).attr('product_price_type');
		var basket_alias = $(elem).attr('basket_alias');
		
		if(quantity_elem.length >0)	var quantity = $(quantity_elem).val();	
			else var quantity = 1;
		
		$.ajax({ 
			url: '/modules/catalog/ajax.php',
			type: 'POST',
			dataType: 'json',
			data: ({action:'add_to_basket', product_id:product_id, quantity:quantity, product_price_type:product_price_type, basket_alias:basket_alias}),
			success:  
				function(data, textStatus, jqXHR){
					if(data.result == 'true'){
						window.location.href = '/'+basket_alias;
					}else{
						if(data.error != ''){
							alert(data.error);
						}else{
							alert('Не удается создать заказ: ADO-20.');
						}
					}
				},
			error: 
				function(){
					alert('Не удается создать заказа: ADO-21. Проверьте соединение с Интернетом и обновите страницу. Если ошибка повториться, просьба обратиться к нам по контактным телефонам.');
				}
		});	
}
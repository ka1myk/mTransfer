/*************** overheight ****************/	




function maunty_popup_window_close(){
	maunty_popup_window_ScrollOn();
	
	$('#maunty_popup_window_container').fadeOut(300);
	setTimeout(function(){ 
			$('#maunty_popup_window_container').remove();
			}, 400);
	
}
function maunty_popup_window_open(params){
	maunty_popup_window_ScrollOff(); 
	
	maunty_PW_AddContainer(function(){
		var header = '';
		var footer = '';
		var content = '';
		var has_footer = '';
		
		if( params.title !== undefined ){
			header = '<div class="maunty_popup_window_header">'+params.title+'</div>';
		}
		
		if( params.footer !== undefined || params.footer !== false  ){
			footer = '<div class="maunty_popup_window_footer">'+params.footer+'</div>';
			has_footer = ' has-footer';
		}
		
		content = '<div class="maunty_popup_window_content'+has_footer+'"><div class="maunty_popup_window_section">'+params.content+'</div></div>';
		
		
		jQuery('<div/>', {
			id: 'maunty_popup_window',
			class: 'maunty_popup_window',
		}).html(header+content+footer).appendTo('#maunty_popup_window_container');
		
		setTimeout(function(){ 
			$('#maunty_popup_window_container').addClass('is-show').fadeIn(300);
			}, 100);
	});
}

function maunty_PW_AddContainer(onComplete){
	jQuery('<div/>', {
		id: 'maunty_popup_window_container',
		class: 'maunty_popup_window_container',
		style: 'display:none'
	}).appendTo('body').on('click', function(){maunty_popup_window_close();});
	onComplete();
}


//Функция отключения скролла документа
function maunty_popup_window_ScrollOff () {
	if($(window).innerHeight() < $('body')[0].scrollHeight){  
		var winScrollTop = $(document).scrollTop();
		$('body').addClass('ScrollOff').attr('scroll', winScrollTop).css({
				'top': -winScrollTop,
				});
	}
}
//Отключаем запрет скрола
function maunty_popup_window_ScrollOn () {
	if($('body').hasClass('ScrollOff')){
		$('body').removeClass('ScrollOff').removeAttr('style');
		$(document).scrollTop($('body').attr('scroll'));
	}
}

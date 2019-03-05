/*************** overheight ****************/	
function maunty_popup_window_close(){
	maunty_popup_window_ScrollOn();
	$('#maunty_popup_container').fadeOut(300);
	setTimeout(function(){ 
			$('#maunty_popup_container').remove();
	}, 400);
}




function maunty_popup_window_open(params){
	
	maunty_popup_window_ScrollOff(); 
	
	maunty_PW_AddContainer(function( ){
		
		maunty_PW_AddContent(params, function( cont ){
	
			var counter = 0;
			var timerId = setInterval(function(){ 
				if( (counter +=1) > 50)  clearInterval(timerId);
					maunty_PW_calcHeight();
				}, 30);
			
			setTimeout(function(){ 
				$('#maunty_popup_container').addClass('is-show');//.fadeIn(300);
				}, 100);
		});
	});
}

$(window).on('resize', function(){
	maunty_PW_calcHeight();
});

function maunty_PW_calcHeight(){
	if($('#maunty_popup_container').length){
		$('#maunty_popup_content').css('height', $('#maunty_popup_window').height());
		if( $('#maunty_popup_content')[0].scrollHeight > $('#maunty_popup_window').height()){
			var windowHeight =  ( $('#maunty_popup_window').innerHeight() -  $('#maunty_popup_window').height() ) + $('#maunty_popup_content')[0].scrollHeight;
			$('#maunty_popup_window').css('height', windowHeight);
		}
	}
}

function maunty_PW_AddContainer(onComplete){
	
	var cont = $('<div/>', {
		id: 'maunty_popup_container',
		class: 'maunty_popup_container'
		//style: 'display:none'
	}).appendTo('body').on('click', function(ev){
		
			if(this == ev.target){
				maunty_popup_window_close();
			}
		});
	onComplete();
}

function maunty_PW_AddContent(params, onComplete){
	
	
	var counentClass = '';
	var title = '';
	var buttons = '';
	var closeIcon = '';
 	if( 'closeIcon' in params && params.closeIcon === true ){ 
		closeIcon = '<div class="maunty_popup_content_close" onclick="maunty_popup_window_close()"></div>';
		}
	if( 'title' in params ){ 
		counentClass += ' has-title';
		title = '<div class="maunty_popup_content_title"><div class="title">'+params.title+'</div></div>';
		}		
		
	if( 'buttons' in params ){ 
		counentClass += ' has-buttons';
		buttons = '<div class="maunty_popup_content_buttons">';
		var button = '';
		for (var key in params.buttons) { 
			
				button = '<a class="popup_content_button" ';
				if( 'onClick' in params.buttons[key] ){
					button += 'href="javascript:;" onclick="'+params.buttons[key].onClick+'"';
				}else if ('href' in params.buttons[key]){
					button += 'href="'+params.buttons[key].href+'"'; 
				}
				button += '>'+params.buttons[key].title+'</a>';
				buttons += button;
		}
		buttons += '</div>';
 	}
	
	content = closeIcon+title+'<div id="maunty_popup_content" class="maunty_popup_content">'+params.content+'</div>'+buttons;
	jQuery('<div/>', {
		id: 'maunty_popup_window',
		class: 'maunty_popup_window'+counentClass,
	}).html(content).appendTo('#maunty_popup_container');
	var cont = $('#maunty_popup_content');
	onComplete( cont );
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

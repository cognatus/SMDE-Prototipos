$(document).ready(function(){
	
	$('#menubutton').click(function(){
		$('#menu').animate({ left : '0' } , 500);
		$('.back_menu').show();
	});

	$('.back_menu').click(function(){
		$('#menu').animate({ left : -($('#menu').width() + 10) } , 500);
		$(this).hide();
	});

	$('.op_bg').css('top' , ( $(window).height() - $('.op_bg').height() ) * 0.5 + 'px');

});
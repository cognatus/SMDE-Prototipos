$(document).ready(function(){
	
	$('#menubutton').click(function(){
		$('#menu').animate({ left : '0' } , 300);
		$('.back_menu').show();
		$('body').css('overflow' , 'hidden');
	});

	$('body').on('swipeleft' , function(){
		$('#menu').animate({ left : '0' } , 300);
		$('.back_menu').show();
		$('body').css('overflow' , 'hidden');
	});

	$('.back_menu').click(function(){
		$('#menu').animate({ left : -($('#menu').width() + 10) } , 300);
		$(this).hide();
		$('body').css('overflow' , 'auto');
	});

	$('.op_bg').css('top' , ( $(window).height() - $('.op_bg').height() ) * 0.5 + 'px');

	$('#m_menu').click(function(){
		$('.m_hiddenmenu').slideDown(300);
	});

	$('html , body').click(function(){
		$('.m_hiddenmenu').slideUp(300);
	});

	$('.m_hiddenmenu , #m_menu').click(function(){
		event.stopPropagation();
	});

	$('.block_containermsm .hover').click(function(){
		$('.block_containermsm').animate({ scrollLeft: $('.halfgrid').width() });
		$('#new_item').hide();
		//$('.top_pallete').hide();
		//$('.topspace').hide();
	});

	$('#backicon').click(function(){
		$('.block_containermsm').animate({ scrollLeft: '0px' },function(){
			$('#new_item').show();
		});
		//$('.top_pallete').show();
		//$('.topspace').show();
	});

});
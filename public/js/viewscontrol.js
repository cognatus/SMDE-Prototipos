$(document).ready(function(){
	
	$('#menubutton').click(function(){
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

	$('.minimenu').click(function(){
		$(this).siblings('.minimenu_hidden').slideDown(300);
	});

	$('html').on('swipe' , function(){
		$('#menu').animate({ left : '0' } , 300);
		$('.back_menu').show();
		$('body').css('overflow' , 'hidden');
	});

	$('html , body').click(function(){
		$('.minimenu_hidden').slideUp(300);
		$('.minimenu_hidden , .minimenu').click(function(){
			event.stopPropagation();
		});
	});

	$('.block_containermsm .hover').click(function(){
		if($(window).width() < 919){
			$('.block_containermsm').animate({ scrollLeft: $('.halfgrid').width() });
			$('#new_item').hide();
		}
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

	$('#signatureprogress').css('width' , parseFloat($('#signaturegralprom').text()) * 10 + '%' );

	$('.close , .hidden_blockback').click(function(){
		$(this).parents('.hidden_blockcontainer').fadeOut(300);
	});

	$('.float_buttoncontainer').click(function(){
		$('.hidden_blockcontainer').fadeIn(300);
		$('body , html').css('overflow', 'none');
		$('.hidden_blockcontainer').css('overflow', 'auto');
	});

	$('.calendar .day').click(function(){
	  var pos = $(this).find('.num span').position();
	  $('.day_pos').show();
	  if( $(this).find('.num span').text().length > 1){
	  	$('.day_pos').animate({ left : pos.left - 14.6,
	  		top : pos.top - 9 });
	  }
	  else{
	  	$('.day_pos').animate({ left : pos.left - 18.2,
	  		top : pos.top - 9 });
	  }
	});

});
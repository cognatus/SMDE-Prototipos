$(document).ready(function(){
	
	$('.top_pallete_inner').css( 'background-color' ,  $('.top_pallete').css('background-color') );

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

	$('html , body').click(function(event){
		$('.minimenu_hidden').slideUp(300);
	});

	$('.minimenu_hidden , .minimenu').click(function(){
		return false;
	});

	$('.block_containermsm .hover').click(function(){
		if($(window).width() < 1120){
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

	var origwidth = $('.hidden_blockcontainer').width();
	var origheight = $('.hidden_blockcontainer').height();

	$('.close , .hidden_blockback').click(function(){
		$(this).parents('.hidden_blockcontainer').fadeOut(300,function(){
			location.reload(true);
		});
	});

	$('.float_buttoncontainer').click(function(){
		var animate = $('.hidden_blockcontainer');
		var offset = $(this).offset();
		var widthsize = $(this).width();
		$('.hidden_block').hide();
		animate.css({ 
			top: offset.top,
			left:offset.left,
			height: widthsize,
			width: widthsize,
			borderTopLeftRadius: 1000, 
		    borderTopRightRadius: 1000, 
		    borderBottomLeftRadius: 1000, 
		    borderBottomRightRadius: 1000
		});
		animate.show();
		animate.animate({
			left: ($(window).width() - 100)/2,
			top: ($(window).height() - 100)/2,
			width: 200,
			height: 200
		}, 450, function(){
			$('.hidden_blockback').animate({ opacity: 0 });
			$('.hidden_block').fadeIn(400);
			$('.hidden_blockback').css('z-index' , '0');
		});
		animate.animate({ 
			height: '100%',
			width:'100%',
			left: 0,
			top: 0,
			borderTopLeftRadius: 0, 
		    borderTopRightRadius: 0, 
		    borderBottomLeftRadius: 0, 
		    borderBottomRightRadius: 0
		}, 120);


		$('body , html').css('overflow', 'hidden');
	});


/*-------------------------------------------------------------------------------------
		VERTICAL LIST CONTROL
---------------------------------------------------------------------------------------*/ 

	$('.innerlistitem').hide();

	$('.hover').click(function(){
		var slideD = $(this).siblings('.innerlistitem');

		if($(this).siblings('.innerlistitem').css('display') == 'block'){
			$(this).siblings('.innerlistitem').slideUp();
		}
		else{
			$('.innerlistitem').slideUp();
			slideD.slideDown();
		}

	});


/*-------------------------------------------------------------------------------------
		HORIZONTAL LIST CONTROL
---------------------------------------------------------------------------------------*/ 

	$('.h_listindex').hide();
	$('.h_listindex.first').show();	

	$('.h_listline').css('width' , $('.h_listitem.first').outerWidth(true) );

	$('.h_listcontainer .h_listitem').click(function(){
		var h_index = $(this).parents('.h_listcontainer').find('.h_listindex');
		var pos = $(this).index();
		
		h_index.hide();
		h_index.eq(pos-1).show();

		var offset = $(this).position();

		$('.h_listline').animate({
			width : $(this).css('width') ,
			left : offset.left
		});
	});

});
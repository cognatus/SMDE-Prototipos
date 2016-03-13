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

	$('.minimenu').click(function(){
		$(this).siblings('.minimenu_hidden').slideDown(300);
	});

	$('span.title_rightoptionicon').click(function(){
		$(this).find('.minimenu_hidden').slideDown(300);
	});

	$('.spinner').spinner({
		strokeWidth: 5,
		color: '#00BFA5',
		radius: 30,
	});

	$('html , body').click(function(event){
		$('.minimenu_hidden').slideUp(300);
	});

	$('.minimenu_hidden , .minimenu , span.title_rightoptionicon').click(function(){
		return false;
	});

	$('.block_containermsm .listitem').click(function(){
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
			location.reload();
		});
	}); 

/*-------------------------------------------------------------------------------------
		FORM ANIMATION
---------------------------------------------------------------------------------------*/

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
			borderTopLeftRadius: 200, 
		    borderTopRightRadius: 200, 
		    borderBottomLeftRadius: 200, 
		    borderBottomRightRadius: 200
		});
		animate.show();
		animate.animate({
			left: ($(window).width() - 200)/2,
			top: ($(window).height() - 200)/2,
			width: 200,
			height: 200
		}, 480, function(){
			$('.hidden_blockback').animate({ opacity: 0 }, 360);
			$('.hidden_block').fadeIn(360);
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
		}, 140);


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
		var oftop = $(this).outerHeight() + offset.top - $('.h_listline').height();

		$('.h_listline').animate({
			width : $(this).css('width'),
			left : offset.left,
			top : oftop
		});
	});

/*-------------------------------------------------------------------------------------
		LIST ITEM CIRCLE CONTROL
---------------------------------------------------------------------------------------*/

	$('.listitem .listitem_img span').text();

	var colorsArray = ['bg_amber','bg_red','bg_lightblue','bg_orange','bg_lightgreen','bg_purple',
		'bg_green','bg_lightpink','bg_yellow','bg_brown','bg_indigo','bg_darkgray','bg_red','bg_darkorange',
		'bg_teal','bg_darkpurple','bg_cyan','bg_blue','bg_indigo','bg_orange','bg_brown','bg_darkblue',
		'bg_purple','bg_red','bg_lightblue','bg_lightpink','bg_bluegray','bg_darkgray',
		// Numbers colors
		'bg_brown','bg_red','bg_lightgreen','bg_lightpink','bg_amber','bg_green','bg_darkgray','bg_purple','bg_lightblue'];

	var characters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';

	$('.msmtopname').each(function(){

		var circleLetter = $(this).find('label').text();
		var span = $(this).find('.letter');
		var firstChar = circleLetter.charAt(0).toUpperCase();

		span.text(firstChar);

		for( var i = 0; i <= characters.length; i++ ){
			if ( firstChar == characters[i] ){
				span.addClass(colorsArray[i]);
				break;
			}
		}

	});

	$('.listitem').each(function(){

		var circleLetter = $(this).find('.listitem_title b').text();
		var span = $(this).find('.listitem_img span');
		var firstChar = circleLetter.charAt(0).toUpperCase();

		span.text(firstChar);

		for( var i = 0; i <= characters.length; i++ ){
			if ( firstChar == characters[i] ){
				span.addClass(colorsArray[i]);
				break;
			}
		}

	});

});
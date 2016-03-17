$(document).ready(function(){

	$('#signatureprogress').css('width' , parseFloat($('#signaturegralprom').text()) * 10 + '%' );

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

	$('#backicon').click(function(){
		$('.block_containermsm').animate({ scrollLeft: '0px' },function(){
			$('#new_item').show();
		});
		//$('.top_pallete').show();
		//$('.topspace').show();
	});

	$('.close , .hidden_blockback').click(function(){
		$(this).parents('.hidden_blockcontainer').fadeOut(300,function(){
			location.reload();
		});
	});

/*-------------------------------------------------------------------------------------
		CONFIRM BLOCK
---------------------------------------------------------------------------------------*/

	$('.hb_formcontainer .form_input span.submit').click(function(){
		$(this).parents('.hb_formcontainer').find('.form_confirmblock').fadeIn();
	});

	$('.submit_cancel').click(function(){
		$(this).parents('.form_confirmblock').fadeOut();
	})

/*-------------------------------------------------------------------------------------
		FORM ANIMATION
---------------------------------------------------------------------------------------*/

	$('.float_buttoncontainer').click(function(){
		var animate = $('.hidden_blockcontainer');
		var offset = $(this).offset();
		var widthsize = $(this).width();
		$('.hidden_block').hide();
		$(this).hide();
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

	$('.listitem').click(function(){

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
		h_index.eq(pos).show();

		var offset = $(this).position();
		var oftop = $(this).outerHeight() + offset.top - $('.h_listline').height();

		$('.h_listline').animate({
			width : $(this).css('width'),
			left : offset.left,
			top : oftop
		});
	});

/*-------------------------------------------------------------------------------------
		SUBJECTS ADD - REMOVE CONTROL
---------------------------------------------------------------------------------------*/

	$('#new_subjects .listitem .listitem_righticon').click( function(){
		var appendedSubjects = $('#added_subjects');
		var newSubjects = $('#newSubjects');
		var item =  $(this).parents('.listitem').clone();

		var itemId = item.attr('id');

		console.log(itemId);

		if(appendedSubjects.find('#' + itemId).length == 0 ){
			appendedSubjects.append(item);
		}

		var listSort = $('#added_subjects');
		listSortItem = listSort.children('.listitem');

		listSortItem.sort(function(a,b){
			var an = a.getAttribute('data-name'),
				bn = b.getAttribute('data-name');

			if(an > bn) {
				return 1;
			}
			if(an < bn) {
				return -1;
			}
			return 0;
		});

		listSortItem.detach().appendTo(listSort);
		

		if( $('#added_subjects').find('.listitem').length > 0 ){
			$('#sub_hide').hide();
			$('#added_subjects .listitem_righticon').removeClass('bg_plusgray');
			$('#added_subjects .listitem_righticon').addClass('bg_closegray');
		}

		$('#added_subjects .listitem .listitem_righticon').click( function(){

			var itemQuit =  $(this).parents('.listitem');
			itemQuit.remove();

			if( $('#added_subjects').find('.listitem').length < 1 ){
				$('#sub_hide').show();
			}

		});
	});

/*-------------------------------------------------------------------------------------
		SETTINGS CONTROL
---------------------------------------------------------------------------------------*/

	var msmColors = ['bg_red','bg_pink','bg_lightpink','bg_purple','bg_darkpurple','bg_indigo','bg_darkblue',
		'bg_blue','bg_lightblue','bg_cyan','bg_teal','bg_green','bg_lightgreen','bg_lime','bg_yellow','bg_amber',
		'bg_orange','bg_darkorange','bg_brown','bg_gray','bg_bluegray','bg_darkgray'];

	for( var i = 0; i < msmColors.length; i++ ){
		$('.settings_colors').append('<span class="' + msmColors[i] + ' circle"></span>');
	}

	$('.settings_colors span').click(function(){
		$(this).addClass('bg_check');
		$(this).siblings('span').removeClass('bg_check');
	});

/*-------------------------------------------------------------------------------------
		LIST ITEM CIRCLE CONTROL
---------------------------------------------------------------------------------------*/

	var colorsArray = ['bg_amber','bg_red','bg_lightblue','bg_orange','bg_lightgreen','bg_purple',
		'bg_green','bg_lightpink','bg_yellow','bg_brown','bg_indigo','bg_darkgray','bg_red','bg_darkorange',
		'bg_teal','bg_darkpurple','bg_cyan','bg_blue','bg_indigo','bg_red','bg_brown','bg_darkblue',
		'bg_purple','bg_pink','bg_lightblue','bg_bluegray','bg_amber','bg_lime',
		// Numbers colors
		'bg_brown','bg_red','bg_lightgreen','bg_lightpink','bg_amber','bg_green','bg_darkgray','bg_purple','bg_lightblue'];

	var characters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';

	$('.listitem, .hover').each(function(){

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

	$('.block_containermsm .listitem').click(function(){
		var title = $(this).attr('data-name');
		var img = $(this).find('img').attr('src');
		if( $(window).width() < 1120 ){
			$('.block_containermsm').animate({ scrollLeft: $('.halfgrid').width() });
			$('#new_item').hide();
		}
		$('.msmtopname label').text(title);
		$('img#msm_userimg').attr('src' , img );
		changeLetterColor();
	});

	if( $(window).width() >= 1120 ){
		$('#listcontainer.left_listcontainer .listitem').first().trigger('click');
	}

	function changeLetterColor(){
		$('.msmtopname').each(function(){

			var circleLetter = $(this).find('label').text();
			var div = $(this).find('.letter');
			var firstChar = circleLetter.charAt(0).toUpperCase();

			div.text(firstChar);

			for( var i = 0; i <= characters.length; i++ ){
				if ( firstChar == characters[i] ){
					for(var j = 0; j <= colorsArray.length; j++ ){
						div.removeClass(colorsArray[j]);
					}
					div.addClass(colorsArray[i]);
					break;
				}
			}

		});
	}

/*-------------------------------------------------------------------------------------
		SORT LISTS CONTROL
---------------------------------------------------------------------------------------*/

	var listSortOrder = $('#listcontainer');
	listSortItemOrder = listSortOrder.children('.listitem');

	var Sort = {};

	var count = 0;
	function sortToggleClick(){
		count++;
	    var isEven = function(someNumber) {
	        return (someNumber % 2 === 0) ? true : false;
	    }

	    if (isEven(count) === false) {
	        sortDescending();
	    } else if (isEven(count) === true) {
	       sortAscending();
	    }
	    listSortItemOrder.detach();
		listSortOrder.prepend(listSortItemOrder);
	}

	function sortDescending(){
		listSortItemOrder.sort(function(a,b){
			var an = a.getAttribute(Sort.atribute),
			bn = b.getAttribute(Sort.atribute);
			if(an > bn) {
				return 1;
			}
			if(an < bn) {
				return -1;
			}
			return 0;
		});
	}

	function sortAscending(){
		listSortItemOrder.sort(function(a,b){
			var an = a.getAttribute(Sort.atribute),
			bn = b.getAttribute(Sort.atribute);
			if(an < bn) {
				return 1;
			}
			if(an > bn) {
				return -1;
			}
			return 0;
		});
	}

	$('#sort_alfa').click(function(){
		Sort.atribute = 'data-name';
		sortToggleClick();
	});

	

	$('#sort_date').click(function(){
		Sort.atribute = 'data-date';
		sortToggleClick();
	});

	$('#sort_subject').click(function(){
		Sort.atribute = 'data-subject';
		sortToggleClick();
	});

/*-------------------------------------------------------------------------------------
		INPUT FILE
---------------------------------------------------------------------------------------*/

	$('#trigger_fbutton').click(function(){
		$('#attachedfile').trigger('click');
	});

	var origText = $('#file_value').text();
	
	$('#attachedfile').on('change' , function(){
		var fileValue = $(this).val();
		$('#file_value').text( fileValue );
		if( fileValue != ''){
			$('#file_value').addClass('border_accentcolor');
		}
		else{
			$('#file_value').removeClass('border_accentcolor');
			$('#file_value').text(origText);
		}
	});


/*-------------------------------------------------------------------------------------
		SEARCH BAR
---------------------------------------------------------------------------------------*/

	$('#buscar').keyup(function(){

		var currentQuery = $('#buscar').val().toUpperCase();
		$('#listcontainer .listitem').hide();

		if(currentQuery != ''){
			$('#listcontainer .listitem ').each(function(){
				var currentKeyboard = $(this).attr('data-name').toUpperCase();
				var currentKeyboard2 = $(this).attr('data-subject').toUpperCase();

				if( currentKeyboard.indexOf(currentQuery) >= 0 || currentKeyboard2.indexOf(currentQuery) >= 0 ){
					$(this).show();
				}
			});
		}
		else{
			$('#listcontainer .listitem').show();
		}

	});

	$('#buscar_slide').keyup(function(){

		var currentQuery = $('#buscar_slide').val().toUpperCase();
		$('#listcontainer .slide_list').hide();

		if(currentQuery != ''){
			$('#listcontainer .slide_list').each(function(){
				var currentKeyboard = $(this).attr('data-name').toUpperCase();
				var currentKeyboard2 = $(this).attr('data-type').toUpperCase();

				if( currentKeyboard.indexOf(currentQuery) >= 0 || currentKeyboard2.indexOf(currentQuery) >= 0 ){
					$(this).show();
				}
			});
		}
		else{
			$('#listcontainer .slide_list').show();
		}

	});

});
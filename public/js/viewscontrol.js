$.noConflict();
jQuery(document).on('ready' ,function(){

/*	jQuery('#changeTheme').click(function(){
		if( jQuery(this).is(':checked') ){
			jQuery('body').addClass('dark_theme');
		}
		else{
			jQuery('body').removeClass('dark_theme');
		}
	});*/

	jQuery('.sign_field input.textfield').focus(function(){
		var firstImg = jQuery(this).siblings('img').attr('src');
		var newImage = firstImg.slice(0 , -4);

		jQuery(this).siblings('img').attr('src' , newImage + '_white.png');

		jQuery('.sign_field input.textfield').blur(function(){
			jQuery(this).siblings('img').attr('src' , firstImg);
		});
	});

	jQuery('.listitem, .slide_list').each(function(){
		if( jQuery(this).parents('.listcontainer').find('.slide_list, .listitem').length > 0 ){
			jQuery(this).parents('.listcontainer').siblings('.empty_blocktext').hide();
		}
		else{
			jQuery(this).parents('.listcontainer').siblings('.empty_blocktext').show();
		}
	});

	jQuery('.hover').each(function(){
		if( jQuery(this).parents('.listcontainer').find('.hover').length > 0 ){
			jQuery(this).parents('.listcontainer').siblings('.empty_blocktext').hide();
		}
		else{
			jQuery(this).parents('.listcontainer').siblings('.empty_blocktext').show();
		}
	});

	jQuery('#signatureprogress').css(
		'width', 
		parseFloat( jQuery('#signaturegralprom').text() ) * 10 + '%' 
	);

	jQuery('#menubutton').click(function(){
		jQuery('#menu').animate({ 
			left : '0' 
		} , 300);
		jQuery('.back_menu').show();
		jQuery('body').css('overflow' , 'hidden');
	});

	jQuery('.back_menu').click(function(){
		jQuery('#menu').animate({ 
			left : -(jQuery('#menu').width() + 10) 
		} , 300);
		jQuery(this).hide();
		jQuery('body').css('overflow' , 'auto');
	});

	jQuery('.minimenu').click(function(){
		jQuery(this).siblings('.minimenu_hidden').fadeIn(200);
	});

	jQuery('.notif_icon').click(function(){
		jQuery('.notifications_hidden').fadeIn(200);
	});

	jQuery('span.title_rightoptionicon').click(function(){
		jQuery(this).find('.minimenu_hidden').fadeIn(200);
	});

	jQuery('.spinner').spinner({
		strokeWidth: 5,
		color: '#00BFA5',
		radius: 30,
	});

	jQuery('html , body').click(function(event){
		jQuery('.minimenu_hidden').fadeOut(200);
		jQuery('.notifications_hidden').fadeOut(200);
	});

	jQuery('.notifications_hidden , .notifications_container').click(function(){
		return false;
	});

	jQuery('.minimenu_hidden , .minimenu , span.title_rightoptionicon').click(function(){
		return false;
	});

	jQuery('#backicon').click(function(){
		jQuery('.block_containermsm, .block_containersettings').animate({ 
			scrollLeft: '0' 
		},function(){
			jQuery('#new_item').show();
		});
	});

	jQuery('.close , .hidden_blockback').click(function(){
		jQuery(this).parents('.hidden_blockcontainer').fadeOut(300,function(){
			location.reload();
		});
	});

/*-------------------------------------------------------------------------------------
		CONFIRM BLOCK
---------------------------------------------------------------------------------------*/

	jQuery('.hb_formcontainer .form_input span.submit').click(function(){
		jQuery(this).parents('.hb_formcontainer').find('.form_confirmblock').fadeIn();
	});

	jQuery('.submit_cancel').click(function(){
		jQuery(this).parents('.form_confirmblock').fadeOut();
	})

/*-------------------------------------------------------------------------------------
		FORM ANIMATION
---------------------------------------------------------------------------------------*/

	jQuery('.float_buttoncontainer').click(function(){
		var animate = jQuery('.hidden_blockcontainer');
		var offset = jQuery(this).offset();
		var widthsize = jQuery(this).width();
		jQuery('.hidden_block').hide();
		jQuery(this).hide();
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
			left: (jQuery(window).width() - 200)/2,
			top: (jQuery(window).height() - 200)/2,
			width: 200,
			height: 200
		}, 480, function(){
			jQuery('.hidden_blockback').animate({ opacity: 0 }, 360);
			jQuery('.hidden_block').fadeIn(360);
			jQuery('.hidden_blockback').css('z-index' , '0');
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

		jQuery('body , html').css('overflow', 'hidden');
	});


/*-------------------------------------------------------------------------------------
		INSERTS FORM CONTROL
---------------------------------------------------------------------------------------*/

	jQuery('#show_deptinsert, #show_subjectinsert, #show_courseinsert').hide();

	jQuery('#select_insertType').on('change' ,function(){
		var $this = jQuery(this);
		if( $this.val() == 'Student' || $this.val() == 'Teacher' ){
			jQuery('.hidden_form').hide();
			jQuery('#show_userinsert').show();
		}
		else if( $this.val() == 'Department' ){
			jQuery('.hidden_form').hide();
			jQuery('#show_deptinsert').show();
		}
		else if( $this.val() == 'Subject' ){
			jQuery('.hidden_form').hide();
			jQuery('#show_subjectinsert').show();
		}
		else if( $this.val() == 'Course' ){
			jQuery('.hidden_form').hide();
			jQuery('#show_courseinsert').show();
		}
	});

/*-------------------------------------------------------------------------------------
		HORIZONTAL LIST CONTROL
---------------------------------------------------------------------------------------*/ 

	jQuery('.h_listindex').hide();
	jQuery('.h_listindex.first').show();	

	jQuery('.h_listline').css('width' , jQuery('.h_listitem.first').outerWidth(true) );

	jQuery('.h_listcontainer .h_listitem').click(function(){
		var h_index = jQuery(this).parents('.h_listcontainer').find('.h_listindex');
		var pos = jQuery(this).index();
		
		h_index.hide();
		h_index.eq(pos).show();

		var offset = jQuery(this).position();
		var oftop = jQuery(this).outerHeight() + offset.top - jQuery('.h_listline').height();

		jQuery('.h_listline').animate({
			width : jQuery(this).css('width'),
			left : offset.left,
			top : oftop
		});
	});

	jQuery('.block_containersettings .settingsitem').click(function(){
		var settings_index = jQuery('.settings_inneritem');
		var pos = jQuery(this).index('.settingsitem');
		
		jQuery(window).scrollTop(0);
		
		settings_index.hide();
		settings_index.eq(pos).fadeIn(500);
	});

/*-------------------------------------------------------------------------------------
		SUBJECTS ADD - REMOVE CONTROL
---------------------------------------------------------------------------------------*/

	jQuery('#new_subjects .listitem .listitem_righticon').click( function(){
		var appendedSubjects = jQuery('#added_subjects');
		var newSubjects = jQuery('#newSubjects');
		var item =  jQuery(this).parents('.listitem').clone();

		var itemId = item.attr('id');

		console.log(itemId);

		if(appendedSubjects.find('#' + itemId).length == 0 ){
			appendedSubjects.append(item);
		}

		var listSort = jQuery('#added_subjects');
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
		

		if( jQuery('#added_subjects').find('.listitem').length > 0 ){
			jQuery('#sub_hide').hide();
			jQuery('#added_subjects .listitem_righticon').removeClass('bg_plusgray');
			jQuery('#added_subjects .listitem_righticon').addClass('bg_closegray');
		}

		jQuery('#added_subjects .listitem .listitem_righticon').click( function(){

			var itemQuit =  jQuery(this).parents('.listitem');
			itemQuit.remove();

			if( jQuery('#added_subjects').find('.listitem').length < 1 ){
				jQuery('#sub_hide').show();
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
		jQuery('.settings_colors').append('<span class="' + msmColors[i] + ' circle"></span>');
	}

	jQuery('.settings_colors span').click(function(){
		var color = jQuery(this).css('background-color');
		jQuery(this).addClass('bg_check');
		jQuery(this).siblings('span').removeClass('bg_check');
		jQuery('#msmValueColor').val(rgb2hex(color));
	});

	function rgb2hex(rgb) {
	    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

	    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	    function hex(x) {
	        return ("0" + parseInt(x).toString(16)).slice(-2);
	    }
	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

/*-------------------------------------------------------------------------------------
		LIST ITEM CIRCLE CONTROL
---------------------------------------------------------------------------------------*/

	jQuery('.innerlistitem').hide();	

	var colorsArray = ['bg_teal','bg_red','bg_lightblue','bg_orange','bg_lightgreen','bg_purple',
		'bg_green','bg_lightpink','bg_amber','bg_brown','bg_indigo','bg_darkgray','bg_red','bg_darkorange',
		'bg_teal','bg_darkpurple','bg_cyan','bg_blue','bg_indigo','bg_red','bg_orange','bg_darkblue',
		'bg_purple','bg_pink','bg_blue','bg_bluegray','bg_amber','bg_lime',
		// Numbers colors
		'bg_brown','bg_red','bg_lightgreen','bg_lightpink','bg_amber','bg_green','bg_darkgray','bg_purple','bg_lightblue'];

	var characters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';

	jQuery('.listitem, .hover').each(function(){

		var circleLetter = jQuery(this).find('.listitem_title b').text();
		var span = jQuery(this).find('.listitem_img span');
		var firstChar = circleLetter.charAt(0).toUpperCase();

		span.text(firstChar);

		for( var i = 0; i <= characters.length; i++ ){
			if ( firstChar == characters[i] ){
				span.addClass(colorsArray[i]);
				break;
			}
		}

	});

//-------------------------------------------------------------------------------------

	jQuery('.block_containermsm .listitem, .block_containersettings .listitem').on('click', function(){
		var title = jQuery(this).attr('data-name');
		var img = jQuery(this).find('img').attr('src');
		if( jQuery(window).width() < 1120 ){
			jQuery('.block_containermsm, .block_containersettings').animate({ scrollLeft: jQuery('.halfgrid').width() });
			jQuery('#new_item').hide();
		}
		jQuery('.msmtopname label').text(title);
		jQuery('img#msm_userimg').attr('src' , img );
		changeLetterColor();
	});

	if( jQuery(window).width() >= 1120 ){
		jQuery('#listcontainer.left_listcontainer .listitem').first().trigger('click');
		jQuery('.block_containersettings .listitem').first().trigger('click');
	}

	function changeLetterColor(){
		jQuery('.msmtopname').each(function(){

			var circleLetter = jQuery(this).find('label').text();
			var div = jQuery(this).find('.letter');
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

	var listSortOrder = jQuery('#listcontainer');
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

	jQuery('#sort_alfa').click(function(){
		Sort.atribute = 'data-name';
		sortToggleClick();
	});

	

	jQuery('#sort_date').click(function(){
		Sort.atribute = 'data-date';
		sortToggleClick();
	});

	jQuery('#sort_subject').click(function(){
		Sort.atribute = 'data-type';
		sortToggleClick();
	});

/*-------------------------------------------------------------------------------------
		INPUT FILE
---------------------------------------------------------------------------------------*/

	jQuery('#trigger_fbutton').click(function(){
		jQuery('#attachedfile').trigger('click');
	});

	var origText = jQuery('#file_value').text();
	
	jQuery('#attachedfile').on('change' , function(){
		var fileValue = jQuery(this).val();
		jQuery('#file_value').text( fileValue );
		if( fileValue != ''){
			jQuery('#file_value').addClass('border_accentcolor');
		}
		else{
			jQuery('#file_value').removeClass('border_accentcolor');
			jQuery('#file_value').text(origText);
		}
	});


/*-------------------------------------------------------------------------------------
		SEARCH BAR
---------------------------------------------------------------------------------------*/

	jQuery('#buscar').keyup(function(){

		var currentQuery = jQuery('#buscar').val().toUpperCase();
		jQuery('#listcontainer .listitem').hide();
		jQuery('#listcontainer .no_result').html('<div class="pd_24">No hay resultados para: <b>"' + currentQuery + '"</b></div>');

		if(currentQuery != ''){
			jQuery('#listcontainer .listitem').each(function(){
				var currentKeyboard = jQuery(this).attr('data-name').toUpperCase();
				var currentKeyboard2 = jQuery(this).attr('data-type').toUpperCase();

				if( currentKeyboard.indexOf(currentQuery) >= 0 || currentKeyboard2.indexOf(currentQuery) >= 0 ){
					jQuery(this).show();
					jQuery('.no_result').html('');
				}
			});
		}
		else{
			jQuery('#listcontainer .listitem').show();
			jQuery('.no_result').html('');
		}

	});

	jQuery('#buscar_slide').keyup(function(){

		var currentQuery = jQuery('#buscar_slide').val().toUpperCase();
		jQuery('#listcontainer .slide_list').hide();
		jQuery('#listcontainer .no_result').html('<div class="pd_24">No hay resultados para: <b>"' + currentQuery + '"</b></div>');

		if(currentQuery != ''){
			jQuery('#listcontainer .slide_list').each(function(){
				var currentKeyboard = jQuery(this).attr('data-name').toUpperCase();
				var currentKeyboard2 = jQuery(this).attr('data-type').toUpperCase();

				if( currentKeyboard.indexOf(currentQuery) >= 0 || currentKeyboard2.indexOf(currentQuery) >= 0 ){
					jQuery(this).show();
					jQuery('.no_result').html('');
				}
			});
		}
		else{
			jQuery('#listcontainer .slide_list').show();
			jQuery('.no_result').html('');
		}

	});

	jQuery('#mgm_filter .h_listitem').on('click', function(){
		var type = jQuery(this).attr('data-filter');
		if (type != 'Todo'){
			jQuery('.managementlist .slide_list').hide();
			jQuery('.managementlist .slide_list[data-type="' + type + '"]').show();	
		}
		else{
			jQuery('.managementlist .slide_list').show();
		}
	});


});


jQuery(document).ready(function(){

/*-------------------------------------------------------------------------------------
		VERTICAL LIST CONTROL
---------------------------------------------------------------------------------------*/ 

	jQuery(document).on('click', '.listitem', function(){

		var slideD = jQuery(this).siblings('.innerlistitem');

		if(jQuery(this).siblings('.innerlistitem').css('display') == 'block'){
			jQuery(this).siblings('.innerlistitem').slideUp();
		}
		else{
			jQuery('.innerlistitem').slideUp();
			slideD.slideDown();
		}

	});


});

function ajaxDone(){

	jQuery('#management_showall').css('display','none');

		jQuery('.innerlistitem').hide();	

		var colorsArray = ['bg_teal','bg_red','bg_lightblue','bg_orange','bg_lightgreen','bg_purple',
			'bg_green','bg_lightpink','bg_amber','bg_brown','bg_indigo','bg_darkgray','bg_red','bg_darkorange',
			'bg_teal','bg_darkpurple','bg_cyan','bg_blue','bg_indigo','bg_red','bg_orange','bg_darkblue',
			'bg_purple','bg_pink','bg_blue','bg_bluegray','bg_amber','bg_lime',
			// Numbers colors
			'bg_brown','bg_red','bg_lightgreen','bg_lightpink','bg_amber','bg_green','bg_darkgray','bg_purple','bg_lightblue'];

		var characters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';

		jQuery('.listitem, .hover').each(function(){

			var circleLetter = jQuery(this).find('.listitem_title b').text();
			var span = jQuery(this).find('.listitem_img span');
			var firstChar = circleLetter.charAt(0).toUpperCase();

			span.text(firstChar);

			for( var i = 0; i <= characters.length; i++ ){
				if ( firstChar == characters[i] ){
					span.addClass(colorsArray[i]);
					break;
				}
			}

		});
}
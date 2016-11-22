jQuery(document).ready(function(){

    //console.log(window.location.href.split('/'));

    if(window.location.href.split('/').pop() == 'forum'){
        jQuery('#forumtopics_container .load_container').show();
        setTimeout(showForumTopics, 1000);
    }
    else{
        jQuery('#forumcomments_container .load_container').show();
        setTimeout(showComments, 1000);
    }

    jQuery('form#addNewForumComment textarea').focus(function(){
        jQuery(this).siblings('input[type="submit"]').show();
    });

    jQuery('.flat_input textarea').keyup(function(){
        var txt = jQuery(this).val();
        var sibl = jQuery(this).siblings('input[type="submit"]');
        if(txt != null && txt.trim() != ''){
            sibl.removeClass('opacity_color');
            sibl.addClass('txtprimary_color');
            sibl.removeAttr('disabled');
        }
        else{
            sibl.removeClass('txtprimary_color');
            sibl.addClass('opacity_color');
            sibl.attr('disabled','disabled');
        }
    });

    jQuery(document).ajaxComplete(function(){

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;//ENERO ES EL 0
        var yyyy = today.getFullYear();
        if( dd < 10 ){ dd = '0' + dd; }
        if( mm < 10 ){ mm = '0' + mm; }

        var yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        var ddYest = yesterday.getDate();
        var mmYest = yesterday.getMonth()+1;//ENERO ES EL 0
        var yyyyYest = yesterday.getFullYear();
        if( ddYest < 10 ){ ddYest = '0' + ddYest; }
        if( mmYest < 10 ){ mmYest = '0' + mmYest; }

        var stringDate = dd + '/' + mm + '/' + yyyy;
        var stringDateYest = ddYest + '/' + mmYest + '/' + yyyyYest;

        jQuery('.forum_comment .fc_zindex, .forum_repliescontainerinner .forum_reply').each(function(){
            var itemDate = jQuery(this).find('label.item_date').text();

            if( itemDate == stringDate ){
                jQuery(this).find('label.item_date').hide();
            }
            else if( itemDate == stringDateYest ){
                jQuery(this).find('label.item_date').text('Ayer');
            }
            else{
                jQuery(this).find('label.item_time').hide();
            }
        });

        jQuery('.forum_comment .flat_input textarea').keyup(function(){
            var txt = jQuery(this).val();
            var sibl = jQuery(this).siblings('input[type="submit"]');
            if(txt != null && txt.trim() != ''){
                sibl.removeClass('opacity_color');
                sibl.addClass('txtprimary_color');
                sibl.removeAttr('disabled');
            }
            else{
                sibl.removeClass('txtprimary_color');
                sibl.addClass('opacity_color');
                sibl.attr('disabled','disabled');
            }
        });

        var colorsArray = ['bg_teal','bg_red','bg_lightblue','bg_orange','bg_lightgreen','bg_purple',
            'bg_green','bg_lightpink','bg_amber','bg_brown','bg_indigo','bg_darkgray','bg_red','bg_darkorange',
            'bg_teal','bg_darkpurple','bg_cyan','bg_blue','bg_indigo','bg_red','bg_orange','bg_darkblue',
            'bg_purple','bg_pink','bg_blue','bg_bluegray','bg_amber','bg_lime',
            // Numbers colors
            'bg_brown','bg_red','bg_lightgreen','bg_lightpink','bg_amber','bg_green','bg_darkgray','bg_purple','bg_lightblue',
            // Sign colors
            'bg_darkpurple', 'bg_red'];

        var characters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789¿¡';

        jQuery('#forumtopics_container .block_list').each(function(){
            var circleLetter = jQuery(this).find('.forumtopic_title .listitem_bottomdata').text();
            var firstChar = circleLetter.charAt(0).toUpperCase();

            for( var i = 0; i <= characters.length; i++ ){
                if ( firstChar == characters[i] ){
                    jQuery(this).find('.b_img').addClass(colorsArray[i]);
                    break;
                }
            }

        });

    });

});


function showForumTopics(){
    jQuery.ajax({
        method: 'GET',
        url: '/api/forum',
        cache: true,
        success: function(data) {
            if(data.length > 0){
                jQuery('#forumtopics_container').html(data);
            }
            else{
                jQuery('#forumtopics_container')
                    .html('<div class="block_container bg_white colhh1 empty_blocktext center_text">'
                        +  '<div class="pd_64">'
                        +    '<span style="background-image: url(&quot;/images/close-box.png&quot;)" class="v_middle"></span>'
                        +    '<div class="autocol mm_title pd_12">Aun no hay temas de conversación.</div>'
                        +    '<div class="ll_title normal_txt">Presiona &nbsp; + &nbsp; para crear un nuevo tema de conversación.</div>'
                        +  '</div>'
                        +'</div>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ' ' + errorThrown);
        }
        
    });
}

function showComments(){
    jQuery.ajax({
        method: 'GET',
        url: '/api/forum/' + window.location.href.split('/').pop(),
        cache: true,
        success: function(data) {
            if(data.length > 0){
                jQuery('#forum_commentscontainer').html(data);
                replies();
                likeForumComment();
            }
            else{
                jQuery('#forum_commentscontainer')
                    .html('<div class="block_container bg_white colhh1 empty_blocktext center_text">'
                        +  '<div class="pd_64">'
                        +    '<span style="background-image: url(&quot;/images/close-box.png&quot;)" class="v_middle"></span>'
                        +    '<div class="autocol mm_title pd_12">Aun no hay comentarios en este Tema.</div>'
                        +    '<div class="ll_title normal_txt">Añade un comentario</div>'
                        +  '</div>'
                        +'</div>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ' ' + errorThrown);
        }
        
    });
}

function showReplies(container, id_comment){
    jQuery.ajax({
        method: 'GET',
        url: '/api/forum/' + window.location.href.split('/')[4] + '/' + id_comment,
        cache: true,
        success: function(data) {
            if(data.length > 0){
                container.html(data);
                likeForumCommentReply();
            }
            else{
                container
                    .html('<div class="pd_24 center_text">'
                        +    '<div class="ll_title opacity_color">Aun no hay respuestas</div>'
                        +  '</div>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ' ' + errorThrown);
        }
        
    });
}

function replies(){
    jQuery('.hiddenreplyblock').hide();

    jQuery('.showhiddenreply').one('click', function(){
        var container = jQuery(this).parents('.block_container.forum_comment').find('.hiddenreplyblock').find('.forum_repliescontainerinner');
        var id_comment = jQuery(this).parents('.block_container.forum_comment').find('.hiddenreplyblock').find('input[type="hidden"]').val();
        jQuery(this).parents('.block_container.forum_comment').find('.hiddenreplyblock').slideDown();
        showReplies(container, id_comment);
    });

    jQuery('form.reply_form').submit(function(event){
        event.preventDefault();
        var data = jQuery(this).serialize();
        //insertReply(data);
    });
}

// Funcion para dar like o dislike a un comentario o quitarlos
function likeForumComment(){
    //Esta funcion hace que cambie el color al dar like o dislike
    jQuery('.comment_action [put-status]').click(function(){
        var id = jQuery(this).parents('.forum_comment').attr('data-id');
        var status = jQuery(this).attr('put-status');
        var lastClass = jQuery(this).attr('class').split(' ')[2];

        // lastClass me dice que accion voy a realizar y se cambia el put-status 
        // para mandar un valor diferente al proximo click
        if(lastClass == 'like'){
            jQuery(this).removeClass('like').addClass('like_active').attr('put-status', '2');
            jQuery(this).siblings('.dislike_active')
                .removeClass('dislike_active').addClass('dislike').attr('put-status', '0');
        }
        if(lastClass == 'like_active'){
            jQuery(this).removeClass('like_active').addClass('like').attr('put-status', '1');
            jQuery(this).siblings('.dislike_active')
                .removeClass('dislike_active').addClass('dislike').attr('put-status', '0');
        }
        if(lastClass == 'dislike'){
            jQuery(this).removeClass('dislike').addClass('dislike_active').attr('put-status', '2');
            jQuery(this).siblings('.like_active')
                .removeClass('like_active').addClass('like').attr('put-status', '1');
        }
        if(lastClass == 'dislike_active'){
            jQuery(this).removeClass('dislike_active').addClass('dislike').attr('put-status', '0');
            jQuery(this).siblings('.like_active')
                .removeClass('like_active').addClass('like').attr('put-status', '1');
        }

        jQuery.ajax({
            method: 'POST',
            url: '/api/forum/' + window.location.href.split('/')[4] + '/' + id + '/like',
            cache: true,
            data: {
                likeStatus: status
            },
            success: function(data) {

            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error en Cliente ' + textStatus + " " + errorThrown);
            }
        });

    });
}

// Funcion para dar like o dislike a una respuesta o quitarlo
function likeForumCommentReply(){

    jQuery('.reply_action [put-status]').click(function(){
        var id = jQuery(this).parents('.forum_reply').attr('data-id');
        var id_comment = jQuery(this).parents('.forum_comment').attr('data-id');
        var status = jQuery(this).attr('put-status');
        var lastClass = jQuery(this).attr('class').split(' ')[1];

        // lastClass me dice que accion voy a realizar y se cambia el put-status 
        // para mandar un valor diferente al proximo click
        if(lastClass == 'bg_like'){
            jQuery(this).removeClass('bg_like').addClass('bg_likeactive').attr('put-status', '2');
            jQuery(this).siblings('.bg_dislikeactive')
                .removeClass('bg_dislikeactive').addClass('bg_dislike').attr('put-status', '0');
        }
        if(lastClass == 'bg_likeactive'){
            jQuery(this).removeClass('bg_likeactive').addClass('bg_like').attr('put-status', '1');
            jQuery(this).siblings('.bg_dislikeactive')
                .removeClass('bg_dislikeactive').addClass('bg_dislike').attr('put-status', '0');
        }
        if(lastClass == 'bg_dislike'){
            jQuery(this).removeClass('bg_dislike').addClass('bg_dislikeactive').attr('put-status', '2');
            jQuery(this).siblings('.bg_likeactive')
                .removeClass('bg_likeactive').addClass('bg_like').attr('put-status', '1');
        }
        if(lastClass == 'bg_dislikeactive'){
            jQuery(this).removeClass('bg_dislikeactive').addClass('bg_dislike').attr('put-status', '0');
            jQuery(this).siblings('.bg_likeactive')
                .removeClass('bg_likeactive').addClass('bg_like').attr('put-status', '1');
        }

        /*jQuery.ajax({
            method: 'POST',
            url: '/api/forum/' + window.location.href.split('/')[4] + '/' + id_comment + '/' + id + '/like',
            cache: true,
            data: {
                likeStatus: status
            },
            success: function(data) {
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error en Cliente ' + textStatus + " " + errorThrown);
            }
        });*/

    });
}
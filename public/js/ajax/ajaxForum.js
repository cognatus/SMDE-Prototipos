jQuery(document).ready(function(){

    jQuery('#forumtopic_display').hide();

    jQuery('#forumtopics_container .load_container').show();

    setTimeout(showForumTopics, 1000);

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

        jQuery('#forumtopics_container .block_list .block_container').click(function(){
            var container = jQuery(this).html();
            var forumTopicId = jQuery(this).parents('.block_list').attr('data-id');
            var url = jQuery(this).parents('.block_list').attr('data-link');
            /*jQuery('#selectedForumTopic').html(cloned);
            jQuery('#forumtopics_container').hide();
            jQuery('#forumtopic_display').show();
            jQuery('#forumTopicScope').val(forumTopicId);*/

            selectForumTopic(forumTopicId, container);

        });

        jQuery('#forumtopic_display #back_forum').click(function(){
            jQuery('#forumtopic_display').hide();
            jQuery('#forumtopics_container').show();
        });

        jQuery('.forum_comment .showhiddenreply').one('click' , function(){
            var container = jQuery(this).parents('.forum_comment').find('.forum_repliescontainerinner');
            var commentId = jQuery(this).parents('.forum_comment').attr('data-id');
            showCommentReplies(container, commentId);
        });

        hideElements();

        jQuery('.forum_comment form.reply_form').submit(function(event){
            event.preventDefault();
            var container = jQuery(this).parents('.forum_comment').find('.forum_repliescontainerinner');
            var commentId = jQuery(this).find('input[type="hidden"]').val();
            var replyData = jQuery(this).serialize();
            insertCommentReply(replyData, container, commentId);
        });

    });

});

function hideElements(){
    jQuery('#forum_commentscontainer .hiddenreplyblock').hide();
     jQuery('#forum_commentscontainer .forum_comment input[type="submit"]').hide();

    jQuery('#forum_commentscontainer .showhiddenreply').click(function(){
        jQuery(this).parents('.block_container.forum_comment').find('.hiddenreplyblock').slideDown();
    });

    jQuery('.forum_comment .showhiddenreply').click(function(){
        jQuery('.forum_comment .hiddenreplyblock').hide();
        jQuery(this).parents('.forum_comment').find('.hiddenreplyblock').show();
    });

    jQuery('.forum_comment .showhiddenreply.focusinput').click(function(){
        jQuery(this).parents('.forum_comment').find('textarea').focus();
    });

    jQuery('.forum_comment .reply_form textarea').focus(function(){
        jQuery(this).siblings('input[type="submit"]').show();
    });

    jQuery('.forum_comment .reply_form textarea').blur(function(){
        jQuery(this).parents('.flat_input').removeClass('border_t border_primarycolor');
    });

    jQuery('.forum_comment .comment_action .put_status').click(function(){
        var likeStatus = jQuery(this).attr('data-action');
        var commentId = jQuery(this).parents('.forum_comment').attr('data-id');
        if(likeStatus == 'like'){
            jQuery(this)
                .attr('data-action', 'quit-like')
                .removeClass('opacity_color')
                .addClass('txtprimary_color');
            jQuery(this).find('span.v_middle')
                .removeClass('bg_like')
                .addClass('bg_likeactive');
            jQuery(this).siblings('.put_status[data-action="quit-dislike"]')
                .attr('data-action', 'dislike')
                .removeClass('txt_red')
                .addClass('opacity_color');
            jQuery(this).siblings('.put_status[data-action="quit-dislike"]').find('span.v_middle')
                .removeClass('bg_dislikeactive')
                .addClass('bg_dislike');
        }
        else if(likeStatus == 'dislike'){
             jQuery(this)
                .attr('data-action', 'quit-dislike')
                .removeClass('opacity_color')
                .addClass('txt_red');
            jQuery(this).find('span.v_middle')
                .removeClass('bg_dislike')
                .addClass('bg_dislikeactive');
            jQuery(this).siblings('.put_status[data-action="quit-like"]')
                .attr('data-action', 'like')
                .removeClass('txtprimary_color')
                .addClass('opacity_color');
            jQuery(this).siblings('.put_status[data-action="quit-like"]').find('span.v_middle')
                .removeClass('bg_likeactive')
                .addClass('bg_like');
        }
        else if(likeStatus == 'quit-like'){
            jQuery(this).attr('data-action', 'like').removeClass('txtprimary_color').addClass('opacity_color');
            jQuery(this).find('span.v_middle').removeClass('bg_likeactive').addClass('bg_like');
        }
        else if(likeStatus == 'quit-dislike'){
            jQuery(this).attr('data-action', 'dislike').removeClass('txt_red').addClass('opacity_color');
            jQuery(this).find('span.v_middle').removeClass('bg_dislikeactive').addClass('bg_dislike');
        }
        if(likeStatus != null){
            likeForumComment(likeStatus, commentId);
        }
    });

}

function showForumTopics(){
    jQuery.ajax({
        method: 'GET',
        url: 'getForumTopics',
        cache: true,
        success: function(data) {
            if(data.length > 0){
                jQuery('#forumtopics_container').html(data);
            }
            else{
                jQuery('#forumtopics_container')
                    .html('<div class="block_container bg_white colhh1 empty_blocktext center_text">'
                        +  '<div class="pd_64">'
                        +    '<span style="background-image: url(&quot;images/close-box.png&quot;)" class="v_middle"></span>'
                        +    '<div class="autocol mm_title pd_12">Aun no hay temas de conversación.</div>'
                        +    '<div class="ll_title normal_txt">Presiona &nbsp; + &nbsp; para crear un nuevo tema de conversación.</div>'
                        +  '</div>'
                        +'</div>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}

/*function selectForumTopic(forumTopicId, container){
    jQuery.ajax({
        method: 'GET',
        url: 'getForumTopicCommentsCron',
        cache: true,
        data: {
            forumTopicSelectedId: forumTopicId,
            containerHtmlData: container
        },
        success: function(data) {
            if(data.length > 0){
                jQuery('#forum_commentscontainer').html(data);

            }
            else{
                jQuery('#forum_commentscontainer')
                    .html('<div class="block_container bg_white colhh1 empty_blocktext center_text">'
                        +  '<div class="pd_64">'
                        +    '<span style="background-image: url(&quot;images/close-box.png&quot;)" class="v_middle"></span>'
                        +    '<div class="autocol mm_title pd_12">Aun no hay comentarios en este Tema.</div>'
                        +    '<div class="ll_title normal_txt">Añade un comentario</div>'
                        +  '</div>'
                        +'</div>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}*/

function selectForumTopic(forumTopicId){
    
    var urlLoad = forumTopicId;

    if (urlLoad != undefined && urlLoad != null) {
        window.location.href = '/forumtopic/' + forumTopicId;
    }

}

function showCommentReplies(container, commentId){
    container.parents('.forum_comment').find('form.reply_form textarea').val('');
    container.parents('.forum_comment').find('form.reply_form input[type="submit"]')
        .attr('disabled', 'disabled')
        .addClass('opacity_color').removeClass('txtprimary_color');
    jQuery.ajax({
        method: 'GET',
        url: 'getForumTopicCommentReplies',
        cache: true,
        data: {
            forumCommentId: commentId
        },
        success: function(data) {
            if(data.length > 0){
                container.html(data);
                container.parents('.forum_repliescontainer').scrollTop(container.outerHeight());
                jQuery('.forum_reply .reply_action span').click(function(){
                    var likeStatus = jQuery(this).attr('data-action');
                    var replyId = jQuery(this).parents('.forum_reply').attr('data-id');
                    if(likeStatus == 'like'){
                        jQuery(this)
                            .attr('data-action', 'quit-like')
                            .removeClass('bg_like')
                            .addClass('bg_likeactive');
                        jQuery(this).siblings('span[data-action="quit-dislike"]')
                            .attr('data-action', 'dislike')
                            .removeClass('bg_dislikeactive')
                            .addClass('bg_dislike');
                    }
                    else if(likeStatus == 'dislike'){
                        jQuery(this)
                            .attr('data-action', 'quit-dislike')
                            .removeClass('bg_dislike')
                            .addClass('bg_dislikeactive');
                        jQuery(this).siblings('span[data-action="quit-like"]')
                            .attr('data-action' , 'like')
                            .removeClass('bg_likeactive')
                            .addClass('bg_like');
                    }
                    else if(likeStatus == 'quit-like'){
                        jQuery(this).attr('data-action', 'like').removeClass('bg_likeactive').addClass('bg_like');
                    }
                    else if(likeStatus == 'quit-dislike'){
                        jQuery(this).attr('data-action', 'dislike').removeClass('bg_dislikeactive').addClass('bg_dislike');
                    }
                    if(likeStatus != null){
                        likeForumCommentReply(likeStatus, replyId);
                    }
                });
            }
            else{
                container
                    .html('<div class="pd_18 ll_title opacity_color">'
                            + 'Aun no hay respuestas para este comentario.'
                            + '<br /><br />Añade una respuesta aqui abajo.'
                        +'</div>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function insertCommentReply(replyData, container, commentId){
    jQuery.ajax({
        method: 'POST',
        url: 'insertForumTopicCommentReply',
        cache: true,
        data: replyData,
        success: function(data) {
            showCommentReplies(container, commentId);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error en Cliente ' + textStatus + " " + errorThrown);
        }
        
    });
}

function likeForumComment(likeStatus, forumCommentId){
    jQuery.ajax({
        method: 'POST',
        url: 'likeForumComment',
        cache: true,
        data: {
            forumCommentId: forumCommentId,
            likeStatus: likeStatus
        },
        success: function(data) {

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error en Cliente ' + textStatus + " " + errorThrown);
        }
    });
}

function likeForumCommentReply(likeStatus, forumReplyId){
    jQuery.ajax({
        method: 'POST',
        url: 'likeForumCommentReply',
        cache: true,
        data: {
            forumReplyId: forumReplyId,
            likeStatus: likeStatus
        },
        success: function(data) {
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error en Cliente ' + textStatus + " " + errorThrown);
        }
    });
}
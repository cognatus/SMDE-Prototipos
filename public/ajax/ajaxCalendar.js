
jQuery(document).ready(function(){
        
    showReminders();
    showPublications();
    showSubjectsCourses();

    jQuery(document).ajaxComplete(function(){
        //OBTENER EL DIA ACTUAL PARA CAMBIAR LOS TEXTOS EN lA PARTE DERECHA DE LOS MENSAJES
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

        jQuery('.listcontainer .list_leftitem').each(function(){
            var itemDate = jQuery(this).find('label.item_date').text();

            if( itemDate == stringDate ){
                jQuery(this).find('label.item_date').hide();
            }
            else if( itemDate == stringDateYest ){
                jQuery(this).find('label.item_date').text('Ayer');
                jQuery(this).find('label.item_time').hide();   
            }
            else{
                jQuery(this).find('label.item_time').hide();   
            }
        });

    });

    jQuery('#showCourseToPost').hide();

    jQuery('#selectCalendarPostType').on('change', function(){
        var thisVal = jQuery(this).val();
        if (thisVal == 'reminder'){
            jQuery('form#calendarAddNew').attr('action', 'insertReminder');
            jQuery('#showCourseToPost').hide();
        }
        if (thisVal == 'publication'){
            jQuery('form#calendarAddNew').attr('action', 'insertPublication');
            jQuery('#showCourseToPost').fadeIn();
        }

    });

    if(sessionUserType != 3){
        jQuery('.calendar_postcontainer[data-type="Recordatorio"]').hide();
    }

    jQuery('.cal_showtype').click(function(){
        //Cambiar el estilo para saber cual esta mostrando
        jQuery('.cal_showtype').find('.pd_16').removeClass('bg_opc');
        jQuery(this).find('.pd_16').addClass('bg_opc');

        //Mostrar los del mismo tipo
        var type = jQuery(this).attr('data-show');
        jQuery('.calendar_postcontainer').fadeOut();
        jQuery('.calendar_postcontainer[data-type="' + type + '"]').fadeIn();
        
    });

});

function showReminders(){
    stringDataReminders = '';
    jQuery.ajax({
        method: 'GET',
        url: 'getRemindersDatabase',
        cache: true,
        success: function(data) {
            for(var i in data){
                var item = data[i];
                stringDataReminders += '<div data-name="' + item.reminderTitle + '" data-date="' + item.reminderLimDate + '" data-datepost="' + item.reminderDate + '" class="colhh1 block_container bg_white cal_post">'
                                    +    '<div style="padding-top: 2px;margin-bottom: 16px;" class="colhh1 list_leftitem">'
                                    +      '<div class="listitem_img"><span>A</span></div>'
                                    +      '<div class="listitem_info">'
                                    +        '<div title=" Publicado el ' + item.reminderDate + ' a las ' + item.reminderTime + '" class="listitem_rightinfo">'
                                    +          '<label class="item_date">' + item.reminderDate + '</label>'
                                    +          '<label class="item_time">&nbsp;' + item.reminderTime + '</label>'
                                    +        '</div>'
                                    +        '<div class="listitem_title"> <b>' + item.reminderTitle + '</b></div>'
                                    +        '<div class="listitem_bottomdata">Recordatorio</div>'
                                    +      '</div>'
                                    +    '</div>'
                                    +    '<div class="pd_lr8">'
                                    +      '<div class="pd_llist">'
                                    +        '<div class="sl_title">Fecha Límite: <span class="margin_l normal_txt">' + item.reminderLimDate + ' a las ' + item.reminderLimTime + '</span></div>'
                                    +        '<div class="pd_8 border_bottom"></div>'
                                    +      '</div>'
                                    +      '<div class="pd_llist">'
                                    +        '<div class="pd_4"></div>'
                                    +        '<div class="sl_title">Comentarios</div>'
                                    +        '<div class="pd_16 justify_text breakword">' + item.reminderText + '</div>'
                                    +      '</div>'
                                    +    '</div>'
                                    +    '<div class="pd10_16 listitemactions bg_lightgray">'
                                    +      '<div class="autocol right_float">'
                                    +        '<span title="Editar" class="circle bg_editgray hover"></span>'
                                    +        '<span title="Eliminar" class="circle bg_delete hover"></span></div>'
                                    +    '</div>'
                                    +  '</div>';
            }

            jQuery('#remindlist_container').html(stringDataReminders);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showPublications(){
    stringDataPublic = '';
    jQuery.ajax({
        method: 'GET',
        url: 'getPublicationsDatabase',
        cache: true,
        success: function(data) {
            for(var i in data){
                var item = data[i];

                stringDataPublic += '<div data-name="' + item.pubTitle + '" data-date="' + item.pubLimDate + '" data-datepost="' + item.pubDate + '" class="colhh1 block_container bg_white cal_post">'
                                 +     '<div style="padding-top: 2px;margin-bottom: 16px;" class="colhh1 list_leftitem">'
                                 +       '<div class="listitem_img"><img src="images/profilephoto.png" title="' + item.userEmail + '"/></div>'
                                 +       '<div class="listitem_info">'
                                 +         '<div title=" Publicado el ' + item.pubDate + ' a las ' + item.pubTime + '" class="listitem_rightinfo">'
                                 +           '<label class="item_date">' + item.pubDate + '</label>'
                                 +           '<label class="item_time">&nbsp;' + item.pubTime + '</label>'
                                 +         '</div>'
                                 +         '<div title="' + item.userEmail + '" class="listitem_title"> <b>' + item.userName + ' ' + item.userLastName + ' ' + item.userSecondLastName + '</b></div>'
                                 +         '<div class="listitem_bottomdata">' + item.pubTitle + '</div>'
                                 +       '</div>'
                                 +     '</div>'
                                 +     '<div class="pd_lr8">'
                                 +       '<div class="pd_llist">'
                                 +         '<div class="sl_title">Asunto: <span class="margin_l normal_txt">' + item.pubTitle + '</span></div>'
                                 +         '<div class="pd_4"></div>'
                                 +         '<div class="sl_title">Asignatura: <span class="margin_l normal_txt">' + item.subjectName + '</span></div>'
                                 +         '<div class="pd_4"></div>'
                                 +         '<div class="sl_title">Grupo: <span class="margin_l normal_txt">' + item.courseName + '</span></div>'
                                 +         '<div class="pd_4"></div>'
                                 +         '<div class="sl_title">Entrega: <span class="margin_l normal_txt">' + item.pubLimDate + ' a las ' + item.pubLimTime + '</span></div>'
                                 +         '<div class="pd_12 border_bottom"></div>'
                                 +       '</div>'
                                 +       '<div class="pd_llist">'
                                 +         '<div class="pd_4"></div>'
                                 +         '<div class="sl_title">Comentarios</div>'
                                 +         '<div class="pd_16 justify_text breakword">' + item.pubText
                                 +           '<div class="pd_4"></div>'
                                 +         '</div>'
                                 +       '</div>'
                                 if(item.attached_filecontainer != null){
                                     stringDataPublic += '<div class="pd_llist">'
                                                      +     '<div class="pd_4"></div>'
                                                      +     '<div class="sl_title">Archivos Adjuntos</div>'
                                                      +     '<div class="pd_4"></div>'
                                                      + '</div>'
                                                      + '<div style="margin-bottom: 18px;" class="attached_filecontainer autooverflow pd_lr8">'
                                                      +     '<span class="v_middle bg_file bg_blue borad"></span>'
                                                      +     '<div class="v_middle sl_title opacity_color">' + item.publicationAttachedNameFile + '</div>'
                                                      +     '<span title="Descargar" class="right_float bg_download hover"></span>'
                                                      + '</div>'
                                    }
                stringDataPublic += '</div>'   
                                 +  '<div class="pd10_16 listitemactions bg_lightgray">'
                                    if(sessionUserType == 1){
                                        stringDataPublic += '<div class="autocol right_float">'
                                                         +    '<span title="Responder" class="circle bg_reply hover"></span>'
                                    }
                                    if(sessionUserType == 2){
                                        stringDataPublic += '<div style="margin-top: 11px;" class="autocol txtprimary_color sl_title underline">Mostrar Respuestas</div>'
                                                         +    '<div class="autocol right_float">'

                                        if(sessionUser == item.userEmail){
                                            stringDataPublic += '<span title="Editar" class="circle bg_editgray hover"></span>'
                                                             +  '<span title="Eliminar" class="circle bg_delete hover"></span>'
                                        }
                                    }

                stringDataPublic +=       '</div>'
                                 +     '</div>'
                                 +   '</div>';
            }

            jQuery('#publiclist_container').html(stringDataPublic);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showSubjectsCourses(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileSubjectsDatabase',
        cache: true,
        success: function(data) {
            jQuery('#showSubjectsCourses').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}
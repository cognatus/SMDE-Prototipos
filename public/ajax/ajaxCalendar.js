
jQuery(document).ready(function(){
        
    showReminders();
    showPublications();
    showSubjectsCourses();

    jQuery('#selectCalendarPostType').on('change', function(){
        var thisVal = jQuery(this).val();
        if (thisVal == 'reminder'){
            jQuery('form#calendarAddNew').attr('action', 'insertReminder');
        }
        if (thisVal == 'publication'){
            jQuery('form#calendarAddNew').attr('action', 'insertPublication');
        } 

    });

});

function showReminders(){
    jQuery.ajax({
        method: 'GET',
        url: 'getRemindersDatabase',
        cache: false,
        success: function(data) {
            jQuery('#calendar_list').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showPublications(){
    jQuery.ajax({
        method: 'GET',
        url: 'getPublicationsDatabase',
        cache: false,
        success: function(data) {
            jQuery('#calendar_list').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showPublicationsByDate(selectedDate){
    jQuery.ajax({
        method: 'GET',
        url: 'getPublicationsDatabaseByDate',
        cache: false,
        data: {
            selectedDate: selectedDate
        },
        success: function(data) {
            for(var i in data){
                var item = data[i];
                jQuery('#showByDate')
                .append('<div data-name="' + item.pubTitle + '" data-type="Publicación" class="colhh1 slide_list">'
                +     '<div data-rippleria="" class="colhh1 listitem_cal hover rippleria-dark">'
                +         '<div class="listitem_img">'
                +             '<span>A</span>'
                +         '</div>'
                +         '<div class="listitem_info">'
                +             '<div class="listitem_rightinfo">'
                +                 item.pubDate + ' ' + item.pubTime
                +             '</div>'
                +             '<div class="listitem_title">'
                +                 '<b>' + item.pubTitle + '</b>'
                +             '</div>'
                +             '<div class="listitem_bottomdata">'
                +                 'Publicación'
                +             '</div>'
                +         '</div>'
                +     '</div>'
                +     '<div class="colhh1 innerlistitem_cal">'
                +         '<div class="colhh1 border_bottom">'
                +             '<div class="list_borderleft">'
                +                 '<div class="pd_llist">'
                +                     '<div class="sl_title">'
                +                         'De: <span title="' + item.userEmail + '" class="margin_l normal_txt">' + item.userName + ' ' + item.userLastName + ' ' + item.userSecondLastName + '</span>'
                +                     '</div>'
                +                     '<div class="pd_4"></div>'
                +                     '<div class="sl_title">'
                +                         'Asignatura: <span class="margin_l normal_txt">' + item.subjectName + '</span>'
                +                     '</div>'
                +                     '<div class="pd_4"></div>'
                +                     '<div class="sl_title">'
                +                         'Grupo: <span class="margin_l normal_txt">' + item.courseName + '</span>'
                +                     '</div>'
                +                     '<div class="pd_4"></div>'
                +                     '<div class="sl_title">'
                +                         'Entrega: <span class="margin_l normal_txt">' + item.pubLimDate + '</span>'
                +                     '</div>'
                +                     '<div class="pd_8 border_bottom"></div>'
                +                 '</div>'
                +                 '<div class="pd_llist">'
                +                     '<div class="sl_title">Comentarios</div>'
                +                     '<div class="pd_16 justify_text breakword border_bottom">' + item.pubText + '</div>'
                +                 '</div>'
                +                 '<div class="pd_llist">'
                +                   '<div class="sl_title">Archivos Adjuntos</div>'
                +                 '</div>'
                +                 '<div class="attached_filecontainer autooverflow pd_lr8">'
                +                     '<span class="v_middle bg_file bg_blue borad"></span>'
                +                     '<div class="v_middle sl_title opacity_color">' + item.publicationAttachedNameFile + '</div>'
                +                     '<span data-rippleria="" title="Descargar" class="right_float bg_download hover rippleria-dark"></span>'
                +                 '</div>'
                +             '</div>'
                +             '<div class="pd_18 listitemactions autooverflow">'
                +                 '<span title="Eliminar" class="circle right_float bg_delete hover"></span>'
                +                 '<span title="Archivar" class="circle right_float bg_archive hover"></span>'
                +             '</div>'
                +         '</div>'
                +     '</div>'
                + '</div>');
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showRemindersByDate(selectedDate){
    jQuery.ajax({
        method: 'GET',
        url: 'getRemindersDatabaseByDate',
        cache: false,
        data: {
            selectedDate: selectedDate
        },
        success: function(data) {
            for(var i in data){
                var item = data[i];
                jQuery('#showByDate')
                .append('<div data-name="' + item.reminderTitle + '" data-type="Recordatorio" class="colhh1 slide_list">'
                +     '<div data-rippleria="" class="colhh1 listitem_cal hover rippleria-dark">'
                +         '<div class="listitem_img">'
                +             '<span>A</span>'
                +         '</div>'
                +         '<div class="listitem_info">'
                +             '<div class="listitem_rightinfo">'
                +                 item.reminderDate + ' ' + item.reminderTime
                +             '</div>'
                +             '<div class="listitem_title">'
                +                 '<b>' + item.reminderTitle + '</b>'
                +             '</div>'
                +             '<div class="listitem_bottomdata">'
                +                 'Recordatorio'
                +             '</div>'
                +         '</div>'
                +     '</div>'
                +     '<div class="colhh1 innerlistitem_cal">'
                +         '<div class="colhh1 border_bottom">'
                +             '<div class="list_borderleft">'
                +                 '<div class="pd_llist">'
                +                     '<div class="sl_title">'
                +                         'Fecha Límite: <span class="margin_l normal_txt">' + item.reminderLimDate + '</span>'
                +                     '</div>'
                +                     '<div class="pd_8 border_bottom"></div>'
                +                 '</div>'
                +                 '<div class="pd_llist">'
                +                     '<div class="sl_title">Comentarios</div>'
                +                     '<div class="pd_16 justify_text breakword">' + item.reminderText + '</div>'
                +                 '</div>'
                +             '</div>'
                +             '<div class="pd_18 listitemactions autooverflow">'
                +                 '<span title="Eliminar" class="circle right_float bg_delete hover"></span>'
                +                 '<span title="Archivar" class="circle right_float bg_archive hover"></span>'
                +                 '<span title="Editar" class="circle right_float bg_editgray hover"></span>'                
                +             '</div>'
                +         '</div>'
                +     '</div>'
                + '</div>');
            }
            
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
        cache: false,
        success: function(data) {
            jQuery('#showSubjectsCourses').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}
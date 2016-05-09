
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
            jQuery('#remindlist_container').html(data);
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
        cache: true,
        success: function(data) {
            jQuery('#publiclist_container').html(data);
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
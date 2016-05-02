
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
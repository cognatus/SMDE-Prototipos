
jQuery(document).ready(function(){
        
    showReminders();
    showPublications();
    if(sessionUserType == 2){
        showSubjectsCourses();
    }

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
            }
            else{
                jQuery(this).find('label.item_time').hide();   
            }
        });

    });

    jQuery('#showCourseToPost, #showAttFiles').hide();

    jQuery('#selectCalendarPostType').on('change', function(){
        var thisVal = jQuery(this).val();
        if (thisVal == 'reminder'){
            jQuery('form#calendarAddNew').attr('action', 'insertReminder');
            jQuery('#showCourseToPost, #showAttFiles').hide();
        }
        if (thisVal == 'publication'){
            jQuery('form#calendarAddNew').attr('action', 'insertPublication');
            jQuery('#showCourseToPost, #showAttFiles').fadeIn();
        }
    });

/*    jQuery('#showCoursesPost').on('change', function(){
        alert(jQuery(this).val());
    });*/

    jQuery('.cal_showtype').click(function(){
        //Cambiar el estilo para saber cual esta mostrando
        jQuery('.cal_showtype').find('.pd16_24').removeClass('bgaccent_color white_text');
        jQuery(this).find('.pd16_24').addClass('bgaccent_color');
        
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

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.block_container.cal_post .hidecontent_button').one('click' ,function(){

                var button = jQuery(this);
                var container = jQuery(this).siblings('.attached_filecontainer');
                var idPub = button.attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getPublicationAttachedFiles',
                    cache: true,
                    data: {
                        idPublication: idPub
                    },
                    success: function(data2) {
                        button.hide();
                        if(data2.length > 0){
                            container.append(data2);
                        }
                        else{
                            container.append('<div class="pd_lr18 opacity_color b_text"><div class="pd_4"></div>Sin archivos adjuntos<div class="pd_4"></div></div>');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + textStatus + " " + errorThrown);
                    }  
                });

            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showSubjectsCourses(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileSubjectsDatabaseCalendar',
        cache: true,
        success: function(data) {
            jQuery('#showCoursesPost').html(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function changeFilesColor(){
    var fileName = '';
    var fileIcon = '';

}

function downloadAttachment(file){
    /*alert('Archivo: ' + file);
    jQuery.ajax({
        method: 'GET',
        url: 'downloadAttachment',
        cache: false,
        data: {
            file: file
        },
        success: function(data) {
            console.log('Success');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });*/
}
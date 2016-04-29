
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
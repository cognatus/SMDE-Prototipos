
jQuery(document).ready(function(){
        
    showContactsStudents();
    showProfileSubjects();

});

function showContactsStudents(){
	jQuery.ajax({
        method: 'POST',
        url: '/getProfileContactsStudents',
        cache: false,
        success: function(data) {
            jQuery('.managementlist').append(data);
            ajaxDone();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showProfileSubjects(){
    jQuery.ajax({
        method: 'POST',
        url: '/getProfileSubjectsDatabase',
        cache: false,
        success: function(data) {
            jQuery('.managementlist').append(data);
            ajaxDone();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}
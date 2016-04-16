
jQuery(document).ready(function(){
        
    showContactsStudents();
    showProfileSubjects();

});

function showContactsStudents(){
	jQuery.ajax({
        method: 'GET',
        url: '/getProfileContactsStudents',
        cache: false,
        timeout: 5000,
        success: function(data) {
            jQuery('#contacts_list').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showProfileSubjects(){
    jQuery.ajax({
        method: 'GET',
        url: '/getProfileSubjectsDatabase',
        cache: false,
        timeout: 5000,
        success: function(data) {
            jQuery('#subjects_list').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}
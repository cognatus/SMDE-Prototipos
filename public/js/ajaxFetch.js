
jQuery(document).ready(function(){
    showAdmins();
    showStudents();

    jQuery('.slide_list.student').on('click', function(){
        var studentEmail = jQuery(this).find('.stsbid').attr('data-id');
        showStudentSubjects(studentEmail);
    });

});

function showAdmins(){
	jQuery.ajax({
        method: 'POST',
        url: '/getAdministratorsDatabase',
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

function showStudents(){
    jQuery.ajax({
        method: 'POST',
        url: '/getStudentsDatabase',
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

function showTeachers(){
    jQuery.ajax({
        method: 'POST',
        url: '/getTeachersDatabase',
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

function showStudentSubjects(studentEmail){
     jQuery.ajax({
        method: 'POST',
        url: '/getStudentsSubjectsDatabase',
        cache: false,
        data: {
            studentEmail : studentEmail
        },
        success: function(subData) {
            jQuery('.studentsubjects_list').append(subData);
            ajaxDone();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}
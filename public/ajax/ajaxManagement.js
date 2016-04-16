
jQuery(document).ready(function(){
    showAdmins();
    showStudents();
    showTeachers();
    showSubjects();
    showDepartments();
    showCourses();

    jQuery('.student').click(function(){
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

    var parameters = { studentEmail: studentEmail }

    jQuery.ajax({
        method: 'POST',
        url: '/getStudentsSubjectsDatabase',
        cache: false,
        data: parameters,
        success: function(data) {
            jQuery('.studentsubjects_list').append(data);
            ajaxDone();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showSubjects(){
    jQuery.ajax({
        method: 'POST',
        url: '/getSubjectsDatabase',
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

function showDepartments(){
    jQuery.ajax({
        method: 'POST',
        url: '/getDepartmentsDatabase',
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

function showCourses(){
    jQuery.ajax({
        method: 'POST',
        url: '/getCoursesDatabase',
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
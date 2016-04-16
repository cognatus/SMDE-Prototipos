
jQuery(document).ready(function(){
    showAdmins();
    showStudents();
    showTeachers();
    showSubjects();
    showDepartments();
    showCourses();

    /*jQuery('.student').click(function(){
        var studentEmail = jQuery(this).find('.stsbid').attr('data-id');
        showStudentSubjects(studentEmail);
    });*/

});

function showAdmins(){
	jQuery.ajax({
        method: 'GET',
        url: '/getAdministratorsDatabase',
        cache: false,
        timeout: 5000,
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
        method: 'GET',
        url: '/getStudentsDatabase',
        cache: false,
        timeout: 5000,
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
        method: 'GET',
        url: '/getTeachersDatabase',
        cache: false,
        timeout: 5000,
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
        method: 'GET',
        url: '/getStudentsSubjectsDatabase',
        cache: false,
        timeout: 5000,
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
        method: 'GET',
        url: '/getSubjectsDatabase',
        cache: false,
        timeout: 5000,
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
        method: 'GET',
        url: '/getDepartmentsDatabase',
        cache: false,
        timeout: 5000,
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
        method: 'GET',
        url: '/getCoursesDatabase',
        cache: false,
        timeout: 5000,
        success: function(data) {
            jQuery('.managementlist').append(data);
            ajaxDone();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}
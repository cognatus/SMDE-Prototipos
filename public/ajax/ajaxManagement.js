
jQuery(document).ready(function(){

    jQuery('#management_showall').show(function(){
        setTimeout(showAdmins, 3000);
    });

    /*jQuery('.student').click(function(){
        var studentEmail = jQuery(this).find('.stsbid').attr('data-id');
        showStudentSubjects(studentEmail);
    });*/

});

function showAdmins(){
	jQuery.ajax({
        type: 'GET',
        url: 'getAdministratorsDatabase',
        cache: false,
        success: function(data) {
            jQuery('.managementlist').append(data);
            showStudents();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
    });
}

function showStudents(){
    jQuery.ajax({
        type: 'GET',
        url: 'getStudentsDatabase',
        cache: false,
        success: function(data) {
            jQuery('.managementlist').append(data);
            showTeachers();
            jQuery('.item_student').click(function(){
                var stuId = jQuery(this).attr('data-id');
                showStudentSubjects(stuId);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
    });
}

function showStudentSubjects(stuId){
    jQuery.ajax({
        type: 'GET',
        url: 'getStudentsSubjectsDatabase',
        cache: false,
        data: {
            studentEmail: stuId
        },
        success: function(data2) {
            alert('¡Asignaturas cargadas de: ' + stuId);
            alert(data2);
            jQuery('.studentsubjects_list[data-id="' + stuId + '"]').append(data2);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error: ' + textStatus + " " + errorThrown);
        }
    });
}

function showTeachers(){
    jQuery.ajax({
        type: 'GET',
        url: 'getTeachersDatabase',
        cache: false,
        success: function(data) {
            jQuery('.managementlist').append(data);
            showSubjects();
            jQuery('.item_teacher').click(function(){
                var stuId = jQuery(this).attr('data-id');
                showStudentSubjects(stuId);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
    });
}

function showTeachersSubjects(stuId){
    jQuery.ajax({
        type: 'GET',
        url: 'getTeachersSubjectsDatabase',
        cache: false,
        data: {
            studentEmail: stuId
        },
        success: function(data2) {
            alert('¡Asignaturas cargadas de: ' + stuId);
            alert(data2);
            jQuery('.teachersubjects_list[data-id="' + stuId + '"]').append(data2);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('Error: ' + textStatus + " " + errorThrown);
        }
    });
}

function showSubjects(){
    jQuery.ajax({
        type: 'GET',
        url: 'getSubjectsDatabase',
        cache: false,
        success: function(data) {
            jQuery('.managementlist').append(data);
            showDepartments();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
    });
}

function showDepartments(){
    jQuery.ajax({
        type: 'GET',
        url: 'getDepartmentsDatabase',
        cache: false,
        success: function(data) {
            jQuery('.managementlist').append(data);
            showCourses();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
    });
}

function showCourses(){
    jQuery.ajax({
        type: 'GET',
        url: 'getCoursesDatabase',
        cache: false,
        success: function(data) {
            jQuery('.managementlist').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
    });
}

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

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.item_student').click(function(){
                var selectorCont = jQuery(this);
                var container = jQuery(this).siblings('.innerlistitem');
                var stuId = selectorCont.siblings('.innerlistitem').attr('data-id');
                container.find('.studentsubjects_list').empty();
                jQuery.ajax({
                    type: 'GET',
                    url: 'getStudentsSubjectsDatabase',
                    cache: false,
                    data: {
                        studentEmail: stuId
                    },
                    success: function(data2) {
                        console.log(data2);
                        for(var i in data2){
                            var subject = data2[i];
                            container.find('.studentsubjects_list').append('<div class="colhh1 hover">'
                            + '<div class="listitem_img"><span>B</span></div>'
                            + '<div class="listitem_info">'
                            + '<div class="listitem_rightinfo">' + subject.idSubject + '</div>'
                            + '<div class="listitem_title"><b>' + subject.subjectName + '</b></div>'
                            + '<div class="listitem_bottomdata">Grupo: ' + subject.courseName + '</div>'
                            + '</div>'
                            + '</div>');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + textStatus + " " + errorThrown);
                    }
                });
            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
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

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.item_teacher').click(function(){
                var selectorCont = jQuery(this);
                var container = jQuery(this).siblings('.innerlistitem');
                var teaId = selectorCont.siblings('.innerlistitem').attr('data-id');
                container.find('.teachersubjects_list').empty();
                jQuery.ajax({
                    type: 'GET',
                    url: 'getTeachersSubjectsDatabase',
                    cache: false,
                    data: {
                        teacherEmail: teaId
                    },
                    success: function(data2) {
                        console.log(data2);
                        for(var i in data2){
                            var subject = data2[i];
                            container.find('.studentsubjects_list').append('<div class="colhh1 hover">'
                            + '<div class="listitem_img"><span>B</span></div>'
                            + '<div class="listitem_info">'
                            + '<div class="listitem_rightinfo">' + subject.idSubject + '</div>'
                            + '<div class="listitem_title"><b>' + subject.subjectName + '</b></div>'
                            + '<div class="listitem_bottomdata">Grupo: ' + subject.courseName + '</div>'
                            + '</div>'
                            + '</div>');
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + textStatus + " " + errorThrown);
                    }
                });
            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
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
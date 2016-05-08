
jQuery(document).on('ready', function(){

    showAdmins();
    showStudents();
    showTeachers();
    showSubjects();
    showDepartments();
    showCourses();

});

function showAdmins(){
	jQuery.ajax({
        type: 'GET',
        url: 'getAdministratorsDatabase',
        cache: false,
        success: function(data) {
            jQuery('.mgm_adminslist').append(data);
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
            jQuery('.mgm_studentslist').append(data);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.item_student').one('click', function(){
                var selectorCont = jQuery(this);
                var container = jQuery(this).siblings('.innerlistitem');
                var stuId = selectorCont.siblings('.innerlistitem').attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getStudentsSubjectsDatabase',
                    cache: false,
                    data: {
                        studentEmail: stuId
                    },
                    success: function(data2) {
                        for(var i in data2){
                            var subject = data2[i];
                            container.find('.studentsubjects_list').append('<div class="colhh1 pd_l12 hover">'
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
     ,                });
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
            jQuery('.mgm_teacherslist').append(data);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.item_teacher').one('click', function(){
                var selectorCont = jQuery(this);
                var container = jQuery(this).siblings('.innerlistitem');
                var teaId = selectorCont.siblings('.innerlistitem').attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getTeachersSubjectsDatabase',
                    cache: false,
                    data: {
                        teacherEmail: teaId
                    },
                    success: function(data2) {
                        for(var i in data2){
                            var subject = data2[i];
                            container.find('.teachersubjects_list').append('<div class="colhh1 pd_l12 hover">'
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
     ,                });
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
            jQuery('.mgm_subjectslist').append(data);
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
            jQuery('.mgm_departmentslist').append(data);
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
            jQuery('.mgm_courseslist').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
        
    });
}
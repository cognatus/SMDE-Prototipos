
jQuery(document).on('ready', function(){
        
    showProfileSubjects();
    showContactsAdministrators();
    showContactsStudents();
    showContactsTeachers();

});

function showContactsAdministrators(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsAdministrators',
        cache: true,
        success: function(data) {
            jQuery('#contacts_list').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}

function showContactsStudents(){
    jQuery.ajax({
        type: 'GET',
        url: 'getProfileContactsStudents',
        cache: true,
        success: function(data) {
            jQuery('#contacts_list').append(data);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.item_student').one('click', function(){
                var selectorCont = jQuery(this);
                var container = jQuery(this).siblings('.innerlistitem');
                var stuId = selectorCont.siblings('.innerlistitem').attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getStudentCoincidences',
                    cache: true,
                    data: {
                        studentEmail: stuId
                    },
                    success: function(data2) {
                        for(var i in data2){
                            var subject = data2[i];
                            container.find('.person_subjectslist').append('<div class="colhh1 pd_l12 hover">'
                            + '<div class="listitem_img"><span>B</span></div>'
                            + '<div class="listitem_info">'
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

function showContactsTeachers(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsTeachers',
        cache: true,
        success: function(data) {
            jQuery('#contacts_list').append(data);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.item_teacher').one('click', function(){
                var selectorCont = jQuery(this);
                var container = jQuery(this).siblings('.innerlistitem');
                var teaId = selectorCont.siblings('.innerlistitem').attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getTeacherCoincidences',
                    cache: true,
                    data: {
                        teacherEmail: teaId
                    },
                    success: function(data2) {
                        for(var i in data2){
                            var subject = data2[i];
                            container.find('.person_subjectslist').append('<div class="colhh1 pd_l12 hover">'
                            + '<div class="listitem_img"><span>B</span></div>'
                            + '<div class="listitem_info">'
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
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}

function showProfileSubjects(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileSubjectsDatabase',
        cache: true,
        success: function(data) {
            console.log(data);
            jQuery('#profilecourses_list').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}
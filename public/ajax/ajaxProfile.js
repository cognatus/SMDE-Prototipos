
jQuery(document).ready(function(){
        
    setTimeout(showContactsStudents, 3000);

});

function showContactsStudents(){
    jQuery.ajax({
        type: 'GET',
        url: 'getProfileContactsStudents',
        cache: false,
        success: function(data) {
            jQuery('#contacts_list').append(data);
            showContactsTeachers();

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.item_student').click(function(){
                var selectorCont = jQuery(this);
                var container = jQuery(this).siblings('.innerlistitem');
                var stuId = selectorCont.siblings('.innerlistitem').attr('data-id');
                container.find('.person_subjectslist').empty();
                jQuery.ajax({
                    type: 'GET',
                    url: 'getStudentCoincidences',
                    cache: false,
                    data: {
                        studentEmail: stuId
                    },
                    success: function(data2) {
                        console.log(data2);
                        for(var i in data2){
                            var subject = data2[i];
                            container.find('.person_subjectslist').append('<div class="colhh1 hover">'
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
        cache: false,
        success: function(data) {
            jQuery('#contacts_list').append(data);
            showProfileSubjects();

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.item_teacher').click(function(){
                var selectorCont = jQuery(this);
                var container = jQuery(this).siblings('.innerlistitem');
                var teaId = selectorCont.siblings('.innerlistitem').attr('data-id');
                container.find('.person_subjectslist').empty();
                jQuery.ajax({
                    type: 'GET',
                    url: 'getTeacherCoincidences',
                    cache: false,
                    data: {
                        teacherEmail: teaId
                    },
                    success: function(data2) {
                        console.log(data2);
                        for(var i in data2){
                            var subject = data2[i];
                            container.find('.person_subjectslist').append('<div class="colhh1 hover">'
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
        cache: false,
        success: function(data) {
            jQuery('#subjects_list').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}
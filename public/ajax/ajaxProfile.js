
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
            for(var i in data){
                var item = data[i];
                jQuery('#profilecourses_list').append(
                + '<div class="colhh1 slide_list">'
                +   '<div class="colhh1 hover listitem rippleria-dark" data-name="' + item.subjectName + '" data-type="' + item.courseName +'">'
                +       '<div class="listitem_img"><span></span></div>'
                +       '<div class="listitem_info">'
                +           '<div class="listitem_rightinfo">Promedio:<label class="subject_prom"></label></div>'
                +           '<div class="listitem_title"><b>' + item.subjectName + '</b></div>'
                +           '<div class="listitem_bottomdata rank" title="Nivel ' + item.subjectLevel + '"></div>'
                +       '</div>'
                +   '</div>'
                +   '<div class="colhh1 innerlistitem border_bottom">'
                +       '<div class="list_borderleft">'
                +           '<div class="pd_llist">'
                +               '<div class="sl_title">Información</div>'
                +           '</div>'
                +           '<div class="pd_llist">'
                +               '<div class="colhh1 pd_l12 sl_title">Grupo: <span class="margin_l normal_txt">' + item.courseName + '</span></div>'
                +               '<div class="pd_4"></div>'
                +               '<div class="colhh1 pd_l12 sl_title">Academia: <span class="margin_l normal_txt">' + item.departmentName + '</span></div>'
                +               '<div class="pd_4"></div>'
                +               '<div class="colhh1 pd_l12 sl_title">Nivel:<span class="margin_l normal_txt">' + item.subjectLevel + '</span></div>'
                +           '</div>'
                +       '</div>'
                +   '</div>'
                + '</div>'
                );
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}
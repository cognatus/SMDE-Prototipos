
jQuery(document).on('ready', function(){
        
    showProfileSubjects();
    showCoursesToAdd();
    showContactsAdministrators();
    showContactsStudents();
    showContactsTeachers();

    jQuery(document).ajaxComplete(function(){
        

    });

});

function showContactsAdministrators(){
    stringDataAdmins = '';
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsAdministrators',
        cache: true,
        success: function(data) {
            for(var i in data){
                var item = data[i];
                stringDataAdmins += '<div class="colhh1 block_container bg_white"  data-name="' + item.userName + ' ' + item.userLastName + ' ' + item.userSecondLastName + '" data-type="Administrador">' 
                            +   '<div class="colhh1 listitem">'
                            +       '<div class="listitem_img"><img src="images/profilephoto.png"></img></div>'
                            +       '<div class="listitem_info">'
                            +           '<div class="listitem_title"><b>' + item.userName + ' ' + item.userLastName + ' ' + item.userSecondLastName + '</b></div>'
                            +           '<div class="listitem_bottomdata">Administrador'
                            +           '</div>'
                            +       '</div>'
                            +   '</div>'
                            +   '<div class="colhh1">'
                            +       '<div class="list_borderleft">'
                            +           '<div class="pd_llist">'
                            +               '<div class="sl_title">Información</div>'
                            +           '</div>'
                            +           '<div class="pd_llist">'
                            +               '<div class="colhh1 pd_l12 sl_title">Correo: <span class="margin_l normal_txt">' + item.userEmail + '</span></div>'             
                            +           '</div>'
                            +       '</div>'
                            +   '</div>'
                            + '</div>';
            }

            jQuery('#profilecontacts_list .admins').html(stringDataAdmins);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}

function showContactsStudents(){
    stringDataStudents = '';
    jQuery.ajax({
        type: 'GET',
        url: 'getProfileContactsStudents',
        cache: true,
        success: function(data) {
            for(var i in data){
                var item = data[i];
                stringDataStudents += '<div class="colhh1 block_container bg_white"  data-name="' + item.userName + ' ' + item.userLastName + ' ' + item.userSecondLastName + '" data-type="Alumno">' 
                            +   '<div class="colhh1 listitem">'
                            +       '<div class="listitem_img"><img src="images/profilephoto.png"></img></div>'
                            +       '<div class="listitem_info">'
                            +           '<div class="listitem_title"><b>' + item.userName + ' ' + item.userLastName + ' ' + item.userSecondLastName + '</b></div>'
                            +           '<div class="listitem_bottomdata">Alumno'
                            +           '</div>'
                            +       '</div>'
                            +   '</div>'
                            +   '<div class="colhh1">'
                            +       '<div class="list_borderleft">'
                            +           '<div class="pd_llist">'
                            +               '<div class="sl_title">Información</div>'
                            +           '</div>'
                            +           '<div class="pd_llist">'
                            +               '<div class="colhh1 pd_l12 sl_title">Correo: <span class="margin_l normal_txt">' + item.userEmail + '</span></div>'             
                            +           '</div>';

                if(sessionUserType != 3){
                    stringDataStudents +=       '<div class="pd_8"></div>'
                                +       '<div class="colhh1">'
                                +           '<div class="pd_llist">'
                                +               '<div class="sl_title">Cursos en común</div>'
                                +           '</div>'
                                +           '<div class="pd_llist hidecontent_button"  data-id="' + item.userEmail + '">'
                                +               '<span class="txtprimary_color sl_title">Mostrar Cursos</span>'
                                +           '</div>'
                                +           '<div class="person_subjectslist"></div>'
                                +       '</div>';
                }

                stringDataStudents +=       '</div>'
                            +   '</div>'
                            + '</div>';
            }

            jQuery('#profilecontacts_list .students').html(stringDataStudents);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.students .block_container .hidecontent_button').one('click', function(){
                var button = jQuery(this);
                var container = jQuery(this).siblings('.person_subjectslist');
                var stuId = button.attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getStudentCoincidences',
                    cache: true,
                    data: {
                        studentEmail: stuId
                    },
                    success: function(data2) {
                        button.hide();
                        for(var i in data2){
                            var subject = data2[i];
                            container.append('<div class="colhh1 pd_l12 hover">'
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
    var stringDataTeachers = '';
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsTeachers',
        cache: true,
        success: function(data) {
            for(var i in data){
                var item = data[i];
                stringDataTeachers += '<div class="colhh1 block_container bg_white"  data-name="' + item.userName + ' ' + item.userLastName + ' ' + item.userSecondLastName + '" data-type="Profesor">' 
                            +   '<div class="colhh1 listitem">'
                            +       '<div class="listitem_img"><img src="images/profilephoto.png"></img></div>'
                            +       '<div class="listitem_info">'
                            +           '<div class="listitem_title"><b>' + item.userName + ' ' + item.userLastName + ' ' + item.userSecondLastName + '</b></div>'
                            +           '<div class="listitem_bottomdata">Profesor'
                            +           '</div>'
                            +       '</div>'
                            +   '</div>'
                            +   '<div class="colhh1">'
                            +       '<div class="list_borderleft">'
                            +           '<div class="pd_llist">'
                            +               '<div class="sl_title">Información</div>'
                            +           '</div>'
                            +           '<div class="pd_llist">'
                            +               '<div class="colhh1 pd_l12 sl_title">Correo: <span class="margin_l normal_txt">' + item.userEmail + '</span></div>'             
                            +           '</div>';

                if(sessionUserType != 3){
                    stringDataTeachers +=       '<div class="pd_8"></div>'
                                +       '<div class="colhh1">'
                                +           '<div class="pd_llist">'
                                +               '<div class="sl_title">Cursos en común</div>'
                                +           '</div>'
                                +           '<div class="pd_llist hidecontent_button"  data-id="' + item.userEmail + '">'
                                +               '<span class="txtprimary_color sl_title">Mostrar Cursos</span>'
                                +           '</div>'
                                +           '<div class="person_subjectslist"></div>'
                                +       '</div>';
                }

                stringDataTeachers +=       '</div>'
                            +   '</div>'
                            + '</div>';
            }

            jQuery('#profilecontacts_list .teachers').html(stringDataTeachers);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.teachers .block_container .hidecontent_button').one('click', function(){
                var button = jQuery(this);
                var container = jQuery(this).siblings('.person_subjectslist');
                var teaId = button.attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getTeacherCoincidences',
                    cache: true,
                    data: {
                        teacherEmail: teaId
                    },
                    success: function(data2) {
                        button.hide();
                        for(var i in data2){
                            var subject = data2[i];
                            container.append('<div class="colhh1 pd_l12 hover">'
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
    stringDataProfileCourses = '';
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileSubjectsDatabase',
        cache: true,
        success: function(data) {
            for(var i in data){
                var item = data[i];
                stringDataProfileCourses += '<div class="colhh1 block_container bg_white">' 
                +   '<div class="colhh1 listitem rippleria-dark" data-name="' + item.subjectName + '" data-type="' + item.courseName +'">'
                +       '<div class="listitem_img"><span></span></div>'
                +       '<div class="listitem_info">'
                +           '<div class="listitem_rightinfo subject_prom">Promedio:<label></label></div>'
                +           '<div class="listitem_title"><b>' + item.subjectName + '</b></div>'
                +           '<div class="listitem_bottomdata rank" title="Nivel ' + item.subjectLevel + '" data-level="' + item.subjectLevel + '"></div>'
                +       '</div>'
                +   '</div>'
                +   '<div class="colhh1">'
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
                + '</div>';
            }

            jQuery('#profilecourses_list').html(stringDataProfileCourses);

            jQuery('.listitem_bottomdata.rank').each(function(){
                var level = jQuery(this).attr('data-level');
                for(var i = 0; i < level; i++){
                    jQuery(this).append('<span class="bg_lime"></span>');
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}

function showCoursesToAdd(){
    stringDataCourses = '';
    jQuery.ajax({
        method: 'GET',
        url: 'getSubjectsCoursesDatabase',
        cache: true,
        success: function(data) {
            for(var i in data){
                var item = data[i];
                stringDataCourses += '<div class="colhh1 slide_list" data-subjectfilter= "' + item.subjectName + '" data-coursefilter="' + item.courseName + '">' 
                +   '<div class="colhh1 hover pd_lr8 listitem rel_pos" data-subject="' + item.idSubject + '" data-course="' + item.idCourse +'" data-name="' + item.subjectName + '">'
                +       '<div class="listitem_righticon circle bg_plusgray rippleria-dark" title="Agregar"></div>'
                +       '<div class="listitem_img"><span></span></div>'
                +       '<div class="listitem_info">'
                +           '<div class="listitem_alert txt_red"></div>'
                +           '<div class="listitem_title"><b>' + item.subjectName + '</b></div>'
                +           '<div class="listitem_bottomdata">' + item.courseName + '</div>'
                +       '</div>'
                +   '</div>'
                +   '<div class="colhh1 innerlistitem">'
                +       '<div class="list_borderleft">'
                +           '<div class="pd_llist">'
                +               '<div class="sl_title">Información</div>'
                +           '</div>'
                +           '<div class="pd_llist">'
                +               '<div class="colhh1 pd_l12 sl_title">Academia: <span class="margin_l normal_txt">' + item.departmentName + '</span></div>'
                +               '<div class="pd_4"></div>'
                +               '<div class="colhh1 pd_l12 sl_title">Nivel:<span class="margin_l normal_txt">' + item.subjectLevel + '</span></div>'
                +           '</div>'
                +       '</div>'
                +   '</div>'
                + '</div>';
            }

            jQuery('#new_subjects').html(stringDataCourses);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}
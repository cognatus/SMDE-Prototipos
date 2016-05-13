
jQuery(document).on('ready', function(){
    jQuery('.mgm_listcontainer .load_container').show();

    setTimeout(displayData, 1000);

});

function displayData(){
    showAdmins();
    showStudents();
    showTeachers();
    showSubjects();
    showDepartments();
    showCourses();
    jQuery('.mgm_listcontainer .load_container').hide();
}

function showAdmins(){
	jQuery.ajax({
        type: 'GET',
        url: 'getAdministratorsDatabase',
        cache: false,
        success: function(data) {
            jQuery('#managementData .admins').html(data);
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
            jQuery('#managementData .students').html(data);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.students .block_container .hidecontent_button').one('click', function(){
                var button = jQuery(this);
                var container = jQuery(this).siblings('.person_subjectslist');
                var stuId = button.attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getStudentsSubjectsDatabase',
                    cache: true,
                    data: {
                        studentEmail: stuId
                    },
                    success: function(data2) {
                        button.hide();
                        if(data2.length > 0){
                            container.append(data2);
                        }
                        else{
                            container.append('<div class="pd_l8"><div class="pd_llist opacity_color b_text">Sin Cursos Inscritos</div></div>');
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
            jQuery('#managementData .teachers').html(data);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.teachers .block_container .hidecontent_button').one('click', function(){
                var button = jQuery(this);
                var container = jQuery(this).siblings('.person_subjectslist');
                var teaId = button.attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: 'getTeachersSubjectsDatabase',
                    cache: true,
                    data: {
                        teacherEmail: teaId
                    },
                    success: function(data2) {
                        button.hide();
                        if(data2.length > 0){
                            container.append(data2);
                        }
                        else{
                            container.append('<div class="pd_l8"><div class="pd_llist opacity_color b_text">Sin Cursos Inscritos</div></div>');
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

function showDepartments(){
    jQuery.ajax({
        type: 'GET',
        url: 'getDepartmentsDatabase',
        cache: false,
        success: function(data) {
            jQuery('#managementData .departments').html(data);
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
            jQuery('#managementData .subjects').html(data);
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
            jQuery('#managementData .groups').html(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
        
    });
}
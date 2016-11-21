
jQuery(document).on('ready', function(){
        
    if(sessionUserType != 3){
        showProfileSubjects();
        showCoursesToAdd();
    }
    showContactsAdministrators();
    showContactsStudents();
    showContactsTeachers();

});

function showContactsAdministrators(){
    jQuery.ajax({
        method: 'GET',
        url: '/api/profile/admins',
        cache: true,
        success: function(data) {
            jQuery('#profilecontacts_list .admins').html(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ' ' + errorThrown);
        }
        
    });
}

function showContactsStudents(){
    jQuery.ajax({
        type: 'GET',
        url: '/api/profile/students',
        cache: true,
        success: function(data) {
            jQuery('#profilecontacts_list .students').html(data);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.students .block_container .hidecontent_button').one('click', function(){
                var button = jQuery(this);
                var container = jQuery(this).siblings('.person_subjectslist');
                var stuId = button.attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: '/api/profile/students/' + stuId + '/subjects' ,
                    cache: true,
                    success: function(data2) {
                        button.hide();
                        container.append(data2);
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
        url: '/api/profile/teachers',
        cache: true,
        success: function(data) {
            jQuery('#profilecontacts_list .teachers').html(data);

            //FUNCION PARA OBTENER MATERIAS DE CADA UNO
            jQuery('.teachers .block_container .hidecontent_button').one('click', function(){
                var button = jQuery(this);
                var container = jQuery(this).siblings('.person_subjectslist');
                var teaId = button.attr('data-id');
                jQuery.ajax({
                    type: 'GET',
                    url: '/api/profile/teachers/' + teaId +  '/subjects',
                    cache: true,
                    success: function(data2) {
                        button.hide();
                        container.append(data2);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('Error: ' + textStatus + " " + errorThrown);
                    }  
                });

            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ' ' + errorThrown);
        }
        
    });
}

function showProfileSubjects(){
    jQuery.ajax({
        method: 'GET',
        url: '/api/profile/subjects',
        cache: true,
        success: function(data) {
            jQuery('#profilecourses_list').html(data);

            jQuery('.listitem_bottomdata.rank').each(function(){
                var level = jQuery(this).attr('data-level');
                for(var i = 0; i < level; i++){
                    jQuery(this).append('<span class="bgaccent_color3"></span>');
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ' ' + errorThrown);
        }
        
    });
}

function showCoursesToAdd(){
    jQuery.ajax({
        method: 'GET',
        url: '/api/profile/availablecourses',
        cache: true,
        success: function(data) {
            jQuery('#new_subjects #coursesToAdd').html(data);
            addCoursesControl();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ' ' + errorThrown);
        }
        
    });
}
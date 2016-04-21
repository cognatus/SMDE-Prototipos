
jQuery(document).ready(function(){

    showProfileSubjects();

/*-------------------------------------------------------------------------------------
        SUBJECTS ADD - REMOVE CONTROL
---------------------------------------------------------------------------------------*/

    var listElements = jQuery('#new_subjects .slide_list');
    var list = jQuery('#subcourList');
    var selectType = jQuery('#subcourType');  
    var showType = jQuery('#subcourType').val();

    jQuery('#new_item').click(function(){
        // OBTENER LAS ASIGNATURAS A PARTIR DE LOS ELEMENTOS DE LISTA Y ELIMINAR DUPLICIDADES
        var subjectsArray = [];
        for( var i = 0; i < listElements.length; i++){
            var listElementsData = listElements.eq(i).attr('data-subjectfilter');
            subjectsArray.push(listElementsData);
        }
        var uniqueSubjects = [];
        jQuery.each(subjectsArray, function(i, el){
            if(jQuery.inArray(el, uniqueSubjects) === -1) uniqueSubjects.push(el);
        });

        // OBTENER LOS GRUPOS A PARTIR DE LOS ELEMENTOS DE LISTA Y ELIMINAR DUPLICIDADES
        var coursesArray = [];
        for( var i = 0; i < listElements.length; i++){
            var listElementsData = listElements.eq(i).attr('data-coursefilter');
            coursesArray.push(listElementsData);
        }
        var uniqueCourses = [];
        jQuery.each(coursesArray, function(i, el){
            if(jQuery.inArray(el, uniqueCourses) === -1) uniqueCourses.push(el);
        });

        // AÑADE LOS GRUPOS A LA LISTA DE FILTRO
        for (var i = 0; i < uniqueSubjects.length; i++) {
            list.append('<option value="' + uniqueSubjects[i] + '" data-type="Subject">' + uniqueSubjects[i] + '</option>');
        }
        

        // AÑADE LOS GRUPOS A LA LISTA DE FILTRO
        for (var i = 0; i < uniqueCourses.length; i++) {
            list.append('<option value="' + uniqueCourses[i] + '" data-type="Course">' + uniqueCourses[i] + '</option>');
        }

        selectType.val('None');

        selectType.on('change', function(){
            var selectValue = jQuery(this).val();
            list.find('option').hide();
            list.find('option[data-type="' + selectValue + '"]').show();
            list.val('None');
            if(selectType.val() == 'None'){
                listElements.show();
            }
        });

        // MUESTRA A PARTIR DE LOS FILTROS
        jQuery('#subcourList').on('change', function(){
            var filter = jQuery(this).val();

            if(jQuery('#subcourType').val() != 'None'){
                listElements.hide();

                jQuery('#new_subjects .slide_list[data-subjectfilter="' + filter + '"]').show();
                jQuery('#new_subjects .slide_list[data-coursefilter="' + filter + '"]').show();
            }
        });

    });

    // AÑADIR LAS ASIGNATURAS PARA INSCRIBIR
    jQuery('#new_subjects .slide_list .listitem .listitem_righticon').click( function(e){
        e.stopPropagation();
        var appendedSubjects = jQuery('#added_subjects');
        var newSubjects = jQuery('#newSubjects');
        var item =  jQuery(this).parents('.listitem').clone();

        var itemIdSubject = item.attr('data-subject');
        var itemIdCourse = item.attr('data-course');

        if(appendedSubjects.find('.listitem[data-subject="' + itemIdSubject + '"]').length == 0 ){
            appendedSubjects.append(item);
        }
        else{
            jQuery(this).siblings('.listitem_info').find('.listitem_alert').text('Ya agregaste esta Asignatura');
            jQuery(this).siblings('.listitem_info').find('.listitem_alert').show(function(){
                jQuery(this).delay(1200).fadeOut();
            });
        }
        
        if( jQuery('#added_subjects').find('.listitem').length > 0 ){
            jQuery('#sub_hide').hide();
            jQuery('#added_subjects .listitem_righticon').removeClass('bg_plusgray');
            jQuery('#added_subjects .listitem_righticon').addClass('bg_closegray');
        }

        // REMOVER LAS ASIGNATURAS A INSCRIBIR
        jQuery('#added_subjects .listitem .listitem_righticon').click( function(){

            var itemQuit =  jQuery(this).parents('.listitem');
            itemQuit.remove();

            if( jQuery('#added_subjects').find('.listitem').length < 1 ){
                jQuery('#sub_hide').show();
            }

        });
    });

});

function showProfileSubjects(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileSubjectsDatabase',
        cache: false,
        success: function(data) {
            jQuery('#subjects_list').append(data);
            showSubjectsCourses();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}

function showSubjectsCourses(){
	jQuery.ajax({
        type: 'GET',
        url: 'getSubjectsCoursesDatabase',
        cache: false,
        success: function(data) {
            jQuery('#new_subjects').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
    });
}
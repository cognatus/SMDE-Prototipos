
jQuery(document).ready(function(){

    setTimeout(showProfileSubjects, 2000);

/*-------------------------------------------------------------------------------------
        SUBJECTS ADD - REMOVE CONTROL
---------------------------------------------------------------------------------------*/

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
        
        if( jQuery('#added_subjects').find('.listitem').length > 0 ){
            jQuery('#sub_hide').hide();
            jQuery('#added_subjects .listitem_righticon').removeClass('bg_plusgray');
            jQuery('#added_subjects .listitem_righticon').addClass('bg_closegray');
        }

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
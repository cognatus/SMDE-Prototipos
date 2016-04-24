
var socket;

jQuery(document).on('ready', function(){
        
    showContactsAdministrators();

/*    jQuery('#search_newmsmcontacts').blur(function(){
        jQuery(this).siblings('#msm_contactscontainer').hide();
    });*/

    socket = io('http://localhost:3000/chatsini');

    //FILTRAR CONTACTOS A PARTIR DE BUSQUEDA
    jQuery('#search_newmsmcontacts').keyup(function(){

        jQuery(this).siblings('#msm_contactscontainer').show();

        var currentQuery = jQuery('#search_newmsmcontacts').val().toUpperCase();

        jQuery('#msm_contactscontainer .listitem').hide();
        jQuery('#msm_contactscontainer .no_result').html('<div class="pd_24">No se encontro: <b>"' + currentQuery + '"</b></div>');
            
        if(currentQuery != ''){
            jQuery('#msm_contactscontainer .listitem').each(function(){

                var currentKeyboard = jQuery(this).attr('data-name').toUpperCase();
                var currentKeyboard2 = jQuery(this).attr('data-email').toUpperCase();

                if( currentKeyboard.indexOf(currentQuery) >= 0 || currentKeyboard2.indexOf(currentQuery) >= 0 ){
                    jQuery(this).show();
                    jQuery('#msm_contactscontainer .no_result').html('');
                }
            });
        }
        else{
            jQuery('#msm_contactscontainer .listitem').show();
            jQuery('#msm_contactscontainer .no_result').html('');
            jQuery('#msm_contactscontainer').hide();
        }
    });

    jQuery('#msm_contactscontainer .listitem').click(function(){

        var name = jQuery(this).attr('data-name');
        var email = jQuery(this).attr('data-email');
        var imgsrc = jQuery(this).find('.listitem_img img').attr('src');

        var html = '<div data-email="' + email + '" class="msm_sendtocontact rel_pos" title="Quitar">'
                    + '<div class="msm_sendtoremove">'
                    + '<div class="bg_opacity bg_cross circle"></div>'
                    + '</div><img src="' + imgsrc + '" class="sendtoimg circle v_middle"/>'
                    + '<div class="name circle bg_lightgray opacity_color v_middle">' + name + '</div>'
                    + '</div>';

        if( jQuery('.msm_sendtocontact[data-email="' + email + '"]').length == 0 ){
            jQuery('.msm_sendtocontainer').append(html);
        }

        jQuery(this).parents('#msm_contactscontainer').hide();
        jQuery('#search_newmsmcontacts').val('').focus();

        jQuery('.msm_sendtocontact').hover(function(){
            jQuery(this).find('.msm_sendtoremove').show();
        }, function(){
            jQuery(this).find('.msm_sendtoremove').hide();
        });

        jQuery('.msm_sendtocontact').click(function(){
            jQuery(this).remove();
        });
    });



});

function showContactsAdministrators(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsAdministrators',
        cache: true,
        success: function(data) {
            jQuery('#msm_contactscontainer').append(data);
            jQuery('#listcontainer').append(data);
            showContactsStudents();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        },
        async: 'false'
    });
}

function showContactsStudents(){
    jQuery.ajax({
        type: 'GET',
        url: 'getProfileContactsStudents',
        cache: true,
        success: function(data) {
            jQuery('#msm_contactscontainer').append(data);
            jQuery('#listcontainer').append(data);
            showContactsTeachers();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        },
        async: 'false'
    });
}

function showContactsTeachers(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsTeachers',
        cache: true,
        success: function(data) {
            jQuery('#msm_contactscontainer').append(data);
            jQuery('#listcontainer').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        },
        async: 'false'
    });
}

function elegirUser(user){

    //funciones locas que no quiero poner aun van jir
    socket.emit('cambiarsala', user);

}
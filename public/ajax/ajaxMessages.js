
var socket = io('http://localhost:3000/chatsini');

jQuery(document).on('ready', function(){
        
    showContactsAdministrators();

    //OBTIENE LA ALTURA ORIGINAL DEL INPUT DONDE SE AGREGAN MAS USUARIOS
    var origHeight =  jQuery('#search_newmsmcontacts').outerHeight();
    jQuery('.msm_sendtocontainer #msm_addperson').hide();

    jQuery('#msm_textarea').focus(function(){
        if(jQuery('.msm_sendtocontainer .msm_sendtocontact').length > 0){
            jQuery('#search_newmsmcontacts').css('height', '0');
            jQuery('#contacts_to_send').css('margin-top', '-8px');
            jQuery('.msm_sendtocontainer #msm_addperson').show();
        }

        //CREAR ARREGLO DE LOS USUARIOS PARA LA LOBBY
        var string = jQuery('#hidden_inputsendto').val();
        var newString = string.split(',');
        newString.pop();
        if(string != ''){
            console.log(newString);
        }
    });

    //MUESTRA EL INPUT PARA AGREGAR UN USUARIO AL CLICKEAR EN EL "+"
    jQuery('.msm_sendtocontainer #msm_addperson').click(function(){
        jQuery('#search_newmsmcontacts').css('height', origHeight).focus();
        jQuery('#contacts_to_send').css('margin-top', '0');
    });

    //ESCONDE EL BOTON PARA AGREGAR CUANDO ESTE SOBRE EL INPUT QUE AGREGA USUARIOS AL LOBBY
    jQuery('#search_newmsmcontacts').focus(function(){
        jQuery('#msm_addperson').hide();
    });

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

    //MOSTRAR TODOS LOS CONTACTOS
    jQuery('#showall_button').click(function(){
        jQuery('#msm_contactscontainer .listitem').show();     
    });

    //FUNCION PARA AGREGAR USUARIOS AL LOBBY
    jQuery('#msm_contactscontainer .listitem').click(function(){

        //OBTIENE DATOS PARA AGREGAR USUARIO A LOBBY
        var name = jQuery(this).attr('data-name');
        var email = jQuery(this).attr('data-email');
        var imgsrc = jQuery(this).find('.listitem_img img').attr('src');


        //AGREGA UN NUEVO USUARIO PARA EL LOBBY
        var html = '<div data-email="' + email + '" class="msm_sendtocontact rel_pos" title="Quitar">'
                    + '<div class="msm_sendtoremove">'
                    + '<div class="bg_opacity bg_cross circle"></div>'
                    + '</div><img src="' + imgsrc + '" class="sendtoimg circle v_middle"/>'
                    + '<div class="name circle bg_lightgray opacity_color v_middle">' + name + '</div>'
                    + '</div>';

        if( jQuery('.msm_sendtocontainer').find('.msm_sendtocontact[data-email="' + email + '"]').length == 0 ){
            //AGEGAR USUARIO AL LOBBY
            jQuery('.msm_sendtocontainer').prepend(html);
            jQuery('#hidden_inputsendto').val(jQuery('#hidden_inputsendto').val() + email + ',');
        }

        jQuery(this).parents('#msm_contactscontainer').hide();
        jQuery('#search_newmsmcontacts').val('').focus();

        jQuery('.msm_sendtocontact').hover(function(){
            jQuery(this).find('.msm_sendtoremove').show();
        }, function(){
            jQuery(this).find('.msm_sendtoremove').hide();
        });

        //REMUEVE LOS CORREOS DEL CAMPO DE TEXTO ORIGINAL QUE SE MANDA AL SERVIDOR
        jQuery('.msm_sendtocontainer .msm_sendtocontact').click(function(){
            var string = jQuery('#hidden_inputsendto').val();
            var removeEmail = jQuery(this).attr('data-email');
            var newString = string.replace(removeEmail + ',', '');
            jQuery('#hidden_inputsendto').val(newString);
            jQuery(this).remove();
            if(jQuery('.msm_sendtocontainer .msm_sendtocontact').length == 0){
                jQuery('#msm_addperson').hide();
                jQuery('#search_newmsmcontacts').css('height', origHeight);
                jQuery('.msm_sendtocontainer').css('margin-top', '0');
            }
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

function elegirUser(lobby){

    //este metodo recibe el lobby  y conecta en server
    socket.emit('cambiarsala', lobby);
    //weaas de que aparezcan los mensajes del weon con quien habla
    //de default la primera vez que se cargue la pagina cargara el primer weon

}

function enviaMensaje(){

    socket.emit('mensaje', document.getElementById("newmsm").value);

}

socket.on('mostrar', function(data){

    alert(data.mensaje);

});
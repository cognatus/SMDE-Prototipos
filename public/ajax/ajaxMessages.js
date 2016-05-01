var socket = io('http://localhost:3000/chatsini');

function selectLobby(lobby){
    //este metodo recibe el lobby  y conecta en server
    socket.emit('cambiarsala', 'lobby');
    jQuery('#lobbyScope').val(lobby);
    //Contenedor de los mensajes
    var container = jQuery('#msm_list');
    //weaas de que aparezcan los mensajes del weon con quien habla
    //de default la primera vez que se cargue la pagina mostrara al primer weon
    container.empty();
    jQuery.ajax({
        method: 'GET',
        url: 'getSelectedLobbyMessages',
        cache: false,
        data: {
            lobby: lobby
        },
        success: function(data) {
            for(var i in data){
                var msm = data[i];
                var lastLeftMsm = jQuery('#msm_list .msm_block:last-child').find('.leftmsm').length;
                var lastRightMsm = jQuery('#msm_list .msm_block:last-child').find('.rightmsm').length;
                //LA VARIABLE sessionUser SE OBTIENE DE LA VISTA layout.jade
                if (msm.userEmail == sessionUser ){
                    if(lastRightMsm > 0){
                        container.find('.msm_block:last-child').find('.msm_text')
                            .append('<div class="colhh1 autooverflow" data-msm="' + msm.idMessage + '">'
                                    +   '<div class="rightmsm bg_white">'
                                    +       '<div class="pd_12"> '
                                    +           msm.messageText
                                    +           '<span class="msm_date">'
                                    +               '<label class="lobby_time" title="' + msm.messageDate + '"> ' + msm.messageTime + '</label>'
                                    +           '</span>'
                                    +       '</div>'
                                    +   '</div>'
                                    +'</div>');
                    }
                    else{
                        container.append('<div class="colhh1 margin_bot msm_block">'
                                        +   '<div class="msm_text">'
                                        +       '<div class="colhh1 autooverflow" data-msm="' + msm.idMessage + '">'
                                        +           '<div class="rightmsm bg_white">'
                                        +               '<i></i>'
                                        +               '<div class="pd_12"> '
                                        +                   msm.messageText
                                        +                   '<span class="msm_date">'
                                        +                       '<label class="lobby_time" title="' + msm.messageDate + '"> ' + msm.messageTime + '</label>'
                                        +                   '</span>'
                                        +               '</div>'
                                        +           '</div>'
                                        +       '</div>'
                                        +   '</div>'
                                        +   '<div class="msm_img">'
                                        +       '<img src="images/profilephoto.png" title="Yo" class="circle">'
                                        +   '</div>'
                                        + '</div>');
                    }
                }
                else if (msm.userEmail != sessionUser ){
                     if(lastLeftMsm > 0){
                        container.find('.msm_block:last-child').find('.msm_text')
                            .append('<div class="colhh1 autooverflow" data-msm="' + msm.idMessage + '">'
                                    +   '<div class="leftmsm white_text">'
                                    +       '<div class="pd_12"> '
                                    +           msm.messageText
                                    +           '<span class="msm_date">'
                                    +               '<label class="lobby_time" title="' + msm.messageDate + '"> ' + msm.messageTime + '</label>'
                                    +           '</span>'
                                    +       '</div>'
                                    +   '</div>'
                                    +'</div>');
                    }
                    else{
                        container.append('<div class="colhh1 margin_bot msm_block">'
                                        +   '<div class="msm_img">'
                                        +       '<img src="images/profilephoto.png" title="' + msm.userName + ' ' + msm.userLastName + '\n' + msm.userEmail + '" class="circle">'
                                        +   '</div>'
                                        +   '<div class="msm_text">'
                                        +       '<div class="colhh1 autooverflow" data-msm="' + msm.idMessage + '">'
                                        +           '<div class="leftmsm white_text">'
                                        +               '<i></i>'
                                        +               '<div class="pd_12"> '
                                        +                   msm.messageText
                                        +                   '<span class="msm_date">'
                                        +                       '<label class="lobby_time" title="' + msm.messageDate + '"> ' + msm.messageTime + '</label>'
                                        +                   '</span>'
                                        +               '</div>'
                                        +           '</div>'
                                        +       '</div>'
                                        +   '</div>'
                                        + '</div>');
                    }
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}


//Paso 3.
socket.on('mostrar', function(data){

    alert('llegue hasta aqui'+data.messageText)
    //este es el importante
    //lo que enviaste del back en socket.in(socket.room).emit('mostrar', {
    //lo vas a estar reccibiendo en este metodo
    //aqui es donde haras que se haga en tiempo real
    //solo es cosa que le pongas las cosas de etiquetas y así para que se muestr
    //pueste que basicamente ya todo se hace en tiempo real

    //Son las burbujas del chat que aparecen del lado derecho
    var lastRightMsm = jQuery('#msm_list .msm_block:last-child').find('.rightmsm').length;

    if(lastRightMsm > 0){
        container.find('.msm_block:last-child').find('.msm_text')
            .append('<div class="colhh1 autooverflow" data-msm="' + data.idMessage + '">'
                    +   '<div class="rightmsm bg_white">'
                    +       '<div class="pd_12"> '
                    +           data.messageText
                    +           '<span class="msm_date">'
                    +               '<label class="lobby_time" title="' + data.messageDate + '"> ' + data.messageTime + '</label>'
                    +           '</span>'
                    +       '</div>'
                    +   '</div>'
                    +'</div>');
    }
    else{
        container.append('<div class="colhh1 margin_bot msm_block">'
                        +   '<div class="msm_text">'
                        +       '<div class="colhh1 autooverflow" data-msm="' + data.idMessage + '">'
                        +           '<div class="rightmsm bg_white">'
                        +               '<i></i>'
                        +               '<div class="pd_12"> '
                        +                   data.messageText
                        +                   '<span class="msm_date">'
                        +                       '<label class="lobby_time" title="' + data.messageDate + '"> ' + data.messageTime + '</label>'
                        +                   '</span>'
                        +               '</div>'
                        +           '</div>'
                        +       '</div>'
                        +   '</div>'
                        +   '<div class="msm_img">'
                        +       '<img src="images/profilephoto.png" title="' + data.userName + ' ' + data.userLastName + '\n' + data.userEmail + '" class="circle">'
                        +   '</div>'
                        + '</div>');
    }

});

jQuery(document).ready(function(){
    
    showLobbies();
    showContactsAdministrators();
    showContactsStudents();
    showContactsTeachers();

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
        jQuery('#msm_contactscontainer .no_result').html('<div class="pd_24">No se encontro "' + jQuery('#search_newmsmcontacts').val() + '"</div>');
            
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

    //OBTENER EL DIA ACTUAL PARA CAMBIAR LOS TEXTOS EN lA PARTE DERECHA DE LOS MENSAJES
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;//ENERO ES EL 0
    var yyyy = today.getFullYear();

    if( dd < 10 ){ dd = '0' + dd; }
    if( mm < 10 ){ mm = '0' + mm; }

    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    var ddYest = yesterday.getDate();
    var mmYest = yesterday.getMonth()+1;//ENERO ES EL 0
    var yyyyYest = yesterday.getFullYear();

    if( ddYest < 10 ){ ddYest = '0' + ddYest; }
    if( mmYest < 10 ){ mmYest = '0' + mmYest; }

    var stringDate = dd + '/' + mm + '/' + yyyy;
    var stringDateYest = ddYest + '/' + mmYest + '/' + yyyyYest;

    jQuery('.listcontainer .listitem').each(function(){
        var itemDate = jQuery(this).find('label.lobby_date').text();

        if( itemDate == stringDate ){
            jQuery(this).find('label.lobby_date').hide();
        }
        else if( itemDate == stringDateYest ){
            jQuery(this).find('label.lobby_date').text('Ayer');
            jQuery(this).find('label.lobby_time').hide();   
        }
        else{
            jQuery(this).find('label.lobby_time').hide();   
        }
    });

    jQuery('form#addNewMsm').submit(function(e){
        e.preventDefault();

        var date = new Date();
        var hh = date.getHours();
        var mm = date.getMinutes();
        if( hh < 10 ){ hh = '0' + hh; }
        if( mm < 10 ){ mm = '0' + mm; }
        var currentTime = hh + ':' + mm;
        //Paso 1.
        //aqui solo le mandas el mensaje y/o demas informacion que gustes
        var msmText = jQuery('#newmsm').val();
        var lobby = jQuery('#lobbyScope').val();

         socket.emit('mensaje', {
            //Estas variables se obtienen de layout.jade
            userEmail: sessionUser,
            userName: sessionUserName,
            userLastName: sessionUserLastName,
            messageText: msmText,
            messageTime: currentTime
        });

        jQuery.ajax({
            method: 'POST',
            url: 'insertNewMessage',
            data: {
                message: msmText,
                lobby: lobby
            },
            success: function(data) {
                jQuery('#newmsm').val('').focus();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        });

    });

});



//FUNCIONES AJAX PARA MOSTRAR AL CARGAR LA PAGINA
function showLobbies(){
    jQuery.ajax({
        method: 'GET',
        url: 'getLobbiesDatabase',
        cache: true,
        success: function(data) {
            jQuery('#listcontainer').append(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        },
        async: 'false'
    });
}

function enviarMsg(){
    socket.emit('mensaje', {
        
        //no supe de donde sacar los datos .-.
        userEmail: 'tu@gefa.com',
        userName: 'benito',
        userLastName: 'camelo',
        messageText: 'tu gfa puto',
        messageTime: 'hoy'    

    });
}

function showContactsAdministrators(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsAdministrators',
        cache: true,
        success: function(data) {
            jQuery('#msm_contactscontainer').append(data);
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
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        },
        async: 'false'
    });
}
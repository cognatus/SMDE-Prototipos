var socket = io('http://192.168.1.67:3000/chatsini');

function selectLobby(lobby){
    //este metodo recibe el lobby  y conecta en server
    socket.emit('cambiarsala', lobby);
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
                var lastLeftMsm = jQuery('#msm_list .msm_block:last-child').find('.leftmsm[data-user="' + msm.userEmail + '"]').length;
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
                                        +       '<img src="profile_photos/' + msm.photoName + '.png" title="Yo" class="circle">'
                                        +   '</div>'
                                        + '</div>');
                    }
                }
                else if (msm.userEmail != sessionUser ){
                     if(lastLeftMsm > 0){
                        container.find('.msm_block:last-child').find('.msm_text')
                            .append('<div class="colhh1 autooverflow" data-msm="' + msm.idMessage + '">'
                                    +   '<div class="leftmsm white_text bg_blue" data-user="' + msm.userEmail + '">'
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
                                        +       '<img src="profile_photos/' + msm.photoName + '.png" title="' + msm.userName + ' ' + msm.userLastName + '\n' + msm.userEmail + '" class="circle">'
                                        +   '</div>'
                                        +   '<div class="msm_text">'
                                        +       '<div class="colhh1 autooverflow" data-msm="' + msm.idMessage + '">'
                                        +           '<div class="leftmsm white_text bg_blue" data-user="' + msm.userEmail + '">'
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

            jQuery('.msm_innercontent').scrollTop(jQuery('.msmscrollflag').height());
            jQuery('#newmsm').click(function(){
                jQuery('.msm_innercontent').animate({
                    scrollTop: jQuery('.msmscrollflag').height()
                });
            });
            /*alert('Altura: ' + jQuery('.msmscrollflag').height());*/
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}


//Paso 3.
socket.on('mostrar', function(data){

    //este es el importante
    //lo que enviaste del back en socket.in(socket.room).emit('mostrar', {
    //lo vas a estar reccibiendo en este metodo
    //aqui es donde haras que se haga en tiempo real
    //solo es cosa que le pongas las cosas de etiquetas y así para que se muestr
    //pueste que basicamente ya todo se hace en tiempo real

    var container = jQuery('#msm_list');
    //Son las burbujas del chat que aparecen del lado izquierdo
    var lastLeftMsm = jQuery('#msm_list .msm_block:last-child').find('.leftmsm[data-user="' + data.userEmail + '"]').length;

    if(lastLeftMsm > 0){
        container.find('.msm_block:last-child').find('.msm_text')
            .append('<div class="colhh1 autooverflow">'
                    +   '<div class="leftmsm bg_blue white_text" data-user="' + data.userEmail + '">'
                    +       '<div class="pd_12"> '
                    +           htmlspecialchars(data.messageText)
                    +           '<span class="msm_date">'
                    +               '<label class="lobby_time" title="Hace un momento"> ' + data.messageTime + '</label>'
                    +           '</span>'
                    +       '</div>'
                    +   '</div>'
                    +'</div>');
    }
    else{
        container.append('<div class="colhh1 margin_bot msm_block">'
                        +   '<div class="msm_img">'
                        +       '<img src="profile_photos/' + data.userPhoto + '.png" title="' + data.userName + ' ' + data.userLastName + '\n' + data.userEmail + '" class="circle">'
                        +   '</div>'
                        +   '<div class="msm_text">'
                        +       '<div class="colhh1 autooverflow">'
                        +           '<div class="leftmsm bg_blue white_text" data-user="' + data.userEmail + '">'
                        +               '<i></i>'
                        +               '<div class="pd_12"> '
                        +                   htmlspecialchars(data.messageText)
                        +                   '<span class="msm_date">'
                        +                       '<label class="lobby_time" title="Hace un momento"> ' + data.messageTime + '</label>'
                        +                   '</span>'
                        +               '</div>'
                        +           '</div>'
                        +       '</div>'
                        +   '</div>'
                        + '</div>');
    }

    jQuery('.msm_innercontent').animate({
        scrollTop: jQuery('.msmscrollflag').height()
    }, function(){
        showLobbies();
    });

    jQuery('#newmsm').click(function(){
        jQuery('.msm_innercontent').animate({
            scrollTop: jQuery('.msmscrollflag').height()
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
            if(data.length > 0){
                jQuery('#lobbiesData').html(data);
            }
            else{
                jQuery('#listcontainer.left_listcontainer')
                    .html('<div class="colhh1 empty_blocktext center_text">'
                        +  '<div class="centerempty">'
                        +    '<div class="pd_64">'
                        +        '<span style="background-image: url(&quot;images/close-box.png&quot;)" class="v_middle"></span>'
                        +        '<div class="autocol mm_title pd_12">No tienes ninguna Conversación.</div>'
                        +        '<div class="ll_title normal_txt">Presiona &nbsp; + &nbsp; para iniciar una conversación.</div>'
                        +    '</div>'
                        +  '</div>'
                        +'</div>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}

function showContactsAdministratorsMsm(){
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsAdministratorsMsm',
        cache: true,
        success: function(data) {
            jQuery('#profilecontacts_list .admins').html(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
        
    });
}

function showContactsStudentsMsm(){
    jQuery.ajax({
        type: 'GET',
        url: 'getProfileContactsStudentsMsm',
        cache: true,
        success: function(data) {
            jQuery('#profilecontacts_list .students').html(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + " " + errorThrown);
        }
        
    });
}

function showContactsTeachersMsm(){
    stringDataTeachers = '';
    jQuery.ajax({
        method: 'GET',
        url: 'getProfileContactsTeachersMsm',
        cache: true,
        success: function(data) {
            jQuery('#profilecontacts_list .teachers').html(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
           
    });
}

function enviarMsg(){

    var date = new Date();
    var hh = date.getHours();
    var mm = date.getMinutes();
    if( hh < 10 ){ hh = '0' + hh; }
    if( mm < 10 ){ mm = '0' + mm; }
    var currentTime = hh + ':' + mm;

    var lobbyScope = jQuery('#lobbyScope').val();
    var msmText = jQuery('#newmsm').val();

    if(msmText != null && msmText.trim() != ''){

        socket.emit('mensaje', {
            
            userEmail: sessionUser,
            userName: sessionUserName,
            userLastName: sessionUserLastName,
            userPhoto: sessionUserPhoto,
            messageText: msmText,
            messageTime: currentTime   

        });    

        jQuery.ajax({ 
            type: 'post',
            url: '/insertNewMessage',
            data: {
                messageBody : jQuery('#newmsm').val(),
                lobbyBody : jQuery('#lobbyScope').val()
            },
            success: function(data) {
                jQuery('#newmsm').focus().val('');
                showLobbies();
            },
            error: function(request, status, error){
                console.log(error);
            }
        });

        //Contenedor de mensajes
        var container = jQuery('#msm_list');

        var lastRightMsm = jQuery('#msm_list .msm_block:last-child').find('.rightmsm').length;

        if(lastRightMsm > 0){
            container.find('.msm_block:last-child').find('.msm_text')
                .append('<div class="colhh1 autooverflow">'
                        +   '<div class="rightmsm bg_white">'
                        +       '<div class="pd_12"> '
                        +           htmlspecialchars(msmText)
                        +           '<span class="msm_date">'
                        +               '<label class="lobby_time" title="Hace un momento"> ' + currentTime + '</label>'
                        +           '</span>'
                        +       '</div>'
                        +   '</div>'
                        +'</div>');
        }
        else{
            container.append('<div class="colhh1 margin_bot msm_block">'
                            +   '<div class="msm_text">'
                            +       '<div class="colhh1 autooverflow">'
                            +           '<div class="rightmsm bg_white">'
                            +               '<i></i>'
                            +               '<div class="pd_12"> '
                            +                   htmlspecialchars(msmText)
                            +                   '<span class="msm_date">'
                            +                       '<label class="lobby_time" title="Hace un momento"> ' + currentTime + '</label>'
                            +                   '</span>'
                            +               '</div>'
                            +           '</div>'
                            +       '</div>'
                            +   '</div>'
                            +   '<div class="msm_img">'
                            +       '<img src="profile_photos/' + sessionUserPhoto + '.png" title="' + sessionUserName + ' ' + sessionUserLastName + '\n' + sessionUser + '" class="circle">'
                            +   '</div>'
                            + '</div>');
        }
    }
    else{
        alert('¡El mensaje no puede estar vacío!');
    }

    jQuery('.msm_innercontent').animate({
        scrollTop: jQuery('.msmscrollflag').height()
    });

}

jQuery(document).ready(function(){
    
    setTimeout(showLobbies, 1000);

    jQuery('#new_item').click(function(){
        showContactsAdministratorsMsm();
        showContactsStudentsMsm();
        showContactsTeachersMsm();
    });

    jQuery('#newmsm').keyup(function(){
        if(jQuery(this).val() != null && jQuery(this).val().trim() != ''){
            jQuery('.msminput input[type="submit"]')
                .removeClass('bg_send')
                .addClass('bg_sendwhite flat_shadow')
                .removeAttr('disabled');
        }
        else{
            jQuery('.msminput input[type="submit"]')
                .removeClass('bg_sendwhite flat_shadow')
                .addClass('bg_send bg_lightblue')
                .attr('disabled', 'disabled');
        }
    });

    jQuery('#msm_textarea').keyup(function(){
        if(jQuery(this).val() != null && jQuery(this).val().trim() != ''){
            jQuery('#hidmsm_img')
                .removeClass('bg_send')
                .addClass('bg_sendactive');
            jQuery('#sendInputMsm').removeAttr('disabled');
        }
        else{
            jQuery('#hidmsm_img')
                .removeClass('bg_sendactive')
                .addClass('bg_send');
            jQuery('#sendInputMsm').attr('disabled', 'disabled');
        }
    });

    jQuery('form#addNewMsm').submit(function(event){
        event.preventDefault();

        if(jQuery(this).find('input#lobbyScope').val() != null && jQuery(this).find('input#lobbyScope').val().trim() != ''){
            enviarMsg();
        }
        else{
            alert('Seleccione una conversación')
        }
    });

    jQuery('#newmsm').click(function(){
        jQuery('.msm_innercontent').animate({
            scrollTop: jQuery('.msmscrollflag').height()
        });
    });

    //OBTIENE LA ALTURA ORIGINAL DEL INPUT DONDE SE AGREGAN MAS USUARIOS
    var origHeight =  jQuery('#search_newmsmcontacts').outerHeight();
    jQuery('.msm_sendtocontainer #msm_addperson').hide();

    jQuery('#msm_textarea').focus(function(){
        if(jQuery('.msm_sendtocontainer .msm_sendtocontact').length > 0){
            jQuery('#search_newmsmcontacts').css('height', '0');
            jQuery('#contacts_to_send').css('margin-top', '-10px');
            jQuery('.msm_sendtocontainer #msm_addperson').show();
            jQuery('#msm_contactscontainer').hide();
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
        jQuery('#msm_contactscontainer').show();
    });

    //FILTRAR CONTACTOS A PARTIR DE BUSQUEDA
    jQuery('#search_newmsmcontacts').keyup(function(){

        var currentQuery = jQuery('#search_newmsmcontacts').val().toUpperCase();

        jQuery('#msm_contactscontainer .listitem').hide();
        jQuery('#msm_contactscontainer .no_result').html('<div class="pd_24">No hay resultados para: "' + jQuery('#search_newmsmcontacts').val() + '"</div>');
            
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
        }
    });

    jQuery('form#newMsmForm').submit(function(event){
        if(jQuery('.msm_sendtocontainer .msm_sendtocontact').length < 1){
            alert('Debe agregar a algun usuario para enviar el mensaje');
            return false;
        }
    });

    jQuery(document).ajaxComplete(function(){
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

        jQuery('.block_containermsm .listitem').on('click', function(){
            var title = jQuery(this).attr('data-name');
            var title2 = jQuery(this).attr('data-title');
            var cloneImg = jQuery(this).find('.listitem_img').html();
            if( jQuery(window).width() < 1120 ){
                jQuery('.block_containermsm').animate({ scrollLeft: jQuery('.halfgrid').width() });
                jQuery('#new_item').hide();
            }
            jQuery('.msmtopname label').text(title);
            jQuery('.msmtopname label').attr('title', title2);
            jQuery('#msm_userimg').html(cloneImg);
        });

        addUsersToLobby();

    });

    setTimeout(function(){
        jQuery('.listitem').first().trigger('click');
    }, 1300);

});

function addUsersToLobby(){
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
                    + '<div class="name bgprimary_colorDarker white_text v_middle">' + name + '</div>'
                    + '</div>';

        if( jQuery('.msm_sendtocontainer').find('.msm_sendtocontact[data-email="' + email + '"]').length == 0 ){
            //AGEGAR USUARIO AL LOBBY
            jQuery('.msm_sendtocontainer').prepend(html);
            jQuery('#hidden_inputsendto').val(jQuery('#hidden_inputsendto').val() + email + ',');
        }

        jQuery('#search_newmsmcontacts').val('').focus();

        jQuery('.msm_sendtocontact').hover(function(){
            jQuery(this).find('.msm_sendtoremove').show();
        }, function(){
            jQuery(this).find('.msm_sendtoremove').hide();
        });


        var origHeight =  jQuery('#search_newmsmcontacts').outerHeight();
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
}
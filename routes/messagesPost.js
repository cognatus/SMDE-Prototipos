var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}

exports.insertLobby = function(req, res){

	var now = new Date();
	var dd = now.getDate();
	var mm = now.getMonth() + 1;
	var yyyy = now.getFullYear();
	var hh = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	var milsec = now.getMilliseconds();
	var time = dd + '' + mm + '' + yyyy + '_' + hh + '' + min + '' + sec + '' + milsec;

	var database = new base();
	var stringQuery2 = '';
	//OBTIENE LA CADENA DE TEXTO DE LOS USUARIOS PARA LA LOBBY
	var lobbyUsers = req.body.insetUsersLobby;
	var message = req.body.insertNewLobbyMsm;
	var owner = req.session.datos[0].userEmail;
	//SEPARA A LOS USUARIOS A PARTIR DE UN ELEMENTO SEPARADOR
	var usersArray = lobbyUsers.split(',');
	//ELIMINA EL ULTIMO ELEMENTO YA QUE SE MANDA NULO EN LA ULTIMA POSICION DEL ARREGLO
	usersArray.pop();
	usersArray.push(owner);

	var uniqueId = 'l0b8Y' + Math.floor((Math.random() * 596501699) + 16985689) + '-' + time;

	stringQuery = 'BEGIN;';

	stringQuery += 'INSERT INTO Lobby (idLobby, lobbyLastUpdate) VALUES ("' + uniqueId + '", NOW());';

	for ( var i = 0; i < usersArray.length; i++ ) {
			stringQuery += 'INSERT INTO User_has_Lobby (User_userEmail, Lobby_idLobby)'
						+ ' VALUES ("' + usersArray[i] + '", "' + uniqueId + '");';
	}

	stringQuery += 'INSERT INTO Message'
				+ ' (idMessage, messageText, messageDateTime, messageStatus, Lobby_idLobby, User_userEmail)'
				+ ' VALUES (UUID(),'
				+ ' "' + message + '",'
				+ ' NOW(), 1, "' + uniqueId + '",'
				+ ' "' + owner + '");';

	stringQuery += 'COMMIT;';+

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Nueva sala creada correctamente con ' + usersArray.length + ' Usuarios');
			console.log(stringQuery);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al inscribir Curso',
					errorItem: ['-  Problemas con el servidor',
					'-  Posiblemente algun dato enviado es nulo o incorrecto'],
					backUrl: '/subjects'
				}
			});
		}
	});
};

//FUNCION PARA OBTENER LAS LOBBIES DEL USUARIO
exports.getLobbiesDatabase = function(req, res){
	var database = new base();

	stringQuery = 'SELECT idLobby, DATE_FORMAT(lobbyLastUpdate, "%d/%m/%Y") AS lobbyDate,'
				+ ' DATE_FORMAT(lobbyLastUpdate, "%H:%i") AS lobbyHour,'
				+ ' group_concat(User_userEmail separator ", ") AS participantsEmails,'
				+ ' group_concat(userName, " ", userLastName separator ", ") AS participantsNames '
				+ ' FROM user_has_lobby AS uhl '
				+ ' INNER JOIN User AS u '
				+ ' 	ON u.userEmail = uhl.User_userEmail '
				+ ' INNER JOIN Lobby AS l '
				+ ' 	ON l.idLobby = uhl.Lobby_idLobby '
				+ ' WHERE Lobby_idLobby IN '
				+ ' 	( '
				+ '			SELECT Lobby_idLobby  '
				+ '       	FROM user_has_lobby '
				+ '       	WHERE User_userEmail = "' + req.session.datos[0].userEmail + '" '
				+ '   	) '
				+ ' AND User_userEmail != "' + req.session.datos[0].userEmail + '"  '
				+ ' GROUP BY Lobby_idLobby; ';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			lobbyData = result;
			res.send(lobbyData);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};

//FUNCION PARA OBTENER LAS LOBBIES DEL USUARIO
exports.getSelectedLobby = function(req, res){
	var database = new base();

	var lobbyId //Con lo que se obtendra la lobby seleccionada;

	stringQuery = 'SELECT * '
				+ ' FROM Message '
				+ ' WHERE Lobby_idLobby = "' + lobbyId + '"; ';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			selectedLobbyData = result;
			res.send(selectedLobbyData);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};
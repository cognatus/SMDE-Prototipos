var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}

exports.insertLobby = function(req, res){
	//OBTIENE LA CADENA DE TEXTO DE LOS USUARIOS PARA LA LOBBY
	var lobbyUsers = req.body.insetUsersLobby;
	var owner = req.session.datos[0].userEmail
	//SEPARA A LOS USUARIOS A PARTIR DE UN ELEMENTO SEPARADOR
	var usersArray = lobbyUsers.split(',');
	//ELIMINA EL ULTIMO ELEMENTO YA QUE SE MANDA NULO EN LA ULTIMA POSICION DEL ARREGLO
	usersArray.pop();

	stringQuery = 'BEGIN;';

	stringQuery += 'INSERT INTO Lobby (idLobby) VALUES(UUID());';

	var idLobby = 'Algo para obtener el mismo id de la lobby generada xD';

	stringQuery += 'INSERT INTO User_has_Lobby (User_userEmail, Lobby_idLobby)'
				+ ' VALUES ("' + owner + '", "' + idLobby + '");';

	for (var i = 0; i< usersArray.lenght; i++) {
		stringQuery += 'INSERT INTO User_has_Lobby (User_userEmail, Lobby_idLobby)'
					+ ' VALUES ("' + usersArray[i] + '", "' + idLobby + '");';
	}

	stringQuery += 'COMMIT;';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Nueva sala insertada correctamente con ' + usersArray.lenght + ' usuarios');
			res.redirect('/messages');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.redirect('/error');
		}
	});
};

//FUNCION PARA OBTENER LAS LOBBIES DEL USUARIO
exports.getLobbiesDatabase = function(req, res){

	stringQuery = 'SELECT * FROM Lobby AS l'
				+ ' INNER JOIN User_has_Lobby AS uhl'
				+ ' 	ON l.idLobby = uhl.Lobby_idLobby'
				+ ' INNER JOIN User AS u'
				+ ' 	ON u.userEmail = uhl.User_userEmail';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			lobbyData = result;
			res.send(lobbyData);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.redirect('/error');
		}
	});
};
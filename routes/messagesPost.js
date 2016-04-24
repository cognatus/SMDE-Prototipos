var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}

exports.insertLobby = function(req, res){
	//OBTIENE LA CADENA DE TEXTO DE LOS USUARIOS PARA LA LOBBY
	var lobbyUsers = req.body.insetUsersLobby;
	var separador = ',';
	//SEPARA A LOS USUARIOS A PARTIR DE UN ELEMENTO SEPARADOR
	var usersArray = lobbyUsers.split(separador);
	//ELIMINA EL ULTIMO ELEMENTO YA QUE SE MANDA NULO EN LA ULTIMA POSICION DEL ARREGLO
	var index = usersArray.indexOf('');
	usersArray.splice(index, 1);

	stringQuery = 'BEGIN;';

	stringQuery += 'INSER INTO Lobby (idLobby) VALUES(UUID());';

	var idLobby = 'Algo para obtener el mismo id de la lobby generada xD'

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
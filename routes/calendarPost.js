var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}


//Esta parte esta super cabrona
exports.insertReminder = function(req, res){
	
	// var reminderIdKey; No se que ponerle xD
	var reminderTitle = req.body.insertRemindertTitle ;
	var reminderText  = req.body.insertRemindertText ;
	/*var reminderTime =  time + ' ' + hour;*/
	var reminderDateTime =  'NOW()';
	var remDay = req.body.formCalendarDay;
	var remMonth = req.body.formCalendarMonth;
	var remYear = req.body.formCalendarYear;
	var remHour = req.body.formCalendarHour;
	var remMinutes = req.body.formCalendarMinutes;
	
	var reminderLimitDate = remYear + '-' + remMonth + '-' + remDay + ' ' + remHour + ':' + remMinutes + ':00' ;
	var reminderOwner = req.session.datos[0].userEmail;
	var notifUrl= ''; //Tampoco se que poner aqui esta muy cabron esto maigo

	stringQuery = 'BEGIN;'
	stringQuery += 'INSERT INTO Reminder' 
					+ ' (idReminder, reminderTitle, reminderText, reminderDateTime, reminderLimitDate, User_userEmail)'
					+ ' VALUES ("' + reminderIdKey + '",'
					+ ' "' + reminderTitle + '",'
					+ ' "' + reminderText + '",'
					+ ' "' + reminderDateTime + '",'
					+ ' "' + reminderLimitDate + '",'
					+ ' "' + reminderOwner + '");';
	stringQuery += 'INSERT INTO Notification' 
					+ ' (idNotification, notifTitle, notifText, notifDateTime, notifZelda)'
					+ ' VALUES ("' + reminderIdKey + '",'
					+ ' "Nueva Publicación",'
					+ ' "Un profesor creo una nueva Publicación",'
					+ ' "' + reminderDateTime + '",'
					+ ' "' + notifUrl + '");';
	stringQuery += 'COMMIT;'

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Furulo el insert');
			res.redirect('/management');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR RECORDATORIOS DEL USUARIO
exports.getRemindersDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT * FROM Reminder'
				+ ' WHERE User_userEmail="' + req.session.datos[0].userEmail + '";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR PUBLICACIONES DEL PROFESOR
exports.getPublicationsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT * FROM Publication'
				+ ' WHERE Teacher_User_userEmail="' + req.session.datos[0].Institute_idInstitute + '";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};

/*// FUNCION PARA MOSTRAR PUBLICACIONES Al ALUMNO
exports.getStudentsPublicationsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT * FROM Publication'
				+ ' WHERE Institute_idInstitute="' + req.session.datos[0].Institute_idInstitute + '";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};*/
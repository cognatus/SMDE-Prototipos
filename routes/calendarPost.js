var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}


//FUNCION PARA INSERTAR UN NUEVO RECORDATORIO
exports.insertReminder = function(req, res){
	var database = new base();

	var reminderTitle = req.body.formCalendarTitle ;
	var reminderText  = req.body.formCalendarComment ;
	var day = req.body.formCalendarDay;
	var month = req.body.formCalendarMonth;
	var year = req.body.formCalendarYear;
	var hour = req.body.formCalendarHour;
	var minutes = req.body.formCalendarMinute;
	
	var reminderLimitDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':00' ;
	var reminderOwner = req.session.datos[0].userEmail;

	stringQuery = 'BEGIN;'
	stringQuery += 'INSERT INTO Reminder' 
					+ ' (idReminder, reminderTitle, reminderText, reminderDateTime, reminderLimitDate, User_userEmail)'
					+ ' VALUES (UUID(),'
					+ ' "' + reminderTitle + '",'
					+ ' "' + reminderText + '",'
					+ ' NOW(),'
					+ ' "' + reminderLimitDate + '",'
					+ ' "' + reminderOwner + '");';
	stringQuery += 'COMMIT;'

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Nuevo recordatorio insertado correctamente');
			res.redirect('/calendar');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al insertar Publicación',
					errorItem: ['-  Fecha Incorrecta',
					'-  Problemas con el Servidor'],
					backUrl: '/calendar'
				}
			});
		}
	});
};

//FUNCION PARA INSERTAR UNA NUEVA PUBLICACIÓN
exports.insertPublication = function(req, res){
	var database = new base();
	
	var publicationTitle = req.body.formCalendarTitle;
	var publicationText  = req.body.formCalendarComment;
	//OBTENERMOS EL CURSO AL QUE QUEREMOS PUBLICAR
	var course = req.body.calendarCourseSelectField; 
	var day = req.body.formCalendarDay;
	var month = req.body.formCalendarMonth;
	var year = req.body.formCalendarYear;
	var hour = req.body.formCalendarHour;
	var minutes = req.body.formCalendarMinute;
	//SEPARAMOS EL idSubject del idCourse POR QUE SE MANDAN EN UNA SOLA CADENA DE TEXTO
	var subjectCourse = course.split('/');
	
	var publicationLimitDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':00' ;
	var publicationOwner = req.session.datos[0].userEmail;

	stringQuery = 'BEGIN;'
	stringQuery += 'INSERT INTO Publication' 
					+ ' (idPublication, pubTitle, pubText, pubDateTime, publicationLimitDate, Teacher_User_userEmail,'
					+ ' Subject_has_Course_Subject_idSubject, Subject_has_Course_Course_idCourse)'
					+ ' VALUES (UUID(),'
					+ ' "' + publicationTitle + '",'
					+ ' "' + publicationText + '",'
					+ ' NOW(),'
					+ ' "' + publicationLimitDate + '",'
					+ ' "' + publicationOwner + '",'
					//			idSubject 					idCourse
					+ ' "' + subjectCourse[0] + '", "' + subjectCourse[1] + '");';
	stringQuery += 'COMMIT;'

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Nueva Publicación insertada correctamente');
			res.redirect('/calendar');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al insertar Publicación',
					errorItem: ['-  Fecha Incorrecta',
					'-  Problemas con el Servidor'],
					backUrl: '/calendar'
				}
			});
		}
	});
};

// FUNCION PARA MOSTRAR RECORDATORIOS DEL USUARIO
exports.getRemindersDatabase = function(req, res){
	var database = new base();

	stringQuery = 'SELECT idReminder, reminderTitle, reminderText,'
				+ '	DATE_FORMAT(reminderDateTime, "%d/%m/%Y") AS reminderDate, DATE_FORMAT(reminderDateTime, "%H:%i") AS reminderTime,'
				+ '	DATE_FORMAT(reminderLimitDate, "%d/%m/%Y") AS reminderLimDate, DATE_FORMAT(reminderLimitDate, "%H:%i") AS reminderLimTime'
				+ ' FROM Reminder '
				+ ' WHERE User_userEmail="' + req.session.datos[0].userEmail + '";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			remindersData = result;
			res.send(remindersData);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.send('Error');
		}
	});
};

// FUNCION PARA MOSTRAR PUBLICACIONES QUE HACE EL PROFESOR
exports.getPublicationsDatabase = function(req, res){
	var database = new base();

	//SI EL USUARIO ES TIPO ALUMNO
	if(req.session.privilegio == 1){
		stringQuery = 'SELECT idPublication, pubTitle, pubText, publicationAttachedNameFile,'
					+ '	DATE_FORMAT(pubDateTime, "%d/%m/%Y") AS pubDate, DATE_FORMAT(pubDateTime, "%H:%i") AS pubTime,'
					+ '	DATE_FORMAT(publicationLimitDate, "%d/%m/%Y") AS pubLimDate, DATE_FORMAT(publicationLimitDate, "%H:%i") AS pubLimTime,'
					+ '	userName, userLastName, userSecondLastName, userEmail, subjectName, courseName'
					+ '		FROM Publication AS p '
					+ '		INNER JOIN Teacher AS t '
					+ '			ON t.User_userEmail = p.Teacher_User_userEmail '
					+ '		INNER JOIN User AS u '
					+ '			ON u.userEmail = t.User_userEmail '
					+ '		INNER JOIN Subject_has_Course AS shc '
					+ '			ON shc.Subject_idSubject = p.Subject_has_Course_Subject_idSubject '
					+ '			AND shc.Course_idCourse = p.Subject_has_Course_Course_idCourse '
					+ '		INNER JOIN Subject AS s '
					+ '			ON s.idSubject = shc.Subject_idSubject '
					+ '		INNER JOIN Course As c '
					+ '			On c.idCourse = shc.Course_idCourse '
					+ '	WHERE (p.Subject_has_Course_Subject_idSubject, p.Subject_has_Course_Course_idCourse) IN '
					+ ' 	( '
					+ '			SELECT Subject_has_Course_Subject_idSubject, Subject_has_Course_Course_idCourse '
					+ '			FROM Student_has_Subject_has_Course '
					+ '            WHERE Student_idStudent = "' + req.session.datos[0].idStudent + '"'
					+ ' 	) '
					+ ' GROUP BY idPublication; ';
	}
	//SI EL USUARIO ES TIPO PROFESOR
	else if(req.session.privilegio == 2){
		stringQuery = 'SELECT idPublication, pubTitle, pubText, publicationAttachedNameFile,'
					+ '	DATE_FORMAT(pubDateTime, "%d/%m/%Y") AS pubDate, DATE_FORMAT(pubDateTime, "%H:%i") AS pubTime,'
					+ '	DATE_FORMAT(publicationLimitDate, "%d/%m/%Y") AS pubLimDate, DATE_FORMAT(publicationLimitDate, "%H:%i") AS pubLimTime,'
					+ '	userName, userLastName, userSecondLastName, userEmail, subjectName, courseName'
					+ '		FROM Publication AS p '
					+ '		INNER JOIN Teacher AS t '
					+ '			ON t.User_userEmail = p.Teacher_User_userEmail '
					+ '		INNER JOIN User AS u '
					+ '			ON u.userEmail = t.User_userEmail '
					+ '		INNER JOIN Subject_has_Course AS shc '
					+ '			ON shc.Subject_idSubject = p.Subject_has_Course_Subject_idSubject '
					+ '			AND shc.Course_idCourse = p.Subject_has_Course_Course_idCourse '
					+ '		INNER JOIN Subject AS s '
					+ '			ON s.idSubject = shc.Subject_idSubject '
					+ '		INNER JOIN Course As c '
					+ '			On c.idCourse = shc.Course_idCourse '
					+ '	WHERE (p.Subject_has_Course_Subject_idSubject, p.Subject_has_Course_Course_idCourse) IN '
					+ ' 	( '
					+ '			SELECT Subject_has_Course_Subject_idSubject, Subject_has_Course_Course_idCourse '
					+ '			FROM Teacher_has_Subject_has_Course '
					+ '            WHERE Teacher_idTeacher = "' + req.session.datos[0].idTeacher + '"'
					+ ' 	) '
					+ ' GROUP BY idPublication; ';
	}

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			publicationsData = result;
			res.send(publicationsData);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.send('Error');
		}
	});
};
var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}

exports.setProfileTheme = function(req, res){
	var database = new base();
	var isChecked = req.body.changeTheme;

	stringQuery = 'UPDATE User SET darkTheme=1'
		+ ' WHERE userEmail="' + req.session.datos[0].userEmail + '";' ;	
	
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Cambio de tema correctamento');
			res.redirect('/settings');
		}else{
			console.log('Error en esta sentencia: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};

exports.setProfileMsmColor = function(req, res){
	var database = new base();
	var msmColor = req.body.msmValueColor;
	stringQuery = 'UPDATE User SET msmColor="' + msmColor + '"'
	+ ' WHERE userEmail="' + req.session.datos[0].userEmail + '";';
	
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Cambio de color correcto');
			res.redirect('/settings');
		}else{
			console.log('Error en esta sentencia: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});	
};

// FUNCION PARA MOSTRAR MATERIAS DE PROFESOR DE LA BASE DE DATOS
exports.getProfileSubjectsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT idTeacher, idSubject, subjectName, subjectLevel, courseName'
					+ ' FROM User as u'
					+ ' INNER JOIN Teacher as s'
					+ '     ON u.userEmail = s.User_userEmail'
					+ ' INNER JOIN Teacher_has_Subject_has_Course as ss'
					+ '     ON s.idTeacher = ss.Teacher_idTeacher'
					+ ' INNER JOIN Subject_has_Course as sc'
					+ '     ON ss.Subject_has_Course_Subject_idSubject = sc.Subject_idSubject'
					+ '		AND ss.Subject_has_Course_Course_idCourse = sc.Course_idCourse'
					+ ' INNER JOIN Subject as su'
					+ '     ON sc.Subject_idSubject = su.idSubject'
					+ ' INNER JOIN Course as c'
					+ '     ON sc.Course_idCourse = c.idCourse'
					+ ' WHERE u.userEmail="' + req.session.datos[0].userEmail + '";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};

// FUNCION PARA MOSTRAR CONTACTOS (ESTUDIANTES)
exports.getProfileContactsStudents = function(req, res){
	var database = new base();
	stringQuery = 'SELECT userName, userLastName, userSecondLastName, Subject.*, Course.*'
					+ ' FROM Subject AS su'
					+ ' INNER JOIN Subject_has_Course AS shc'
					+ ' 	ON sch.Subject_idSubject = su.idSubject'
					+ ' INNER JOIN Course AS c'
					+ ' 	ON c.idCourse = shc.Course_idCourse'
					+ ' INNER JOIN Student_has_Subject_has_Course AS shshc'
					+ ' 	ON shshc.Subject_has_Course_Subject_idSubject = shc.Subject_idSubject'
					+ ' 	AND shshc.Subject_has_Course_Course_idCourse = shc.Course_idCourse'
					+ ' INNER JOIN Student AS s'
					+ ' 	ON s.idStudent = shshc.Student_idStudent'
					+ ' INNER JOIN User AS u'
					+ ' 	ON u.userEmail = s.User_userEmail'
					+ ' WHERE u.User_userEmail = ' + req.session.datos[0].userEmail + ';';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};

// FUNCION PARA MOSTRAR CONTACTOS (ESTUDIANTES)
exports.getProfileContactsTeachers = function(req, res){
	var database = new base();
	stringQuery = 'SELECT userName, userLastName, userSecondLastName, Subject.*, Course.*'
					+ ' FROM User AS u'
					+ ' INNER JOIN Student AS s'
					+ '     ON u.userEmail = s.User_userEmail'
					+ ' INNER JOIN Teacher_has_Subject_has_Course AS ss'
					+ '     ON s.idTeacher = ss.Teacher_idTeacher'
					+ ' INNER JOIN Subject_has_Course AS sc'
					+ '     ON ss.Subject_has_Course_Subject_idSubject = sc.Subject_idSubject'
					+ '		AND ss.Subject_has_Course_Course_idCourse = sc.Course_idCourse'
					+ ' INNER JOIN Subject AS su'
					+ '     ON sc.Subject_idSubject = su.idSubject'
					+ ' INNER JOIN Course AS c'
					+ '     ON sc.Course_idCourse = c.idCourse'
					+ ' WHERE u.userEmail="' + req.session.datos[0].userEmail + '";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};
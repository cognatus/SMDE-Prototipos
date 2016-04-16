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

// FUNCION PARA MOSTRAR MATERIAS DE ALUMNO DE LA BASE DE DATOS
exports.getProfileSubjectsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT userEmail, idStudent, subjectName, idSubject, idCourse, courseName, departmentName'
				+ ' FROM User AS u'
				+ ' INNER JOIN Student AS s'
				+ ' 	ON u.userEmail = s.User_userEmail'
				+ ' INNER JOIN Student_has_Subject_has_Course AS shshc'
				+ ' 	ON shshc.Student_idStudent = s.idStudent'
				+ ' INNER JOIN Subject_has_Course AS shc'
				+ ' 	ON shshc.Subject_has_Course_Subject_idSubject = shc.Subject_idSubject'
				+ ' 	AND shshc.Subject_has_Course_Course_idCourse = shc.Course_idCourse'
				+ ' INNER Join Subject AS su'
				+ ' 	ON su.idSubject = shc.Subject_idSubject'
				+ ' INNER JOIN Course AS c '
				+ ' 	ON c.idCourse = shc.Course_idCourse'
				+ ' INNER JOIN Department AS d '
				+ ' 	ON d.idDepartment = su.Department_idDepartment'
				+ ' WHERE userEmail = "' + req.session.datos[0].userEmail + '";';
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

	//SI EL USUARIO ES TIPO ALUMNO
	stringQuery= 'SELECT userEmail, userName, userLastName, userSecondLastName, subjectName, courseName '
				'FROM Student_has_Subject_has_Course a '
				'	JOIN Student_has_Subject_has_Course b '
				'		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
				'		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
				'		AND a.Student_idStudent != b.Student_idStudent '
				'	INNER JOIN Subject as sub '
				'		ON sub.idSubject = a.Subject_has_Course_Subject_idSubject '
				'	INNER JOIN Course as c '
				'		ON c.idCourse = a.Subject_has_Course_Course_idCourse '
				'	INNER JOIN Student as s '
				'		ON s.idStudent = a.Student_idStudent '
				'	INNER JOIN User as u '
				'		ON u.userEmail = s.User_userEmail '
				'	WHERE userEmail != "' + req.session.datos[0].userEmail + '";' 

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

	//SI EL USUARIO ES TIPO PROFESOR
	stringQuery = 'SET @tipo = "' + req.session.datos[0].userEmail + '"'
			+ ' SELECT idTeacher, userEmail,'
			+ ' 	@course := `Subject_has_Course_Course_idCourse`, @subject := `Subject_has_Course_Subject_idSubject`'
			+ ' 	FROM Teacher_has_Subject_has_Course AS shshc'
			+ '     INNER JOIN Teacher AS s '
			+ ' 		ON s.idTeacher = shshc.Teacher_idTeacher'
			+ ' 	INNER JOIN User AS u'
			+ ' 		ON u.userEmail = s.User_userEmail'
			+ ' 	WHERE userEmail = @tipo;'
			+ ' SELECT userEmail, userName, userLastName, userSecondLastName'
			+ ' 	FROM Teacher_has_Subject_has_Course AS shshc'
			+ '     INNER JOIN Teacher AS s '
			+ ' 		ON s.idTeacher = shshc.Teacher_idTeacher'
			+ ' 	INNER JOIN User AS u'
			+ ' 		ON u.userEmail = s.User_userEmail'
			+ ' 	WHERE Subject_has_Course_Course_idCourse = @course AND Subject_has_Course_Subject_idSubject = @subject'
			+ ' 	AND userEmail != @tipo; ';
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};
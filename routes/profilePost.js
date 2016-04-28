var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}

exports.setProfileTheme = function(req, res){
	var database = new base();
	var theme = req.session.datos[0].darkTheme;

	if(theme == 0){
		stringQuery = 'UPDATE User SET darkTheme = 1'
			+ ' WHERE userEmail="' + req.session.datos[0].userEmail + '";' ;
		req.session.datos[0].darkTheme = 1;
	}
	if(theme == 1){
		stringQuery = 'UPDATE User SET darkTheme = 0'
			+ ' WHERE userEmail="' + req.session.datos[0].userEmail + '";' ;
		req.session.datos[0].darkTheme = 0;
	}
	
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Cambio de tema correctamente');
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
	req.session.datos[0].msmColor = msmColor;
	
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

// FUNCION PARA MOSTRAR MATERIAS DE PERFIL DE LA BASE DE DATOS
exports.getProfileSubjectsDatabase = function(req, res){
	var database = new base();

	//SI EL USUARIO ES TIPO ALUMNO
	if(req.session.privilegio == 1){
		stringQuery = 'SELECT subjectName, courseName, subjectLevel, departmentName'
					+ ' FROM User AS u'
					+ ' INNER JOIN Student AS s'
					+ '     ON u.userEmail = s.User_userEmail'
					+ ' INNER JOIN Student_has_Subject_has_Course AS ss'
					+ '     ON s.idStudent = ss.Student_idStudent'
					+ ' INNER JOIN Subject_has_Course AS sc'
					+ '     ON ss.Subject_has_Course_Subject_idSubject = sc.Subject_idSubject'
					+ ' 	AND ss.Subject_has_Course_Course_idCourse = sc.Course_idCourse'
					+ ' INNER JOIN Subject AS su'
					+ '     ON sc.Subject_idSubject = su.idSubject'
					+ ' INNER JOIN Course AS c'
					+ '     ON sc.Course_idCourse = c.idCourse'
					+ ' INNER JOIN Department AS d'
					+ '     ON d.idDepartment = su.Department_idDepartment'
					+ ' WHERE u.userEmail  = "' + req.session.datos[0].userEmail + '"'
					+ ' ORDER BY su.subjectName ASC;'
	}
	//SI EL USUARIO ES TIPO PROFESOR
	else if(req.session.privilegio == 2){
		stringQuery = 'SELECT subjectName, courseName, subjectLevel, departmentName'
					+ ' FROM User AS u'
					+ ' INNER JOIN Teacher AS s'
					+ '     ON u.userEmail = s.User_userEmail'
					+ ' INNER JOIN Teacher_has_Subject_has_Course AS ss'
					+ '     ON s.idTeacher = ss.Teacher_idTeacher'
					+ ' INNER JOIN Subject_has_Course AS sc'
					+ '     ON ss.Subject_has_Course_Subject_idSubject = sc.Subject_idSubject'
					+ ' 	AND ss.Subject_has_Course_Course_idCourse = sc.Course_idCourse'
					+ ' INNER JOIN Subject AS su'
					+ '     ON sc.Subject_idSubject = su.idSubject'
					+ ' INNER JOIN Course AS c'
					+ '     ON sc.Course_idCourse = c.idCourse'
					+ ' INNER JOIN Department AS d'
					+ '     ON d.idDepartment = su.Department_idDepartment'
					+ ' WHERE u.userEmail  = "' + req.session.datos[0].userEmail + '"'
					+ ' ORDER BY su.subjectName ASC;'
	}

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			subjectsProfileData = result;
			res.send(subjectsProfileData);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};

// FUNCION PARA MOSTRAR CONTACTOS (ESTUDIANTES)
exports.getProfileContactsAdministrators = function(req, res){
	var database = new base();

	stringQuery = 'SELECT userName, userLastName, userSecondLastName, userEmail '
				+ ' FROM User AS u'
				+ ' INNER JOIN Administrator AS a ' 
				+ ' ON u.userEmail = a.User_userEmail '
				+ ' WHERE u.Institute_idInstitute="' + req.session.datos[0].Institute_idInstitute + '" '
				+ ' AND u.userEmail != "' + req.session.datos[0].userEmail + '";' ;

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			profileContactsAdministrators = result;
			res.send(profileContactsAdministrators);
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
	if(	req.session.privilegio == 1	){
		stringQuery = 'SELECT userName, userLastName, userSecondLastName, userEmail '
					+ ' FROM Student_has_Subject_has_Course a '
					+ '	JOIN Student_has_Subject_has_Course b '
					+ '		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
					+ '		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
					+ '		AND a.Student_idStudent != b.Student_idStudent '
					+ '	INNER JOIN Subject as sub '
					+ '		ON sub.idSubject = a.Subject_has_Course_Subject_idSubject '
					+ '	INNER JOIN Course as c '
					+ '		ON c.idCourse = a.Subject_has_Course_Course_idCourse '
					+ '	INNER JOIN Student as s '
					+ '		ON s.idStudent = b.Student_idStudent '
					+ '	INNER JOIN User as u '
					+ '		ON u.userEmail = s.User_userEmail '
					+ '	WHERE a.Student_idStudent = "' + req.session.datos[0].idStudent + '" '
					+ '	AND b.Student_idStudent != "' + req.session.datos[0].idStudent + '" '
					+ '	GROUP BY b.Student_idStudent;';
	}

	//SI EL USUARIO ES TIPO PROFESOR
	else if( req.session.privilegio == 2 ){
		stringQuery = 'SELECT userName, userLastName, userSecondLastName, userEmail '
					+ ' FROM Teacher_has_Subject_has_Course a '
					+ '	JOIN Student_has_Subject_has_Course b '
					+ '		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
					+ '		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
					+ '		AND a.Teacher_idTeacher != b.Student_idStudent '
					+ '	INNER JOIN Subject as sub '
					+ '		ON sub.idSubject = a.Subject_has_Course_Subject_idSubject '
					+ '	INNER JOIN Course as c '
					+ '		ON c.idCourse = a.Subject_has_Course_Course_idCourse '
					+ '	INNER JOIN Student as s '
					+ '		ON s.idStudent = b.Student_idStudent '
					+ '	INNER JOIN User as u '
					+ '		ON u.userEmail = s.User_userEmail '
					+ '	WHERE a.Teacher_idTeacher = "' + req.session.datos[0].idTeacher + '" '
					+ '	AND b.Student_idStudent != "' + req.session.datos[0].idTeacher + '" '
					+ '	GROUP BY b.Student_idStudent;';
	}

	// SI EL USUARIO ES TIPO ADMIN
	else if(req.session.privilegio == 3){
		stringQuery = 'SELECT userName, userLastName, userSecondLastName, userEmail '
				+ ' FROM User AS u '
				+ ' INNER JOIN Student AS s' 
				+ ' ON u.userEmail = s.User_userEmail'
				+ ' WHERE u.Institute_idInstitute="' + req.session.datos[0].Institute_idInstitute + '"' 
				+ ' ORDER BY userName ASC;';
	}

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			profileContactsStudents = result;
			res.send(profileContactsStudents);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR CONTACTOS (PROFESORES)
exports.getProfileContactsTeachers = function(req, res){
	var database = new base();

	//SI EL USUARIO ES TIPO AlUMNO
	if(req.session.privilegio == 1){
		stringQuery = 'SELECT userEmail, userName, userLastName, userSecondLastName '
					+ ' FROM Student_has_Subject_has_Course a '
					+ ' JOIN Teacher_has_Subject_has_Course b '
					+ ' 	ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
					+ ' 	AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
					+ ' 	AND a.Student_idStudent != b.Teacher_idTeacher '
					+ ' INNER JOIN Subject as sub '
					+ ' 	ON sub.idSubject = b.Subject_has_Course_Subject_idSubject '
					+ ' INNER JOIN Course as c '
					+ ' 	ON c.idCourse = b.Subject_has_Course_Course_idCourse '
					+ ' INNER JOIN Teacher as t '
					+ ' 	ON t.idTeacher = b.Teacher_idTeacher '
					+ ' INNER JOIN User as u '
					+ ' 	ON u.userEmail = t.User_userEmail '
					+ ' WHERE a.Student_idStudent = "' + req.session.datos[0].idStudent + '" '
					+ '    AND b.Teacher_idTeacher != "'  + req.session.datos[0].idStudent +  '" ';
					+ '	GROUP BY b.Teacher_idTeacher;';
	}

	//SI EL USUARIO ES TIPO PROFESOR
	else if(req.session.privilegio == 2){
		stringQuery = 'SELECT userEmail, userName, userLastName, userSecondLastName '
					+ ' FROM Teacher_has_Subject_has_Course a '
					+ ' JOIN Teacher_has_Subject_has_Course b '
					+ ' 	ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
					+ ' 	AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
					+ ' 	AND a.Teacher_idTeacher != b.Teacher_idTeacher '
					+ ' INNER JOIN Subject as sub '
					+ ' 	ON sub.idSubject = b.Subject_has_Course_Subject_idSubject '
					+ ' INNER JOIN Course as c '
					+ ' 	ON c.idCourse = b.Subject_has_Course_Course_idCourse '
					+ ' INNER JOIN Teacher as t '
					+ ' 	ON t.idTeacher = b.Teacher_idTeacher '
					+ ' INNER JOIN User as u '
					+ ' 	ON u.userEmail = t.User_userEmail '
					+ ' WHERE a.Teacher_idTeacher = "' + req.session.datos[0].idTeacher + '" '
					+ '    AND b.Teacher_idTeacher != "'  + req.session.datos[0].idTeacher +  '" ';
					+ '	GROUP BY b.Teacher_idTeacher;';
	}

	// SI EL USUARIO ES TIPO ADMIN
	else if(req.session.privilegio == 3){
		stringQuery = 'SELECT userName, userLastName, userSecondLastName, userEmail '
				+ ' FROM User AS u '
				+ ' INNER JOIN Teacher AS t' 
				+ ' ON u.userEmail = t.User_userEmail'
				+ ' WHERE u.Institute_idInstitute="' + req.session.datos[0].Institute_idInstitute + '"' 
				+ ' ORDER BY userName ASC;';
	}
	
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			profileContactsTeachers = result;
			res.send(profileContactsTeachers);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};

// FUNCION PARA MOSTRAR COINCIDENCIAS (ESTUDIANTES)
exports.getStudentCoincidences = function(req, res){
	var database = new base();
	var studentEmail = req.query.studentEmail;
	
	//SI EL USUARIO ES TIPO ALUMNO
	if(req.session.privilegio == 1){
		stringQuery = 'SELECT subjectName, courseName '
					+ ' FROM Student_has_Subject_has_Course a '
					+ '	JOIN Student_has_Subject_has_Course b '
					+ '		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
					+ '		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
					+ '		AND a.Student_idStudent != b.Student_idStudent '
					+ '	INNER JOIN Subject as sub '
					+ '		ON sub.idSubject = a.Subject_has_Course_Subject_idSubject '
					+ '	INNER JOIN Course as c '
					+ '		ON c.idCourse = a.Subject_has_Course_Course_idCourse '
					+ '	INNER JOIN Student as s '
					+ '		ON s.idStudent = b.Student_idStudent '
					+ '	INNER JOIN User as u '
					+ '		ON u.userEmail = s.User_userEmail '
					+ '	WHERE a.Student_idStudent = "' + req.session.datos[0].idStudent + '" '
					+ '	AND b.Student_idStudent != "' + req.session.datos[0].idStudent + '" '
					+ '	AND s.User_userEmail = "' + studentEmail + '"; ';
	}

	//SI EL USUARIO ES TIPO PROFESOR
	else if(req.session.privilegio == 2){
		stringQuery = 'SELECT subjectName, courseName '
					+ ' FROM Teacher_has_Subject_has_Course a '
					+ '	JOIN Student_has_Subject_has_Course b '
					+ '		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
					+ '		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
					+ '		AND a.Teacher_idTeacher != b.Student_idStudent '
					+ '	INNER JOIN Subject as sub '
					+ '		ON sub.idSubject = a.Subject_has_Course_Subject_idSubject '
					+ '	INNER JOIN Course as c '
					+ '		ON c.idCourse = a.Subject_has_Course_Course_idCourse '
					+ '	INNER JOIN Student as s '
					+ '		ON s.idStudent = b.Student_idStudent '
					+ '	INNER JOIN User as u '
					+ '		ON u.userEmail = s.User_userEmail '
					+ '	WHERE a.Teacher_idTeacher = "' + req.session.datos[0].idTeacher + '" '
					+ '	AND b.Student_idStudent != "' + req.session.datos[0].idTeacher + '" '
					+ '	AND s.User_userEmail = "' + studentEmail + '"; ';
	}

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			studentCoincidences = result;
			res.send(studentCoincidences);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};


// FUNCION PARA MOSTRAR COINCIDENCIAS (PROFESORES)
exports.getTeacherCoincidences = function(req, res){
	var database = new base();
	var teacherEmail = req.query.teacherEmail;

	//SI EL USUARIO ES TIPO ALUMNO
	if(req.session.privilegio == 1){
		stringQuery = 'SELECT subjectName, courseName '
					+ ' FROM Student_has_Subject_has_Course a '
					+ '	JOIN Teacher_has_Subject_has_Course b '
					+ '		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
					+ '		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
					+ '		AND a.Student_idStudent != b.Teacher_idTeacher '
					+ '	INNER JOIN Subject as sub '
					+ '		ON sub.idSubject = a.Subject_has_Course_Subject_idSubject '
					+ '	INNER JOIN Course as c '
					+ '		ON c.idCourse = a.Subject_has_Course_Course_idCourse '
					+ '	INNER JOIN Teacher as t '
					+ '		ON t.idTeacher = b.Teacher_idTeacher '
					+ '	INNER JOIN User as u '
					+ '		ON u.userEmail = t.User_userEmail '
					+ '	WHERE a.Student_idStudent = "' + req.session.datos[0].idStudent + '" '
					+ '	AND b.Teacher_idTeacher != "' + req.session.datos[0].idStudent + '" '
					+ '	AND t.User_userEmail = "' + teacherEmail + '"; ';
	}

	//SI EL USUARIO ES TIPO PROFESOR
	else if(req.session.privilegio == 2){
		stringQuery = 'SELECT subjectName, courseName '
					+ ' FROM Teacher_has_Subject_has_Course a '
					+ '	JOIN Teacher_has_Subject_has_Course b '
					+ '		ON a.Subject_has_Course_Subject_idSubject = b.Subject_has_Course_Subject_idSubject '
					+ '		AND a.Subject_has_Course_Course_idCourse = b.Subject_has_Course_Course_idCourse '
					+ '		AND a.Teacher_idTeacher != b.Teacher_idTeacher '
					+ '	INNER JOIN Subject as sub '
					+ '		ON sub.idSubject = a.Subject_has_Course_Subject_idSubject '
					+ '	INNER JOIN Course as c '
					+ '		ON c.idCourse = a.Subject_has_Course_Course_idCourse '
					+ '	INNER JOIN Teacher as t '
					+ '		ON t.idTeacher = b.Teacher_idTeacher '
					+ '	INNER JOIN User as u '
					+ '		ON u.userEmail = t.User_userEmail '
					+ '	WHERE a.Teacher_idTeacher = "' + req.session.datos[0].idTeacher + '" '
					+ '	AND b.Teacher_idTeacher != "' + req.session.datos[0].idTeacher + '" '
					+ '	AND t.User_userEmail = "' + teacherEmail + '"; ';
	}

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			teacherCoincidences = result;
			res.send(teacherCoincidences);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};
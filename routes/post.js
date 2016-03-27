var base;
var stringQuery = '';

exports.constructor = function (basee) {
	base = basee;
}


/*
 * POST Methods.
 */

 //FUNCION DE LOGIN GENERAL
exports.login = function(req, res){
	var database = new base();
	var userNameLogin = req.body.sign_user;
	var userPassLogin = req.body.sign_key;
	var i = 0;

	var consulta = function(){
		database.query(stringQuery, function(error, result, row){
			if(!error && result.length > 0) {
				req.session.datos = result;
				res.redirect('/main');
			}else if(i === 3){
				console.log('ni pedo dude')
				res.redirect('/error')
			}else{
				console.log('nope');
				which_vato(i++);
				consulta();
			}
		});
	};
	
	var which_vato = function(tipo){
		switch(tipo) {
			case 0:
				stringQuery = 'SELECT * FROM User INNER JOIN Administrator' 
				+ ' ON User.userEmail = Administrator.User_userEmail' 
				+ ' WHERE User.userEmail="' + userNameLogin + '" AND User.userPassword="' + userPassLogin + '";' ;
				req.session.privilegio = 0;
				break;
			case 1:
				stringQuery = 'SELECT * FROM User INNER JOIN Student' 
				+ ' ON User.userEmail = Student.User_userEmail' 
				+ ' WHERE User.userEmail="' + userNameLogin + '" AND User.userPassword="' + userPassLogin + '";' ;
				req.session.privilegio = 1;
				break;
			case 2:
				stringQuery = 'SELECT * FROM User INNER JOIN Teacher' 
				+ ' ON User.userEmail = Teacher.User_userEmail' 
				+ ' WHERE User.userEmail="' + userNameLogin + '" AND User.userPassword="' + userPassLogin + '";' ;
				req.session.privilegio = 2;
				break;
		}
	};

	which_vato(i);
	consulta();

};

//AGREGAR UN NUEVO USUARIO
exports.insertUser = function(req, res){
	var database = new base();
	var userType = req.body.insertUserType ;
	var userEmail = req.body.insertUserEmail ;
	var userName = req.body.insertUserName ;
	var userLastName = req.body.insertUserLastName ;
	var userSecondLastName = req.body.insertUserSecondLastName ;
	var userSex = req.body.insertUserSex ;
	var userPassword  = req.body.insertUserPassword ;
	var userInstitute = req.session.datos[0].Institute_idInstitute;

	stringQuery = 'INSERT INTO User' 
					+ ' (userEmail, userName, userLastName, userSecondLastName, userSex, userPassword, Institute_idInstitute)'
					+ ' VALUES ("' + userEmail + '",'
					+ ' "' + userName + '",'
					+ ' "' + userLastName + '",'
					+ ' "' + userSecondLastName + '",'
					+ ' "' + userSex + '",'
					+ ' "' + userPassword + '",'
					+ ' "' + userInstitute + '");';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			console.log('Furulo el insert');
			res.redirect('/management');
		}else{
			console.log('Error aqui en linea 94 post.js ' + error )
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR DATOS DE administradores DE LA BASE DE DATOS
exports.getAdministratorsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT *, idAdministrator FROM User INNER JOIN Administrator' 
				+ ' ON User.userEmail = Administrator.User_userEmail'
				+ ' WHERE Institute_idInstitute="'+req.session.datos[0].Institute_idInstitute+'";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR DATOS DE ALUMNOS DE LA BASE DE DATOS
exports.getStudentsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT *, idStudent FROM User INNER JOIN Student' 
				+ ' ON User.userEmail = Student.User_userEmail'
				+ ' WHERE Institute_idInstitute="'+req.session.datos[0].Institute_idInstitute+'";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR MATERIAS DE ALUMNOS DE LA BASE DE DATOS
exports.getStudentsSubjectsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT idStudent, subjectName, courseName'
					+ ' FROM User as u'
					+ ' INNER JOIN Student as s'
					+ '     ON u.userEmail = s.User_userEmail'
					+ ' INNER JOIN Student_has_Subject_has_Course as ss'
					+ '     ON s.idStudent = ss.Student_idStudent'
					+ ' INNER JOIN Subject_has_Course as sc'
					+ '     ON ss.Subject_has_Course_Subject_idSubject = sc.Subject_idSubject'
					+ '		AND ss.Subject_has_Course_Course_idCourse = sc.Course_idCourse'
					+ ' INNER JOIN Subject as su'
					+ '     ON sc.Subject_idSubject = su.idSubject'
					+ ' INNER JOIN Course as c'
					+ '     ON sc.Course_idCourse = c.idCourse'
					+ ' WHERE Institute_idInstitute="'+req.session.datos[0].Institute_idInstitute+'";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};

// FUNCION PARA MOSTRAR DATOS DE PROFESORES DE LA BASE DE DATOS
exports.getTeachersDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT *, idTeacher FROM User INNER JOIN Teacher' 
				+ ' ON User.userEmail = Teacher.User_userEmail'
				+ ' WHERE Institute_idInstitute="'+req.session.datos[0].Institute_idInstitute+'";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR MATERIAS DE Profesor DE LA BASE DE DATOS
exports.getTeachersSubjectsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT idTeacher, subjectName, courseName'
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
					+ ' WHERE Institute_idInstitute="'+req.session.datos[0].Institute_idInstitute+'";' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};
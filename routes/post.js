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
	var bandera = false;

	var consulta = function(){
		database.query(stringQuery, function(error, result, row){
			if(!error) {
				req.session.datos = result;
				bandera = true;
			}else{
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
			default:
				console.log('Error aqui')
				res.redirect('/error');
		}
	};

	which_vato(i);
	consulta();

	if(bandera){
		res.redirect('/main');
	}else{
		res.redirect('/error');
	}

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
	var userInstitute = req.session.datos[0]. ;

	stringQuery = 'INSERT INTO `smdedbv1`.`User`' 
					+ ' ("userEmail","userName","userLastName","userSecondLastName","userSex","userPassword","Institute_idInstitute")'
					+ ' VALUES ("' + userEmail + '", '
					+ '"' + userName + '", '
					+ '"' + userLastName + '", '
					+ '"' + userSecondLastName + '", '
					+ '"' + userSex + '", '
					+ '"' + userPassword + '", '
					+ '"' + userInstitute + '");';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.redirect('/management');
		}else{
			console.log('Error aqui en linea 97 post.js '+ stringQuery)
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR DATOS DE ADMINISTRADOR DE LA BASE DE DATOS
exports.getAdminsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT * FROM User INNER JOIN Administrator' 
				+ ' ON User.userEmail = Administrator.User_userEmail;' ;
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
	stringQuery = 'SELECT User.*, idStudent, subjectName, courseName'
					+ ' FROM User as u'
					+ ' INNER JOIN Student as s'
					+ '     ON u.userEmail = s.User_userEmail'
					+ ' INNER JOIN Student_has_Subject as ss'
					+ '     ON s.idStudent = ss.Student_idStudent'
					+ ' INNER JOIN Subject as su'
					+ '     ON su.idSubject = ss.Subject_idSubject'
					+ ' INNER JOIN Subject_has_Course as sc'
					+ '     ON sc.Subject_idSubject = su.idSubject'
					+ ' INNER JOIN Course as c'
					+ '     ON c.idCourse = sc.Course_idCourse;' ;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			for( var i in result ){
				console.log( 'Vato en' + i + ': ' + result[i].userEmail );
			}
		}else{
			console.log('Error en esta consulta: ' + stringQuery + ' Error: ' + error);
			res.redirect('/error');
		}
	});

};
var base;
var loginQuery = '';

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
	
	var which_vato = function(tipo){
		switch(tipo) {
			case 'h':
				loginQuery = 'SELECT * FROM User INNER JOIN Administrator' 
				+ ' ON User.userEmail = Administrator.User_userEmail' 
				+ ' WHERE User.userEmail="' + userNameLogin + '" AND User.userPassword="' + userPassLogin + '";' ;
				req.session.privilegio = 0;
				break;
			case 'S':
				loginQuery = 'SELECT * FROM User INNER JOIN Student' 
				+ ' ON User.userEmail = Student.User_userEmail' 
				+ ' WHERE User.userEmail="' + userNameLogin + '" AND User.userPassword="' + userPassLogin + '";' ;
				req.session.privilegio = 1;
				break;
			case 'T':
				loginQuery = 'SELECT * FROM User INNER JOIN Teacher' 
				+ ' ON User.userEmail = Teacher.User_userEmail' 
				+ ' WHERE User.userEmail="' + userNameLogin + '" AND User.userPassword="' + userPassLogin + '";' ;
				req.session.privilegio = 2;
				break;
			default:
				console.log('Error aqui')
				res.redirect('/error');
		}
	};

	which_vato(userNameLogin[0]);

	database.query(loginQuery, function(error, result, row){
		if(!error) {
			req.session.datos = result;
			res.redirect('/main');
		}else{
			console.log('Error aqui tambien '+loginQuery)
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR DATOS DE ADMINISTRADOR DE LA BASE DE DATOS
exports.getAdminsDatabase = function(req, res){
	var database = new base();
	loginQuery = 'SELECT * FROM User INNER JOIN Administrator' 
				+ ' ON User.userEmail = Administrator.User_userEmail;' ;
	database.query(loginQuery, function(error, result, row){
		if(!error) {
			res.send(result);
		}else{
			console.log('Error aqui en linea 68 post.js '+loginQuery)
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR DATOS DE ALUMNOS DE LA BASE DE DATOS
exports.getStudentsDatabase = function(req, res){
	var database = new base();
	loginQuery = 'SELECT * FROM User INNER JOIN Student' 
				+ ' ON User.userEmail = Student.User_userEmail;' ;
	var retorno;
	database.query(loginQuery, function(error, result, row){
		if(!error) {
			retorno = result;
			for (var i = 0; i < result.length; i++) {
				findGroups(retorno[i].userEmail, i);
			}
		}else{
			console.log('Error aqui en linea 68 post.js '+loginQuery)
			res.redirect('/error');
		}
	});

	function findGroups(argument, posc) {

		loginQuery='SELECT Group.groupName, Gruop.groupLevel, Student.idStudent'
					+' FROM Group as g'
					+' INNER JOIN Student_has_Gropu as sg'
						+' ON g.idGroup = sg.Group_idGroup'
					+' INNER JOIN Student as s'
						+' ON sg.Student_User_userEmail = s.User_userEmail'
					+' WHERE s.User_userEmail = "'+argument+'";'

		database.query(loginQuery, function(error, result, row){
			if(!error) {
				result[posc].grupos = result;
			}else{
				console.log('Error aqui en linea 68 post.js '+loginQuery)
				res.redirect('/error');
			}
		});
	}
	


};
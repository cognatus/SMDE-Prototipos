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
	
	var which_vato = function(tipo){
		switch(tipo) {
			case 'h':
				stringQuery = 'SELECT * FROM User INNER JOIN Administrator' 
				+ ' ON User.userEmail = Administrator.User_userEmail' 
				+ ' WHERE User.userEmail="' + userNameLogin + '" AND User.userPassword="' + userPassLogin + '";' ;
				req.session.privilegio = 0;
				break;
			case 'S':
				stringQuery = 'SELECT * FROM User INNER JOIN Student' 
				+ ' ON User.userEmail = Student.User_userEmail' 
				+ ' WHERE User.userEmail="' + userNameLogin + '" AND User.userPassword="' + userPassLogin + '";' ;
				req.session.privilegio = 1;
				break;
			case 'T':
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

	which_vato(userNameLogin[0]);

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			req.session.datos = result;
			res.redirect('/main');
		}else{
			console.log('Error aqui tambien '+stringQuery)
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
			console.log('Error aqui en linea 68 post.js '+stringQuery)
			res.redirect('/error');
		}
	});
};

// FUNCION PARA MOSTRAR DATOS DE ALUMNOS DE LA BASE DE DATOS
exports.getStudentsDatabase = function(req, res){
	var database = new base();
	stringQuery = 'SELECT * FROM User INNER JOIN Student' 
				+ ' ON User.userEmail = Student.User_userEmail;' ;
	var retorno;
	database.query(stringQuery, function(error, result, row){
		if(!error) {
			retorno = result;
		}else{
			console.log('Error aqui en linea 68 post.js '+stringQuery)
			res.redirect('/error');
		}
	});

};
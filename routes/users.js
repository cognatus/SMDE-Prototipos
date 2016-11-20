/* Funciones para comprobar el tipo de usuario */

	// Cualquier sesion
	exports.login = function(req, res, next){
		if( req.session.datos ){
			next();
		}else{
			res.render('error' , {
				errorData: {
					errorTitle: 'Inicia Sesión',
					errorItem: ['-  No has iniciado sesión'],
					backUrl: '/login'
				}
			});
		}
	};

	// Sin iniciar sesion
	exports.loginN = function(req, res, next){
		if( !req.session.datos ){
			next();
		}else{
			res.redirect('/home');
		}
	};

	// Solo alumno o profesor
	exports.loginS = function(req, res, next){
		var aux = req.session.datos;
		if( !aux ){
			res.redirect('error');
		}else if( req.session.privilegio == 1 || req.session.privilegio == 2 ){
			next();
		}else{
			res.render('error' , {
				errorData: {
					errorTitle: 'Error con la Sesión',
					errorItem: ['-  No tienes permiso para acceder a esta parte',
					'-  No has iniciado sesión'],
					backUrl: '/login'
				}
			});
		}
	}

	// Solo administrador
	exports.loginA = function(req, res, next){
		var aux = req.session.datos;
		if( !aux ){
			res.redirect('error');
		}else if( req.session.privilegio == 3 ){
			next();
		}else{
			res.render('error' , {
				errorData: {
					errorTitle: 'Error',
					errorItem: ['-  No tienes permiso para acceder a esta parte',
					'-  No has iniciado sesión'],
					backUrl: '/login'
				}
			});
		}
	};

module.exports = router;

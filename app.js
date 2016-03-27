
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var post = require('./routes/post');
var http = require('http');
var path = require('path');
/*var session = require('client-sessions');*/
var mysql = require('mysql');
var htmlspecialchars = require('htmlspecialchars');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('sabemos todo sobre ti'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(session({

}));*/

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//conecta a la DB MySQL
function databaseInstance(){
	var connection = mysql.createConnection({
		host     : 'localhost',
		password : 'n0m3l0s3',
		user     : 'root',
		database : 'smdedbv1',
		port: 8080
	});
	return connection;
};

/**
* Funciones para comprobar el tipo de usuario
*/

 //cualquier sesion
 function login(req, res, next){
	if( req.session.datos ){
		next();
	}else{
		res.redirect('error');
	}
 }

 //sin iniciar sesion
 function loginN(req, res, next){
	if( !req.session.datos ){
		next();
	}else{
		res.redirect('error');
	}
 }

 //solo granjero
 function loginG(req, res, next){
	var aux = req.session.datos;
	if( !aux ){
		res.redirect('error');
	}else if( req.session.privilegio == 1 ){
		next();
	}else{
		res.redirect('error');
	}
 }

 //solo gestor semillas(o como se llame el segundo usuario)
 function loginS(req, res, next){
	var aux = req.session.datos;
	if( !aux ){
		res.redirect('error');
	}else if( req.session.privilegio == 2 ){
		next();
	}else{
		res.redirect('error');
	}
 }

 //solo administrador
 function loginA(req, res, next){
	var aux = req.session.datos;
	if( !aux ){
		res.redirect('error');
	}else if( req.session.privilegio == 3 ){
		next();
	}else{
		res.redirect('error');
	}
 }

/*Metodos GET*/

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/main', routes.main);
app.get('/profile', routes.profile);
app.get('/messages', routes.messages);
app.get('/contents', routes.contents);
app.get('/subjects', routes.subjects);
app.get('/foro', routes.foro);
app.get('/settings', routes.settings);
app.get('/calendar', routes.calendar);
app.get('/management', routes.management);
app.get('/error', routes.error);

/*Metodos POST*/

app.post('/login', post.login);
app.post('/insertUser', post.insertUser);
app.post('/getAdministratorsDatabase', post.getAdministratorsDatabase);
app.post('/getStudentsDatabase', post.getStudentsDatabase);
app.post('/getStudentsSubjectsDatabase', post.getStudentsSubjectsDatabase);
app.post('/getTeachersDatabase', post.getTeachersDatabase);
app.post('/getTeachersSubjectsDatabase', post.getTeachersSubjectsDatabase);

http.createServer(app).listen(app.get('port'), function(){
	var base = new databaseInstance();
	base.connect(function(error){
		if(error){
			throw error;
		}else{
			console.log('Conexion correcta.');
		}
	});
	post.constructor(databaseInstance);
	console.log('SMDE server listening on port ' + app.get('port'));
});

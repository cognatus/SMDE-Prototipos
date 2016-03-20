
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
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
		database : 'smdedbv1'
	});
	return connection;
};

//Funcion de login general
var login = function(req, res){
	var database = new databaseInstance();
	var userNameLogin = req.body.sign_user;
	var userPassLogin = req.body.sign_key;
	var loginQuery = '';

	var which_vato = function(tipo){
		switch(tipo) {
			case 'A':
				loginQuery = 'SELECT * FROM Admin WHERE id= "'+ userNameLogin +'" and userPassword= "'+ userPassLogin +'";';
				req.session.privilegio = 0;
				break;
			case 'S':
				loginQuery = 'SELECT * FROM Student WHERE id= "'+ userNameLogin +'" and userPassword= "'+ userPassLogin +'";';
				req.session.privilegio = 1;
				break;
			case 'T':
				loginQuery = 'SELECT * FROM Teacher WHERE id= "'+ userNameLogin +'" and userPassword= "'+ userPassLogin +'";';
				req.session.privilegio = 2;
				break;
			default:
				res.redirect('/error');
		}
	};

	which_vato(userNameLogin[0]);

	database.query(loginQuery, function(error, result, row){
		if(!error) {
			req.session.datos = result;
			res.redirect('/la pagina que gustes');
		}else{
			res.redirect('/error');
		}
	});
};

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
app.get('/users', user.list);

/*Metodos POST*/

app.get('/login', login);

http.createServer(app).listen(app.get('port'), function(){
	console.log('SMDE server listening on port ' + app.get('port'));
});

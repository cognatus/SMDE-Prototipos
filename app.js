
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var post = require('./routes/post');
var calendarPost = require('./routes/calendarPost');
var profilePost = require('./routes/profilePost');
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
		multipleStatements: true,
		host: 'localhost',
		password: 'n0m3l0s3',
		user: 'root',
		database: 'smdedbv1',
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
			res.render('error' , {
				errorData: {
					errorTitle: 'Error con la Sesión',
					errorItem: ['-  Problemas con el Servidor'],
					backUrl: '/management'
				}
			});
		}
	 }

	//sin iniciar sesion
	function loginN(req, res, next){
		if( !req.session.datos ){
			next();
		}else{
			res.redirect('main');
		}
	 }

	//solo alumno
	function loginS(req, res, next){
		var aux = req.session.datos;
		if( !aux ){
			res.redirect('error');
		}else if( req.session.privilegio == 1 ){
			next();
		}else{
			res.render('error' , {
				errorData: {
					errorTitle: 'Error con la Sesión',
					errorItem: ['-  Problemas con el Servidor'],
					backUrl: '/management'
				}
			});
		}
	 }

	//solo profesor
	function loginP(req, res, next){
		var aux = req.session.datos;
		if( !aux ){
			res.redirect('error');
		}else if( req.session.privilegio == 2 ){
			next();
		}else{
			res.render('error' , {
				errorData: {
					errorTitle: 'Error con la Sesión',
					errorItem: ['-  Problemas con el Servidor'],
					backUrl: '/management'
				}
			});
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

app.get('/', loginN, routes.index);
app.get('/login', loginN, routes.login);
app.get('/main', login, routes.main);
app.get('/profile', login, routes.profile);
app.get('/messages', login, routes.messages);
app.get('/contents', login, routes.contents);
app.get('/subjects', login, routes.subjects);
app.get('/foro', login, routes.foro);
app.get('/settings', login, routes.settings);
app.get('/calendar', login, routes.calendar);
app.get('/management', loginA, routes.management);
app.get('/error', routes.error);


/*Metodos POST*/
app.post('/login', loginN, post.login);

//Todo lo referente a la gestión
app.post('/insertStudent', post.insertStudent);
app.post('/insertTeacher', post.insertTeacher);
app.post('/insertDept', post.insertDept);
app.post('/insertSubject',post.insertSubject);
app.post('/insertCourse', post.insertCourse);
app.get('/getAdministratorsDatabase', post.getAdministratorsDatabase);
app.get('/getStudentsDatabase', post.getStudentsDatabase);
app.get('/getTeachersDatabase', post.getTeachersDatabase);
app.get('/getStudentsSubjectsDatabase', post.getStudentsSubjectsDatabase);
app.get('/getTeachersSubjectsDatabase', post.getTeachersSubjectsDatabase);
app.get('/getDepartmentsDatabase', post.getDepartmentsDatabase);
app.get('/getSubjectsDatabase', post.getSubjectsDatabase);
app.get('/getCoursesDatabase', post.getCoursesDatabase);

//Todo referente al perfil
app.post('/setProfileTheme', profilePost.setProfileTheme);
app.post('/setProfileMsmColor', profilePost.setProfileMsmColor);
app.get('/getProfileSubjectsDatabase', profilePost.getProfileSubjectsDatabase);
app.get('/getProfileContactsStudents', profilePost.getProfileContactsStudents);
app.get('/getProfileContactsTeachers', profilePost.getProfileContactsTeachers);
app.get('/getStudentCoincidences', profilePost.getStudentCoincidences);
app.get('/getTeacherCoincidences', profilePost.getTeacherCoincidences);

//Todo referente a la agenda
app.post('/insertReminder', calendarPost.insertReminder);
app.post('/getRemindersDatabase', calendarPost.getRemindersDatabase);
app.post('/getPublicationsDatabase', calendarPost.getPublicationsDatabase);

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
	profilePost.constructor(databaseInstance);
	calendarPost.constructor(databaseInstance);
	console.log('SMDE server listening on port ' + app.get('port'));
});
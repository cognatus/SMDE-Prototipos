var express = require('express');
var app = express();
var router = express.Router();

var users = require('./users');
var post = require('../api/post');

/* GET views. */

// Catch 404
router.use(function(req, res, next) {
	res.status(404);
	res.render('error', { 
		errorData: {
			errorTitle: 'No se encontro la url especificada',
			errorItem: [
				'-  La ruta que coloco en el navegador no existe',
				'-  Verifique la direccion'
			],
			backUrl: '/home'
		} 
	});
	next(err);
});

router.get('/', function(req, res) {
    res.render('index', {title: 'SMDE' });  
});

router.route('/')
	.get(users.loginN,
  		res.render('index', { title: 'SMDE' });
	);

router.route('/login')
	.get(users.loginN,
  		res.render('login', { title: 'SMDE - Iniciar Sesión' });
	);
	.post(post.login);

router.route('/home')
	.get(users.login,
		res.render('main', { 
			title: 'SMDE - Inicio',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/profile')
	.get(users.login,
		res.render('profile', { 
			title: 'SMDE - Perfil',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/subjects')
	.get(users.loginS,
		res.render('subjects', { 
			title: 'SMDE - Asignaturas',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/contents')
	.get(users.loginS,
		res.render('contents', { 
			title: 'SMDE - Contenidos',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/contents/:id_content')
	.get(users.loginS,
		res.render('contenttopic', { 
			title: 'SMDE - Contenidos',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/messages')
	.get(users.login,
		res.render('messages', { 
			title: 'SMDE - Mensajes',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/messages/:id_conversation')
	.get(users.login,
		res.render('messages', { 
			title: 'SMDE - Mensajes',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/foro')
	.get(users.loginS,
		res.render('foro', { 
			title: 'SMDE - Foro',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/foro/:id_topic')
	.get(users.loginS,
		res.render('forumtopic', { 
			title: 'SMDE - Foro',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/settings')
	.get(users.login,
		res.render('settings', { 
			title: 'SMDE - Ajustes',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/calendar')
	.get(users.login,
		res.render('calendar', { 
			title: 'SMDE - Agenda',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

router.route('/management')
	.get(users.loginA,
		res.render('management', { 
			title: 'SMDE - Gestion',
			datos:  req.session.datos,
			privilegio:  req.session.privilegio });
	);

module.exports = router;		
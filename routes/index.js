var express = require('express');
var app = express();
var router = express.Router();

var post = require('../app_api/api/post');
var agenda = require('../app_api/api/agenda');
var asignaturas = require('../app_api/api/asignaturas');
var foro = require('../app_api/api/foro');
var mensajes = require('../app_api/api/mensajes');
var perfil = require('../app_api/api/perfil');

/* GET home page. */

// Middleware para usar en todas las peticiones
router.use(function(req, res, next) {
	console.log('Peticion a api');
	next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Bienvenido a SMDE prro' });   
});

router.route('/users')
	.get(post.getUsers);

router.route('/users/:user_id')
	.get(post.getUserById);

router.route('/institute/:institute_id/subjects')
	.get(post.getSubjects);

router.route('/institute/:institute_id/admins')
	.get(post.getAdministrators);

module.exports = router;

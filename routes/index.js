
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'SMDE' });
};

exports.login = function(req, res){
  res.render('login', { title: 'SMDE - Iniciar Sesión' });
};

exports.main = function(req, res){
  res.render('main', { title: 'SMDE - Inicio' });
};

exports.profile = function(req, res){
  res.render('profile', { title: 'SMDE - Perfil' });
};

exports.subjects = function(req, res){
  res.render('subjects', { title: 'SMDE - Asignaturas' });
};

exports.upload = function(req, res){
  res.render('upload', { title: 'SMDE - Subir Contenido' });
};

exports.messages = function(req, res){
  res.render('messages', { title: 'SMDE - Mensajes' });
};

exports.foro = function(req, res){
  res.render('foro', { title: 'SMDE - Foro' });
};

exports.settings = function(req, res){
  res.render('settings', { title: 'SMDE - Ajustes' });
};

exports.calendar = function(req, res){
  res.render('calendar', { title: 'SMDE - Agenda' });
};

exports.students = function(req, res){
  res.render('students', { title: 'SMDE - Alumnos' });
};

exports.userscontrol = function(req, res){
  res.render('userscontrol', { title: 'SMDE - Gestion' });
};
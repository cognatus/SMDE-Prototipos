
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
  res.render('main', { title: 'SMDE - Inicio',
                       datos:  req.session.datos,
                       privi:  req.session.privilegio });
};

exports.profile = function(req, res){
  res.render('profile', { title: 'SMDE - Perfil' });
};

exports.subjects = function(req, res){
  res.render('subjects', { title: 'SMDE - Asignaturas' });
};

exports.upload = function(req, res){
  res.render('upload', { title: 'SMDE - Contenidos' });
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

exports.management = function(req, res){
  res.render('management', { title: 'SMDE - Gestion' });
};

exports.error = function(req, res){
  res.render('error', { title: 'SMDE' });
};
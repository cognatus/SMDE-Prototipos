
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
  /*console.log(req.session.datos);*/
  res.render('main', { 
    title: 'SMDE - Inicio',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.profile = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('profile', { 
    title: 'SMDE - Perfil',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.subjects = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('subjects', { 
    title: 'SMDE - Asignaturas',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.contents = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('contents', { 
    title: 'SMDE - Contenidos',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.messages = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('messages', { 
    title: 'SMDE - Mensajes',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.foro = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('foro', { 
    title: 'SMDE - Foro',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.settings = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('settings', { 
    title: 'SMDE - Ajustes',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.calendar = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('calendar', { 
    title: 'SMDE - Agenda',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.management = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('management', { 
    title: 'SMDE - Gestion',
    datos:  req.session.datos,
    privilegio:  req.session.privilegio });
};

exports.error = function(req, res){
  /*console.log(req.session.datos);*/
  res.render('error', { title: 'SMDE' });
};
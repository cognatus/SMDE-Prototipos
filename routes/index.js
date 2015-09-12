
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req, res){
  res.render('login', { title: 'SMDE - Iniciar Sesión' });
};

exports.main = function(req, res){
  res.render('main', { title: 'SMDE - Home' });
};

exports.profile = function(req, res){
  res.render('profile', { title: 'SMDE - Cuenta' });
};

exports.messages = function(req, res){
  res.render('messages', { title: 'SMDE - Mensajes' });
};
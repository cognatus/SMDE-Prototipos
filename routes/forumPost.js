var base;
var stringQuery = '';

var htmlspecialchars = require('htmlspecialchars');

exports.constructor = function (basee) {
	base = basee;
}

exports.insertForumTopic = function(req, res){
	var database = new base();
	
	var topicTitle = req.body.insertForumTopicTitle;
	var topicDescription = req.body.insertForumTopicDescription;
	var topicSubject = req.body.insertForumTopicSubject
	

	if( topicTitle != null || topicTitle.trim() != '' || topicDescription != null || topicDescription.trim() != '' ){

		stringQuery = 'INSERT INTO ForumTopic (idForumTopic, topicTitle, topicSubject, forumTopicDateTime, User_userEmail, topicDescription)'
					+ ' VALUES (UUID(),'
					+ ' "' + htmlspecialchars(topicTitle) + '",'
					+ ' "' + topicSubject + '",'
					+ ' NOW(),'
					+ ' "' + req.session.datos[0].userEmail + '",'
					+ ' "' + htmlspecialchars(topicDescription) + '");';
	}
	else{
		res.render('error' , {
				errorData: {
				errorTitle: 'Error al crear Tema en el Foro',
				errorItem: ['-  El tema no puede estar en blanco',
				'-  La descripción no puede estar en blanco'],
				backUrl: '/foro'
			}
		});
	}

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.redirect('/foro');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al crear Tema en el Foro',
					errorItem: ['-  Problemas con el servidor',
					'-  Intentelo de nuevo mas tarde'],
					backUrl: '/foro'
				}
			});
		}
	});
};

//FUNCION PARA OBTENER LAS LOBBIES DEL USUARIO
exports.insertForumTopicComment = function(req, res){
	var database = new base();

	var forumTopic = req.body.forumTopicId;
	var commentText = req.body.forumCommentText;

	if(commentText != null || commentText.trim() != ''){

		stringQuery += 'INSERT INTO ForumComment (idForumComment, forumText, forumCommentDateTime, User_userEmail, ForumTopic_idForumTopic)'
					+ ' VALUES '
					+ ' (UUID(),'
					+ ' "' + htmlspecialchars(commentText) + '",'
					+ ' NOW(),'
					+ ' "' + req.session.datos[0].userEmail + '",'
					+ ' "' + forumTopic + '");';
	}

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			res.redirect('/foro');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al insertar Commentario',
					errorItem: ['-  El comentario no puede estar en blanco'],
					backUrl: '/foro'
				}
			});
		}
	});
};

//FUNCION PARA OBTENER LAS LOBBIES DEL USUARIO
exports.getForumTopics = function(req, res){
	var database = new base();

	stringQuery = 'SELECT idForumTopic, DATE_FORMAT(forumTopicDateTime, "%d/%m/%Y") AS forumTopicDate,'
				+ ' topicTitle, topicSubject, topicDescription, User_userEmail'
				+ ' FROM ForumTopic;'
				+ ' 	ORDER BY topicTitle ASC;';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			stringDataForumTopic = '';
			for(var i in result){
                var item = result[i];
                stringDataForumTopic += ''
                + '<div class="colhh1 hover listitem rippleria-dark" data-rippleria="" data-name="' + item.participantsNames + '" data-type="' + item.participantsEmails + '" data-title="' + item.participantsEmails + '\n' + item.participantsNames + '" onclick="selectLobby(&quot;' + item.idLobby + '&quot;)">'
                +    '<div class="listitem_img">'
                +        '<img src="images/profilephoto.png">'
                +    '</div>'
                +    '<div class="listitem_info border_bottom">'
                +        '<div class="listitem_rightinfo" title="' + item.lobbyDate + ' a las ' + item.lobbyHour + '">'
                +            '<label class="lobby_date">' + item.lobbyDate + '</label>'
                +            '&nbsp;<label class="lobby_time">' + item.lobbyHour + '</label>'
                +        '</div>'
                +        '<div class="listitem_title">'
                +            '<b title="' + item.participantsEmails + '\n' + item.participantsNames + '">' + item.participantsNames + '</b>'
                +        '</div>'
                if(item.lastSenderEmail == req.session.datos[0].userEmail){
                	stringDataForumTopic += '<div class="listitem_bottomdata"><span class="bg_reply msm_miniicon"></span>&nbsp;' + item.lastMsm +'</div>'
                }
                else{
                	stringDataForumTopic +=  '<div class="listitem_bottomdata"><span class="b_text">'+ item.lastSenderName + ':</span>&nbsp;' + item.lastMsm +'</div>'
                }
                stringDataForumTopic +='</div>'
                + '</div>';
            }

			res.send(stringDataForumTopic);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};

//FUNCION PARA OBTENER LAS LOBBIES DEL USUARIO
exports.getForumTopicComments = function(req, res){
	var database = new base();

	var forumTopic = req.query.forumTopic;

	stringQuery = 'SELECT idForumComment, forumText, User_userEmail,'
				+ ' 	DATE_FORMAT(forumCommentDateTime, "%d/%m/%Y") AS forumCommentDate,'
				+ ' 	DATE_FORMAT(forumCommentDateTime, "%H:%i") AS forumCommentTime'
				+ ' FROM ForumComment '
				+ ' WHERE ForumTopic_idForumTopic = "' + lobby + '" '
				+ ' ORDER BY forumCommentDateTime DESC;';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			selectedForumTopic = result;
			res.send(selectedLobbyData);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};


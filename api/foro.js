var base;
var stringQuery = '';

var htmlspecialchars = require('htmlspecialchars');

exports.constructor = function (basee) {
	base = basee;
}

//FUNCION PARA CREAR UN NUEVO TEMA EN EL FORO
exports.insertForumTopic = function(req, res){
	var topicTitle = req.body.insertForumTopicTitle;
	var topicDescription = req.body.insertForumTopicDescription;
	var topicSubject = req.body.insertForumTopicSubject
	
	if( topicTitle != null || topicTitle.trim() != '' || topicDescription != null || topicDescription.trim() != '' ){

		stringQuery = 'INSERT INTO ForumTopic (idForumTopic, topicTitle, topicSubject, topicDateTime, User_userEmail, topicDescription)'
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
				backUrl: '/forum'
			}
		});
	}

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			res.redirect('/forum');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al crear Tema en el Foro',
					errorItem: ['-  Problemas con el servidor',
					'-  Intentelo de nuevo mas tarde'],
					backUrl: '/forum'
				}
			});
		}
	});
};

//FUNCION PARA INSERTAR COMENTARIOS
exports.insertForumTopicComment = function(req, res){
	var forumTopic = req.params.id_topic;
	var commentText = req.body.forumCommentText;

	if(commentText != null || commentText.trim() != ''){

		stringQuery = 'INSERT INTO ForumComment (idForumComment, forumCommentText, forumCommentDateTime, User_userEmail, ForumTopic_idForumTopic)'
					+ ' VALUES '
					+ ' (UUID(),'
					+ ' "' + htmlspecialchars(commentText) + '",'
					+ ' NOW(),'
					+ ' "' + req.session.datos[0].userEmail + '",'
					+ ' "' + forumTopic + '");';
	}

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			res.redirect('/forum/' + req.params.id_topic);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al insertar Commentario',
					errorItem: ['-  El comentario no puede estar en blanco'],
					backUrl: '/forum/' + req.params.id_topic
				}
			});
		}
	});
};

//FUNCION PARA INSERTAR RESPUESTAS A COMENTARIOS
exports.insertForumTopicCommentReply = function(req, res){
	var forumCommentId = req.body.forumCommentId;
	var replyText = req.body.forumReplyText;
	stringQuery = '';

	if(replyText != null || replyText.trim() != ''){

		stringQuery = 'INSERT INTO ForumCommentReply (idForumCommentReply, forumCommentReplyText, forumCommentReplyDateTime, User_userEmail, ForumComment_idForumComment)'
					+ ' VALUES '
					+ ' (UUID(),'
					+ ' "' + htmlspecialchars(replyText) + '",'
					+ ' NOW(),'
					+ ' "' + req.session.datos[0].userEmail + '",'
					+ ' "' + forumCommentId + '");';
	}

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			res.redirect('/forum/' + req.params.id_topic);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al insertar Commentario',
					errorItem: ['-  El comentario no puede estar en blanco'],
					backUrl: '/forum'
				}
			});
		}
	});
};

//FUNCION PARA DAR LIKE A LOS COMENTARIOS
exports.likeForumComment = function(req, res){
	var forumCommentId = req.params.id_comment;
	var likeStatus = req.body.likeStatus;

	if(likeStatus != null){
		if(likeStatus == 0 || likeStatus == 1){
			stringQuery = 'BEGIN;'

			stringQuery += 'DELETE FROM User_like_ForumComment '
						+ ' WHERE ForumComment_idForumComment = "' + forumCommentId + '" '
						+ ' AND User_userEmail = "' + req.session.datos[0].userEmail + '";';

			stringQuery += 'INSERT INTO User_like_ForumComment (User_userEmail, ForumComment_idForumComment, likeStatus)'
						+ ' VALUES '
						+ ' ("' + req.session.datos[0].userEmail + '",'
						+ ' "' + forumCommentId + '",'
						+ ' "' + likeStatus + '");';

			stringQuery += 'COMMIT;'

		}else if(likeStatus == 2){
			stringQuery += 'DELETE FROM User_like_ForumComment '
						+ ' WHERE ForumComment_idForumComment = "' + forumCommentId + '" '
						+ ' AND User_userEmail = "' + req.session.datos[0].userEmail + '";';
		}	
	}

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			res.redirect('/forum');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al dar Me gusta',
					errorItem: ['-  Problemas con el servidor'],
					backUrl: '/forum'
				}
			});
		}
	});
};

//FUNCION PARA DAR LIKE A LOS COMENTARIOS
exports.likeForumCommentReply = function(req, res){
	var forumReplyId = req.params.id_reply;
	var likeStatus = req.body.likeStatus;

	if(likeStatus != null){
		if(likeStatus == 0 || likeStatus == 1){
			stringQuery = 'BEGIN;'

			stringQuery += 'DELETE FROM User_like_ForumCommentReply '
						+ ' WHERE Reply_idForumCommentReply = "' + forumReplyId + '" '
						+ ' AND User_userEmail = "' + req.session.datos[0].userEmail + '";';

			stringQuery += 'INSERT INTO User_like_ForumCommentReply (User_userEmail, Reply_idForumCommentReply, likeStatus)'
						+ ' VALUES '
						+ ' ("' + req.session.datos[0].userEmail + '",'
						+ ' "' + forumReplyId + '",'
						+ ' "' + likeStatus + '");';

			stringQuery += 'COMMIT;'

		}else if(likeStatus == 2){
			stringQuery += 'DELETE FROM User_like_ForumCommentReply '
						+ ' WHERE Reply_idForumCommentReply = "' + forumReplyId + '" '
						+ ' AND User_userEmail = "' + req.session.datos[0].userEmail + '";';
		}	
	}

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			res.redirect('/forum');
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.render('error' , {
				errorData: {
					errorTitle: 'Error al dar Me gusta',
					errorItem: ['-  Problemas con el servidor'],
					backUrl: '/forum'
				}
			});
		}
	});
};

//FUNCION PARA OBTENER TEMAS DEL FORO
exports.getForumTopics = function(req, res){
	stringQuery = 'SELECT idForumTopic, DATE_FORMAT(topicDateTime, "%d/%m/%Y") AS forumTopicDate,'
				+ ' DATE_FORMAT(topicDateTime, "%H:%i") AS forumTopicTime, photoName,'
				+ ' CONCAT(userName, " ", userLastName, " ", userSecondLastName) AS userFullName,'
				+ ' topicTitle, topicSubject, topicDescription, userEmail,'
				+ ' (SELECT'
					+ ' COUNT(fc.idForumComment) '
					+ ' FROM ForumComment AS fc'
						+ ' WHERE fc.ForumTopic_idForumTopic = ft.idForumTopic'
				+ ' ) AS comments'
				+ ' FROM ForumTopic AS ft '
				+ ' INNER JOIN User AS u '
				+ ' 	ON u.userEmail = ft.User_userEmail'
				+ ' ORDER BY topicTitle ASC;';

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			stringDataForumTopic = '';
			for(var i in result){
				var item = result[i];
				stringDataForumTopic += ''
				+ '<a href="/forum/' + item.idForumTopic + '">'
                + '<div data-type="' + item.topicSubject + '" class="colhh3 block_list left_text">'
				  + '<div class="pd_lr8">'
				    + '<div class="block_container bg_white">'
				      + '<div class="b_img flat_shadow">'
				        + '<div class="colhh1 listitem bg_opc white_text">'
				          + '<div class="pd_16 forumtopic_title">'
				            + '<div class="colhh1 ll_title" title="' + item.topicTitle + '">' + item.topicTitle + '</div>'
				            + '<div class="listitem_bottomdata">' + item.topicSubject + '</div>'
				          + '</div>'
				        + '</div>'
				      + '</div>'
				      + '<div class="bottom_info">'
				        + '<div class="pd_18">'
				      	  + '<div class="colhh1 rel_pos">'
				            + '<div class="colhh1 right_text mr_bot4 opacity_color sl_title" title="Creado el ' + item.forumTopicDate + ' a las ' + item.forumTopicTime + ' ">'
				              + '<label class="item_date">' + item.forumTopicDate + '</label>'
				              + '<label class="item_time"> a las ' + item.forumTopicTime + '</label>'
				            + '</div>'
				          + '</div>'
				      	  + '<div class="colhh1">'
				      	    + '<div class="colhh1 ll_title opacity_color">Creado Por:</div>'
				            + '<div class="colhh1 listitem f_li">'
				              + '<div class="listitem_info">'
				                + '<div class="listitem_title"><b>' + item.userFullName + '</b></div>'
				                + '<div class="listitem_bottomdata">' + item.userEmail + '</div>'
				              + '</div>'
				              + '<div class="listitem_img"><img src="profile_photos/' + item.photoName + '.png" onerror="this.onerror=null;this.src=&quot;/images/profilephoto.png&quot;"></img></div>'
				      	    + '</div>'
				      	  + '</div>'
				          + '<div class="pd_4"></div>'
				          + '<div class="colhh1">'
				            + '<div class="colhh1 ll_title opacity_color">Descripción:</div>'
				            + '<div class="pd_4"></div>'
				            + '<div class="colhh1">' + item.topicDescription + '</div>'
				          + '</div>'  
				        + '</div>'
				      + '</div>'
				      + '<div class="colhh1 bg_lightgray b_text opacity_color">'
				        + '<div class="pd_18">' + item.comments + ' Comentarios</div>'
				      + '</div>'
				    + '</div>'
				  + '</div>'
				+ '</div>'
				+ '</a>';
            }

			res.send(stringDataForumTopic);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};

exports.getForumTopicInfo = function(req, res, next){
	stringQuery = 'SELECT idForumTopic, DATE_FORMAT(topicDateTime, "%d/%m/%Y") AS forumTopicDate,'
				+ ' DATE_FORMAT(topicDateTime, "%H:%i") AS forumTopicTime, photoName,'
				+ ' CONCAT(userName, " ", userLastName, " ", userSecondLastName) AS userFullName,'
				+ ' topicTitle, topicSubject, topicDescription, userEmail,'
				+ ' (SELECT'
					+ ' COUNT(fc.idForumComment) '
					+ ' FROM ForumComment AS fc'
						+ ' WHERE fc.ForumTopic_idForumTopic = ft.idForumTopic'
				+ ' ) AS comments'
				+ ' FROM ForumTopic AS ft '
				+ ' INNER JOIN User AS u '
				+ ' 	ON u.userEmail = ft.User_userEmail'
				+ ' WHERE idForumTopic = "' + req.params.id_topic + '"';

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			req.session.foruminfo = result;
			next();
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
}

//FUNCION PARA OBTENER LOS COMENTARIOS DE UN TEMA DEL FORO (CRONOLOGICAMENTE)
exports.getForumTopicCommentsCron = function(req, res){
	var forumTopicSelectedId = req.params.id_topic;

	stringQuery = 'SELECT fc.idForumComment, fc.forumCommentText,'
				+ ' CONCAT(userName, " ", userLastName, " ", userSecondLastName) AS userFullName,'
				+ ' DATE_FORMAT(forumCommentDateTime, "%d/%m/%Y") AS forumCommentDate, userEmail, photoName,'
				+ ' DATE_FORMAT(forumCommentDateTime, "%H:%i") AS forumCommentTime,'
				+ ' (SELECT'
					+ ' COUNT(ulc.User_userEmail)'
					+ ' FROM User_like_ForumComment AS ulc'
						+ ' WHERE ulc.ForumComment_idForumComment = fc.idForumComment'
						+ ' AND ulc.likeStatus = 1'
				+ ' ) AS likes, '
				+ ' (SELECT'
					+ ' COUNT(ulc.User_userEmail)'
					+ ' FROM User_like_ForumComment AS ulc'
						+ ' WHERE ulc.ForumComment_idForumComment = fc.idForumComment'
						+ ' AND ulc.likeStatus = 0'
				+ ' ) AS dislikes,'
				+ ' (SELECT'
					+ ' COUNT(fcr.idForumCommentReply) '
					+ ' FROM ForumCommentReply AS fcr'
						+ ' WHERE fcr.ForumComment_idForumComment = fc.idForumComment'
				+ ' ) AS replies,'
				+ ' (SELECT'
					+ ' ulfc.likeStatus '
					+ ' FROM User_like_ForumComment AS ulfc'
						+ ' WHERE ulfc.ForumComment_idForumComment = fc.idForumComment'
						+ ' AND ulfc.User_userEmail = "' + req.session.datos[0].userEmail + '"'
				+ ' ) AS userLikeStatus'
			+ ' FROM ForumComment AS fc '
			+ ' INNER JOIN User AS u '
				+ ' ON u.userEmail = fc.User_userEmail '
			+ ' WHERE fc.ForumTopic_idForumTopic = "' + forumTopicSelectedId + '" '
			+ ' ORDER BY forumCommentDateTime DESC;';

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			stringDataForumComment = '';
			for(var i in result){
                var item = result[i];
                stringDataForumComment += ''
                + '<div class="block_container bg_white forum_comment rel_pos" data-id="' + item.idForumComment + '">'
  					+ '<div class="colhh1 flat_shadow fc_zindex">'
    					+ '<div class="pd_18">'
	      					+ '<div title="Publicado el ' + item.forumCommentDate + ' a las ' + item.forumCommentTime +'" class="listitem_rightinfo">'
	        					+ '<label class="item_date">' + item.forumCommentDate + '</label>'
	        					+ '<label class="item_time"> ' + item.forumCommentTime + '</label>'
	      					+ '</div>'
	      					+ '<div class="colhh1 forum_commentimg v_top"><img src="profile_photos/' + item.photoName + '.png" class="circle" onerror="this.onerror=null;this.src=&quot;/images/profilephoto.png&quot;"/></div>'
		      				+ '<div class="colhh1 forum_alldata v_top">'
		        				+ '<div class="pd_l18">'
		          					+ '<div class="listitem_title"><b>' + item.userFullName + '</b></div>'
		          					+ '<div class="colhh1 opacity_color">' + item.userEmail + '</div>'
		          					+ '<div class="pd_8"></div>'
		          					+ '<div class="colhh1">' + item.forumCommentText + '</div>'
		        				+ '</div>'
		      				+ '</div>'
    					+ '</div>'
    					+ '<div class="pd10_16 listitemactions autooverflow pd_top0 border_bottom">'
	      					+ '<div class="autocol left_float b_text opacity_color comment_info">'
	      						+ '<div class="autocol underline"><label likes-num>' + item.likes + ' </label><span class="circle bg_blue bg_likewhite"></span></div>'	
	      						+ '<div class="autocol underline"><label dislikes-num>' + item.dislikes + ' </label><span class="circle bg_red bg_dislikewhite"></span></div>'	
	      						+ '<div title="Mostrar respuestas" class="autocol underline showhiddenreply">' + item.replies + ' Respuestas</div>'	
	      					+ '</div>'
	      					+ '<div class="autocol right_float">'
	      						if(item.userEmail == req.session.datos[0].userEmail){
	      							stringDataForumComment += '<span title="Editar" class="circle bg_editgray hover"></span>'
	      							+ '<span title="Eliminar" class="circle bg_delete hover"></span>'
	      						}
	     					stringDataForumComment += '</div>'
	      				  + '</div>'
	      				  + '<div class="colhh1 comment_action center_text bg_white b_text opacity_color">'
	      					if(item.userLikeStatus != null){
	      						if(item.userLikeStatus == 1){
	      							stringDataForumComment += '<div class="colhh3 hover like_active" put-status="2"><span></span><div class="autocol">Me gusta</div></div>'
	      							+ '<div class="colhh3 hover dislike" put-status="0"><span></span><div class="autocol">No me gusta</div></div>'	
	      						}
	      						else if(item.userLikeStatus == 0){
	      							stringDataForumComment += '<div class="colhh3 hover like" put-status="1"><span></span><div class="autocol">Me gusta</div></div>'
	      							+ '<div class="colhh3 hover dislike_active" put-status="2"><span class="v_middle"></span><div class="autocol">No me gusta</div></div>'	
	      						}
	      					}
	      					else{
	      						stringDataForumComment += '<div class="colhh3 hover like" put-status="1"><span></span><div class="autocol">Me gusta</div></div>'
	      						+ '<div class="colhh3 hover dislike" put-status="0"><span></span><div class="autocol">No me gusta</div></div>'	
	      					}
	      					stringDataForumComment += '<div class="colhh3 hover showhiddenreply focusinput"><span class="bg_reply"></span><div class="autocol">Responder</div></div>'
	      				+ '</div>'
	      				+ '<div class="colhh1 hiddenreplyblock">'
    						+ '<div class="pd_18 txtprimary_color ll_title flat_shadow">Respuestas</div>'
		  					+ '<div class="colhh1 fshow_relpy">'
		    					+ '<div class="colhh1">'
			      					+ '<div class="forum_repliescontainer border_bottom bg_lightgray">'
			      					+	'<div class="forum_repliescontainerinner"></div>'
			      					+ '</div>'
			      					+ '<form class="colhh1 flat_input reply_form rel_pos">'
			      						+ '<img class="circle" src="profile_photos/' + req.session.datos[0].photoName + '.png" onerror="this.onerror=null;this.src=&quot;/images/profilephoto.png&quot;"></img>'
			        					+ '<textarea name="forumReplyText" type="text" placeholder="Escribe una Respuesta"></textarea>'
			        					+ '<input type="hidden" name="forumCommentId" value="' + item.idForumComment + '">'
			        					+ '<input type="submit" value="PUBLICAR" disabled="disabled" class="b_text opacity_color rippleria-dark"/>'
			      					+ '</form>'
		    					+ '</div>'
		  					+ '</div>'
		  				+ '</div>'
	  				+ '</div>'
				+ '</div>';
            }
            res.send(stringDataForumComment);

		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};

//FUNCION PARA OBTENER LAS RESPUESTAS DE UN COMENTARIO DEL FORO
exports.getForumTopicCommentReplies = function(req, res){
	var forumCommentId = req.params.id_comment;

	stringQuery = 'SELECT fcr.idForumCommentReply, fcr.forumCommentReplyText,' 
				+ ' CONCAT(userName, " ", userLastName, " ", userSecondLastName) AS userFullName,'
				+ ' DATE_FORMAT(forumCommentReplyDateTime, "%d/%m/%Y") AS forumCommentReplyDate, userEmail, photoName,'
				+ ' DATE_FORMAT(forumCommentReplyDateTime, "%H:%i") AS forumCommentReplyTime,'
				+ ' (SELECT'
					+ ' COUNT(ulcr.User_userEmail)'
					+ ' FROM User_like_ForumCommentReply AS ulcr'
						+ ' WHERE ulcr.Reply_idForumCommentReply = fcr.idForumCommentReply'
						+ ' AND ulcr.likeStatus = 1'
				+ ' ) AS likes, '
				+ ' (SELECT'
					+ ' COUNT(ulcr.User_userEmail)'
					+ ' FROM User_like_ForumCommentReply AS ulcr'
						+ ' WHERE ulcr.Reply_idForumCommentReply = fcr.idForumCommentReply'
						+ ' AND ulcr.likeStatus = 0'
				+ ' ) AS dislikes,'
				+ ' (SELECT'
					+ ' ulfcr.likeStatus '
					+ ' FROM User_like_ForumCommentReply AS ulfcr'
						+ ' WHERE ulfcr.Reply_idForumCommentReply = fcr.idForumCommentReply'
						+ ' AND ulfcr.User_userEmail = "' + req.session.datos[0].userEmail + '"'
				+ ' ) AS userLikeStatus'
			+ ' FROM ForumCommentReply AS fcr '
			+ ' INNER JOIN User AS u '
				+ ' ON u.userEmail = fcr.User_userEmail '
			+ ' WHERE fcr.ForumComment_idForumComment = "' + forumCommentId + '" '
			+ ' ORDER BY forumCommentReplyDateTime ASC;';

	base.query(stringQuery, function(error, result, row){
		if(!error) {
			stringDataForumReply = '';
			for(var i in result){
                var item = result[i];
                stringDataForumReply += ''
                + '<div class="colhh1 forum_reply border_bottom rel_pos" data-id="' + item.idForumCommentReply + '">'
    				+ '<div class="pd_18">'
      					+ '<div title="Publicado el ' + item.forumCommentReplyDate + ' a las ' + item.forumCommentReplyTime +'" class="listitem_rightinfo">'
        					+ '<label class="item_date">' + item.forumCommentReplyDate + '</label>'
        					+ '<label class="item_time"> ' + item.forumCommentReplyTime + '</label>'
      					+ '</div>'
      					+ '<div class="colhh1 forum_commentimg v_top"><img src="profile_photos/' + item.photoName + '.png" class="circle" onerror="this.onerror=null;this.src=&quot;/images/profilephoto.png&quot;"/></div>'
      					+ '<div class="colhh1 forum_alldata v_top">'
        					+ '<div class="pd_l18">'
          						+ '<div class="listitem_title"><b>' + item.userFullName + '</b></div>'
          						+ '<div class="colhh1 opacity_color">' + item.userEmail + '</div>'
          						+ '<div class="pd_8"></div>'
          						+ '<div class="colhh1">' + item.forumCommentReplyText + '</div>'
        					+ '</div>'
      					+ '</div>'
    				+ '</div>'
    				+ '<div class="pd10_16 listitemactions autooverflow pd_top0">'
	      				+ '<div class="autocol left_float b_text reply_info opacity_color">'
	        				if(item.likes > 0){
	      						stringDataForumReply += '<div class="autocol underline">' + item.likes + ' Me gusta</div>'	
	      					}
	      					if(item.dislikes > 0){
	      						stringDataForumReply += '<div class="autocol underline">' + item.dislikes + ' No me gusta</div>'	
	      					}
	      				stringDataForumReply += '</div>'
	      				+ '<div class="autocol reply_action right_float">'
	      					if(item.userLikeStatus != null){
	      						if(item.userLikeStatus == 1){
	      							stringDataForumReply += '<span title="Me gusta esta respuesta" class="circle hover bg_likeactive" put-status="2"></span>'
	      							+ '<span title="No me gusta esta respuesta" class="circle hover bg_dislike" put-status="0"></span>'	
	      						}
	      						else if(item.userLikeStatus == 0){
	      							stringDataForumReply += '<span title="Me gusta esta respuesta" class="circle hover bg_like" put-status="1"></span>'
	      							+ '<span title="No me gusta esta respuesta" class="circle hover bg_dislikeactive" put-status="2"></span>'	
	      						}
	      					}
	      					else{
	      						stringDataForumReply += '<span title="Me gusta esta respuesta" class="circle hover bg_like" put-status="1"></span>'
	      						+ '<span title="No me gusta esta respuesta" class="circle hover bg_dislike" put-status="0"></span>'	
	      					}
	      					if(item.userEmail == req.session.datos[0].userEmail){
	      						stringDataForumReply += '<span title="Editar" class="circle hover bg_editgray"></span>'
	      						+ '<span title="Eliminar" class="circle hover bg_delete"></span>'
	      					}
	     		stringDataForumReply += '</div>'
					+ '</div>'
				+ '</div>';
            }

			res.send(stringDataForumReply);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};


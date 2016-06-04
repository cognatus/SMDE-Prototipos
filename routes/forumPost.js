var base;
var stringQuery = '';

var htmlspecialchars = require('htmlspecialchars');

exports.constructor = function (basee) {
	base = basee;
}

//FUNCION PARA CREAR UN NUEVO TEMA EN EL FORO
exports.insertForumTopic = function(req, res){
	var database = new base();
	
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

//FUNCION PARA INSERTAR COMENTARIOS
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

//FUNCION PARA OBTENER TEMAS DEL FORO
exports.getForumTopics = function(req, res){
	var database = new base();

	stringQuery = 'SELECT idForumTopic, DATE_FORMAT(forumTopicDateTime, "%d/%m/%Y") AS forumTopicDate,'
				+ ' CONCAT(userName, userLastName, userSecondLastName) AS userFullName,'
				+ ' topicTitle, topicSubject, topicDescription, userEmail'
				+ ' FROM ForumTopic AS ft '
				+ ' INNER JOIN User AS u '
				+ ' 	ON u.userEmail = ft.User_userEmail'
				+ ' ORDER BY topicTitle ASC;';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			stringDataForumTopic = '';
			for(var i in result){
                var item = result[i];
                stringDataForumTopic += ''
                + '<div data-name="' + item.topicTitle + '" data-date="' + item.forumTopicDate + '" data-type="' + item.topicSubject + '" class="colhh3 block_list left_text">'
				  + '<div class="pd_lr8">'
				    + '<div class="block_container bg_white">'
				      + '<div class="b_img flat_shadow">'
				        + '<div style="padding-right: 13px;" class="pd_16">'
				          + '<div class="minimenu_container">'
				            + '<div class="minimenu"><span></span><span></span><span></span></div>'
				            + '<div class="minimenu_hidden">'
				            if(item.userEmail == req.session.datos[0].userEmail){
				            	stringDataForumTopic += '<div class="pd_16 hover" onclick="editForumTopic(&quot;' + item.idForumTopic + '&quot;)")>Editar</div>'
				          	}
		stringDataForumTopic += '<div class="pd_16 hover">Seguir</div>'
				            + '</div>'
				          + '</div>'
				          + '<div class="colhh1 listitem">'
				            + '<div class="listitem_img"><span></span></div>'
				            + '<div class="listitem_info">'
				              + '<div class="listitem_rightinfo">' + item.forumTopicDate + '</div>'
				              + '<div class="listitem_title"><b>' + item.topicTitle + '</b></div>'
				              + '<div class="listitem_bottomdata">' + item.topicSubject + '</div>'
				            + '</div>'
				          + '</div>'
				        + '</div>'
				      + '</div>'
				      + '<div class="pd_18">'
				      	+ '<div class="colhh1>'
				      	  + '<div class="colhh1 ll_title opacity_color">Creado Por</div>'
				          + '<div class="colhh1 listitem">'
				            + '<div class="listitem_info">'
				              + '<div class="listitem_title"><b>' + item.userFullName + '</b></div>'
				              + '<div class="listitem_bottomdata">' + item.userEmail + '</div>'
				            + '</div>'
				            + '<div class="listitem_img"><img src="images/profilephoto.png"></img></div>'
				      	  + '</div>'
				      	+ '</div>'
				        + '<div class="pd_4"></div>'
				        + '<div class="colhh1">'
				          + '<div class="colhh1 ll_title opacity_color">Descripción</div>'
				          + '<div class="pd_4"></div>'
				          + '<div class="colhh1">' + item.topicDescription + '</div>'
				        + '</div>'
				      + '</div>'
				    + '</div>'
				  + '</div>'
				+ '</div>';
            }

			res.send(stringDataForumTopic);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};

//FUNCION PARA OBTENER LOS COMENTARIOS DE UN TEMA DEL FORO (CRONOLOGICAMENTE)
exports.getForumTopicCommentsCron = function(req, res){
	var database = new base();

	var forumTopicId = req.query.forumTopicId;

	stringQuery = 'SELECT idForumComment, forumText, CONCAT(userName, userLastName, userSecondLastName) AS userFullName,' 
				+ ' 	COUNT(ulc.*) AS likes, COUNT(ulc2.*) AS dislikes, COUNT(fcr.*) AS replies, userEmail, photoName,'
				+ ' 	DATE_FORMAT(forumCommentDateTime, "%d/%m/%Y") AS forumCommentDate,'
				+ ' 	DATE_FORMAT(forumCommentDateTime, "%H:%i") AS forumCommentTime'
				+ ' FROM ForumComment AS fc '
				+ ' INNER JOIN User AS u '
				+ ' 	ON u.userEmail = fc.User_userEmail '
				+ ' INNER JOIN User_like_ForumComment as ulc'
				+ ' 	ON ulc.ForumComment_idForumComment = fc.idForumComment '
				+ ' 	AND ulc.likeStatus = 1 ' // 1 Es "Me gusta"
				+ ' INNER JOIN User_like_ForumComment as ulc2'
				+ ' 	ON ulc2.ForumComment_idForumComment = fc.idForumComment '
				+ ' 	AND ulc2.likeStatus = 0 ' // 0 Es "No me gusta"
				+ ' INNER JOIN ForumCommentReply AS fcr '
				+ ' 	ON fcr.ForumComment_idForumComment = fc.idForumComment '
				+ ' WHERE fc.idForumTopic = "' + forumTopicId + '" '
				+ ' ORDER BY forumCommentDateTime DESC;';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			stringDataForumComment = '';
			for(var i in result){
                var item = result[i];
                stringDataForumComment += ''
                + '<div class="block_container bg_white forum_comment rel_pos">'
  					+ '<div class="colhh1 flat_shadow fc_zindex">'
    					+ '<div class="pd_18">'
      					+ '<div title="' + item.forumCommentDate + ' a las ' + item.forumCommentTime +'" class="listitem_rightinfo">'
        					+ '<label class="item_date">' + item.forumCommentDate + '</label>'
        					+ '<label class="item_time">' + item.forumCommentTime + '</label>'
      					+ '</div>'
      					+ '<div class="colhh1 forum_commentimg v_top"><img src="profile_photos/' + item.photoName + '.png" class="circle"/></div>'
      					+ '<div class="colhh1 forum_alldata v_top">'
        					+ '<div class="pd_l18">'
          					+ '<div class="listitem_title"><b>' + item.userFullName + '</b></div>'
          					+ '<div class="colhh1 opacity_color">' + item.userEmail + '</div>'
          					+ '<div class="pd_4"></div>'
          					+ '<div class="colhh1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sagittis ex. Mauris a purus aliquet arcu viverra auctor. Suspendisse hendrerit ultricies dui ut fringilla. Vestibulum fermentum, ex eget elementum iaculis, arcu purus eleifend urna, et rutrum tortor massa nec arcu. Sed luctus ex suscipit, ornare tortor ac, feugiat libero. Sed ornare, felis interdum ullamcorper aliquet, neque felis cursus purus, in ultrices purus arcu ac nunc. Nulla accumsan neque a quam ullamcorper consectetur. Ut venenatis ligula in ligula vulputate, eu dignissim nisl mattis. Fusce ut bibendum metus, ut convallis eros. Sed sit amet dignissim neque, ut laoreet ipsum. Quisque vel orci consequat, porttitor lectus ut, sollicitudin justo.</div>'
        					+ '</div>'
      					+ '</div>'
    					+ '</div>'
    					+ '<div class="pd10_16 listitemactions pd_top0">'
	      					+ '<div class="autocol left_float .mr_top4 b_text opacity_color">'
	        					+ '<div class="autocol pd_8 underline pd_l0">' + item.likes + ' Me gusta</div>'
	        					+ '<div class="autocol pd_8 underline">' + item.dislikes + ' No me gusta</div>'
	        					+ '<div title="Mostrar respuestas" data-id="' + item.idForumComment + '" class="autocol pd_8 underline">' + item.replies + ' Respuestas</div>'
	      					+ '</div>'
	      					+ '<div class="autocol right_float">'
	      						+ '<span title="Me gusta este comentario" class="circle bg_like hover"></span>'
	      						+ '<span title="No me gusta este comentario" class="circle bg_dislike hover"></span>'
	      						if(item.userEmail == req.session.datos[0].userEmail){
	      							stringDataForumComment += '<span title="Editar" onclick="editForumComment(&quot;'+ item.idForumComment+ '&quot;)" class="circle bg_editgray hover"></span>'
	      							+ '<span title="Eliminar" onclick="deleteForumComment(&quot;' + item.idForumComment + '&quot;)" class="circle bg_delete hover"></span>'
	      						}
	     stringDataForumComment += '<span title="Responder" class="circle bg_reply hover"></span>'
	      					+ '</div>'
    					+ '</div>'
    					+ '<div class="pd_18 txtprimary_color ll_title pd_top0">Respuestas</div>'
  					+ '</div>'
  					+ '<div class="colhh1 fshow_relpy">'
    					+ '<div class="colhh1 hiddenreplyblock">'
      					+ '<div class="forum_repliescontainer border_bottom bg_lightgray"></div>'
      					+ '<form class="colhh1 flat_input">'
        					+ '<textarea type="text" placeholder="Escribe una Respuesta"></textarea>'
        					+ '<input type="submit" value="PUBLICAR" disabled="disabled" class="b_text opacity_color rippleria-dark"/>'
      					+ '</form>'
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
	var database = new base();

	var forumCommentId = req.query.forumCommentId;

	stringQuery = 'SELECT idForumCommentReply, forumCommentReplyText, CONCAT(userName, userLastName, userSecondLastName) AS userFullName,' 
				+ ' 	COUNT(ulcr.*) AS likes, COUNT(ulcr2.*) AS dislikes, userEmail, photoName,'
				+ ' 	DATE_FORMAT(forumCommentReplyDateTime, "%d/%m/%Y") AS forumCommentReplyDate,'
				+ ' 	DATE_FORMAT(forumCommentReplyDateTime, "%H:%i") AS forumCommentReplyTime'
				+ ' FROM ForumCommentReply AS fcr '
				+ ' INNER JOIN User AS u '
				+ ' 	ON u.userEmail = fcr.User_userEmail '
				+ ' INNER JOIN User_like_ForumCommentReply as ulcr '
				+ ' 	ON ulcr.Reply_idForumCommentReply = fcr.idForumCommentReply '
				+ '		AND ulcr.likeStatus = 1 ' // 1 Es "Me gusta"
				+ ' INNER JOIN User_like_ForumCommentReply as ulcr2 '
				+ ' 	ON ulcr2.Reply_idForumCommentReply = fcr.idForumCommentReply '
				+ '		AND ulcr2.likeStatus = 0 ' // 0 Es "No me gusta"
				+ ' WHERE ForumComment_idForumComment = "' + forumCommentId + '" '
				+ ' ORDER BY forumCommentReplyDateTime DESC;';

	database.query(stringQuery, function(error, result, row){
		if(!error) {
			stringDataForumReply = '';
			for(var i in result){
                var item = result[i];
                stringDataForumReply += ''
                + '<div class="colhh1 forum_reply border_bottom rel_pos">'
    				+ '<div class="pd_18">'
      					+ '<div title="' + item.forumCommentReplyDate + ' a las ' + item.forumReplyCommentTime +'" class="listitem_rightinfo">'
        					+ '<label class="item_date">' + item.forumCommentReplyDate + '</label>'
        					+ '<label class="item_time">' + item.forumCommentReplyTime + '</label>'
      					+ '</div>'
      					+ '<div class="colhh1 forum_commentimg v_top"><img src="profile_photos/' + item.photoName + '.png" class="circle"/></div>'
      					+ '<div class="colhh1 forum_alldata v_top">'
        					+ '<div class="pd_l18">'
          						+ '<div class="listitem_title"><b>' + item.userFullName + '</b></div>'
          						+ '<div class="colhh1 opacity_color">' + item.userEmail + '</div>'
          						+ '<div class="pd_4"></div>'
          						+ '<div class="colhh1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id sagittis ex. Mauris a purus aliquet arcu viverra auctor. Suspendisse hendrerit ultricies dui ut fringilla. Vestibulum fermentum, ex eget elementum iaculis, arcu purus eleifend urna, et rutrum tortor massa nec arcu. Sed luctus ex suscipit, ornare tortor ac, feugiat libero. Sed ornare, felis interdum ullamcorper aliquet, neque felis cursus purus, in ultrices purus arcu ac nunc. Nulla accumsan neque a quam ullamcorper consectetur. Ut venenatis ligula in ligula vulputate, eu dignissim nisl mattis. Fusce ut bibendum metus, ut convallis eros. Sed sit amet dignissim neque, ut laoreet ipsum. Quisque vel orci consequat, porttitor lectus ut, sollicitudin justo.</div>'
        					+ '</div>'
      					+ '</div>'
    				+ '</div>'
    				+ '<div class="pd10_16 listitemactions pd_top0">'
	      				+ '<div class="autocol left_float .mr_top4 b_text opacity_color">'
	        				+ '<div class="autocol pd_8 underline pd_l0">' + item.likes + ' Me gusta</div>'
	        				+ '<div class="autocol pd_8 underline">' + item.dislikes + ' No me gusta</div>'
	      				+ '</div>'
	      				+ '<div class="autocol right_float">'
	      					+ '<span title="Me gusta esta respuesta" class="circle bg_like hover"></span>'
	      					+ '<span title="No me gusta este respuesta" class="circle bg_dislike hover"></span>'
	      					if(item.userEmail == req.session.datos[0].userEmail){
	      						stringDataForumReply += '<span title="Editar" onclick="editForumCommentReply(&quot;'+ item.idForumComment+ '&quot;)" class="circle bg_editgray hover"></span>'
	      						+ '<span title="Eliminar" onclick="deleteForumCommentReply(&quot;' + item.idForumComment + '&quot;)" class="circle bg_delete hover"></span>'
	      					}
	     		stringDataForumReply += '</div>'
				+ '</div>';
            }

			res.send(stringDataForumReply);
		}else{
			console.log('Error aqui: ' + stringQuery + ' Error: ' + error )
			res.send('Error');
		}
	});
};


-- --------------------------------------------------------------
--	INSERTS
-- --------------------------------------------------------------
BEGIN;

INSERT INTO `smdedbv1`.`User` (`idUser`, `userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('VICA970109HMCLLL03', 'alejandrodnl.cv@hotmail.com', 'Alejandro', 'Villarroel', 'Calderon', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Administrator` (`User_idUser`) 
VALUES ('VICA970109HMCLLL03');

COMMIT;

BEGIN;

INSERT INTO `smdedbv1`.`User` (`idUser`, `userEmail` , `userName` , `userLastName`, 
  `userSecondLastName`, `userSex`, `userPassword`, `Institute_idInstitute`) 
VALUES ('MAMD970317HDF', 'diego@hotmail.com', 'Diego', 'Martinez', 'Moran', 'H', 'holaMundo123', 'PoliV9');

INSERT INTO `smdedbv1`.`Administrator` (`User_idUser`) 
VALUES ('MAMD970317HDF');

COMMIT;

SELECT Administrator.idAdministrator, User.idUser, User.userName, User.userLastName, User.Institute_idInstitute
FROM Administrator 
INNER JOIN User
ON Administrator.User_idUser = User.idUser;


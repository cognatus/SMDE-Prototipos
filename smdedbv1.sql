-- MySQL Script generated by MySQL Workbench
-- 03/21/16 12:52:13
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema smdedbv1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smdedbv1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smdedbv1` DEFAULT CHARACTER SET utf8 ;
USE `smdedbv1` ;

-- -----------------------------------------------------
-- Table `smdedbv1`.`Institute`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Institute` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Institute` (
  `idInstitute` VARCHAR(30) NOT NULL,
  `instituteName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idInstitute`),
  UNIQUE INDEX `idinstitute_UNIQUE` (`idInstitute` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`User` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`User` (
  `idUser` VARCHAR(30) NOT NULL,
  `userEmail` VARCHAR(100) NOT NULL,
  `userName` VARCHAR(80) NOT NULL,
  `userLastName` CHAR(80) NOT NULL,
  `userSecondLastName` CHAR(80) NOT NULL,
  `userSex` CHAR(1) NOT NULL,
  `userPassword` VARCHAR(100) NOT NULL,
  `Institute_idInstitute` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`userEmail`, `idUser`),
  INDEX `fk_User_Institute1_idx` (`Institute_idInstitute` ASC),
  UNIQUE INDEX `idUser_UNIQUE` (`idUser` ASC),
  CONSTRAINT `fk_User_Institute1`
    FOREIGN KEY (`Institute_idInstitute`)
    REFERENCES `smdedbv1`.`Institute` (`idInstitute`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Department` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Department` (
  `idDepartment` INT NOT NULL,
  `departmentName` VARCHAR(45) NULL,
  `Institute_idInstitute` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idDepartment`, `Institute_idInstitute`),
  INDEX `fk_Department_Institute1_idx` (`Institute_idInstitute` ASC),
  CONSTRAINT `fk_Department_Institute1`
    FOREIGN KEY (`Institute_idInstitute`)
    REFERENCES `smdedbv1`.`Institute` (`idInstitute`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Subject` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Subject` (
  `idSubject` INT NOT NULL AUTO_INCREMENT,
  `subjectName` VARCHAR(45) NULL,
  `subjectLevel` VARCHAR(45) NULL,
  `Department_idDepartment` INT NOT NULL,
  PRIMARY KEY (`idSubject`, `Department_idDepartment`),
  INDEX `fk_Subject_Department1_idx` (`Department_idDepartment` ASC),
  CONSTRAINT `fk_Subject_Department1`
    FOREIGN KEY (`Department_idDepartment`)
    REFERENCES `smdedbv1`.`Department` (`idDepartment`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Group` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Group` (
  `idGroup` INT NOT NULL AUTO_INCREMENT,
  `groupName` VARCHAR(10) NOT NULL,
  `groupLevel` INT NOT NULL,
  PRIMARY KEY (`idGroup`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Lobby`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Lobby` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Lobby` (
  `idLobby` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idLobby`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Message` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Message` (
  `idMessage` INT NOT NULL AUTO_INCREMENT,
  `messageText` MEDIUMTEXT NULL,
  `messageDateTime` DATETIME NOT NULL,
  `messageStatus` TINYINT(1) NOT NULL,
  `Lobby_idLobby` INT NOT NULL,
  `User_idUser` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idMessage`, `Lobby_idLobby`, `User_idUser`),
  INDEX `fk_Menssage_Lobby1_idx` (`Lobby_idLobby` ASC),
  INDEX `fk_Message_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Menssage_Lobby1`
    FOREIGN KEY (`Lobby_idLobby`)
    REFERENCES `smdedbv1`.`Lobby` (`idLobby`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `smdedbv1`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Teacher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Teacher` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Teacher` (
  `idTeacher` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idTeacher`, `User_idUser`),
  INDEX `fk_Teacher_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Teacher_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `smdedbv1`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Publication`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Publication` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Publication` (
  `idPublication` INT NOT NULL AUTO_INCREMENT,
  `pubTitle` VARCHAR(100) NULL,
  `pubText` MEDIUMTEXT NULL,
  `pubDateTime` DATETIME NULL,
  `Teacher_idTeacher` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`idPublication`, `Teacher_idTeacher`),
  INDEX `fk_Publication_Teacher1_idx` (`Teacher_idTeacher` ASC),
  INDEX `fk_Publication_Group1_idx` (`Group_idGroup` ASC),
  CONSTRAINT `fk_Publication_Teacher1`
    FOREIGN KEY (`Teacher_idTeacher`)
    REFERENCES `smdedbv1`.`Teacher` (`idTeacher`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Publication_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `smdedbv1`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Student` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Student` (
  `idStudent` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idStudent`, `User_idUser`),
  INDEX `fk_Student_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Student_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `smdedbv1`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Feedback`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Feedback` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Feedback` (
  `idFeedback` INT NOT NULL AUTO_INCREMENT,
  `feedTitle` VARCHAR(45) NULL,
  `feedText` MEDIUMTEXT NULL,
  `feedDateTime` DATETIME NULL,
  `Publication_idPublication` INT NOT NULL,
  `Student_idStudent` INT NOT NULL,
  PRIMARY KEY (`idFeedback`, `Publication_idPublication`, `Student_idStudent`),
  INDEX `fk_Feedback_Publication1_idx` (`Publication_idPublication` ASC),
  INDEX `fk_Feedback_Student1_idx` (`Student_idStudent` ASC),
  CONSTRAINT `fk_Feedback_Publication1`
    FOREIGN KEY (`Publication_idPublication`)
    REFERENCES `smdedbv1`.`Publication` (`idPublication`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Feedback_Student1`
    FOREIGN KEY (`Student_idStudent`)
    REFERENCES `smdedbv1`.`Student` (`idStudent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Content` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Content` (
  `idContent` INT NOT NULL AUTO_INCREMENT,
  `contentTitle` VARCHAR(45) NULL,
  `contentDateTime` DATETIME NULL,
  `contentText` MEDIUMTEXT NULL,
  `Teacher_idTeacher` INT NOT NULL,
  PRIMARY KEY (`idContent`, `Teacher_idTeacher`),
  INDEX `fk_Content_Teacher1_idx` (`Teacher_idTeacher` ASC),
  CONSTRAINT `fk_Content_Teacher1`
    FOREIGN KEY (`Teacher_idTeacher`)
    REFERENCES `smdedbv1`.`Teacher` (`idTeacher`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`ForumTopic`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`ForumTopic` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`ForumTopic` (
  `idForumTopic` INT NOT NULL AUTO_INCREMENT,
  `topicTitle` VARCHAR(100) NOT NULL,
  `topicSubject` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idForumTopic`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Note`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Note` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Note` (
  `idNote` INT NOT NULL AUTO_INCREMENT,
  `noteValue` VARCHAR(3) NULL,
  `noteComment` MEDIUMTEXT NULL,
  `Subject_idSubject` VARCHAR(20) NOT NULL,
  `Student_idStudent` INT NOT NULL,
  PRIMARY KEY (`idNote`, `Student_idStudent`),
  INDEX `fk_Note_Subject1_idx` (`Subject_idSubject` ASC),
  INDEX `fk_Note_Student1_idx` (`Student_idStudent` ASC),
  CONSTRAINT `fk_Note_Subject1`
    FOREIGN KEY (`Subject_idSubject`)
    REFERENCES `smdedbv1`.`Subject` (`idSubject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Note_Student1`
    FOREIGN KEY (`Student_idStudent`)
    REFERENCES `smdedbv1`.`Student` (`idStudent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Reminder`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Reminder` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Reminder` (
  `idReminder` INT NOT NULL,
  `reminderTitle` VARCHAR(100) NULL,
  `reminderText` MEDIUMTEXT NULL,
  `reminderDateTime` DATETIME NOT NULL,
  `User_userEmail` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idReminder`, `User_userEmail`),
  INDEX `fk_Reminder_User1_idx` (`User_userEmail` ASC),
  CONSTRAINT `fk_Reminder_User1`
    FOREIGN KEY (`User_userEmail`)
    REFERENCES `smdedbv1`.`User` (`userEmail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`ForumComent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`ForumComent` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`ForumComent` (
  `idForumComent` INT NOT NULL AUTO_INCREMENT,
  `forumText` MEDIUMTEXT NULL,
  `ForumTopic_idForumTopic` INT NOT NULL,
  `User_userEmail` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idForumComent`, `ForumTopic_idForumTopic`, `User_userEmail`),
  INDEX `fk_ForumComent_ForumTopic1_idx` (`ForumTopic_idForumTopic` ASC),
  INDEX `fk_ForumComent_User1_idx` (`User_userEmail` ASC),
  CONSTRAINT `fk_ForumComent_ForumTopic1`
    FOREIGN KEY (`ForumTopic_idForumTopic`)
    REFERENCES `smdedbv1`.`ForumTopic` (`idForumTopic`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ForumComent_User1`
    FOREIGN KEY (`User_userEmail`)
    REFERENCES `smdedbv1`.`User` (`userEmail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Teacher_has_Group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Teacher_has_Group` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Teacher_has_Group` (
  `Teacher_idTeacher` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`Teacher_idTeacher`, `Group_idGroup`),
  INDEX `fk_Teacher_has_Group_Group1_idx` (`Group_idGroup` ASC),
  INDEX `fk_Teacher_has_Group_Teacher1_idx` (`Teacher_idTeacher` ASC),
  CONSTRAINT `fk_Teacher_has_Group_Teacher1`
    FOREIGN KEY (`Teacher_idTeacher`)
    REFERENCES `smdedbv1`.`Teacher` (`idTeacher`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Teacher_has_Group_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `smdedbv1`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Subject_has_Group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Subject_has_Group` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Subject_has_Group` (
  `Subject_idSubject` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`Subject_idSubject`, `Group_idGroup`),
  INDEX `fk_Subject_has_Group_Group1_idx` (`Group_idGroup` ASC),
  INDEX `fk_Subject_has_Group_Subject1_idx` (`Subject_idSubject` ASC),
  CONSTRAINT `fk_Subject_has_Group_Subject1`
    FOREIGN KEY (`Subject_idSubject`)
    REFERENCES `smdedbv1`.`Subject` (`idSubject`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Subject_has_Group_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `smdedbv1`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`User_has_Lobby`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`User_has_Lobby` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`User_has_Lobby` (
  `User_userEmail` VARCHAR(100) NOT NULL,
  `Lobby_idLobby` INT NOT NULL,
  PRIMARY KEY (`User_userEmail`, `Lobby_idLobby`),
  INDEX `fk_User_has_Lobby_Lobby1_idx` (`Lobby_idLobby` ASC),
  INDEX `fk_User_has_Lobby_User1_idx` (`User_userEmail` ASC),
  CONSTRAINT `fk_User_has_Lobby_User1`
    FOREIGN KEY (`User_userEmail`)
    REFERENCES `smdedbv1`.`User` (`userEmail`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Lobby_Lobby1`
    FOREIGN KEY (`Lobby_idLobby`)
    REFERENCES `smdedbv1`.`Lobby` (`idLobby`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Administrator`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Administrator` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Administrator` (
  `idAdministrator` INT NOT NULL AUTO_INCREMENT,
  `User_idUser` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idAdministrator`, `User_idUser`),
  INDEX `fk_Administrator_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_Administrator_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `smdedbv1`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `smdedbv1`.`Student_has_Group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smdedbv1`.`Student_has_Group` ;

CREATE TABLE IF NOT EXISTS `smdedbv1`.`Student_has_Group` (
  `Student_idStudent` INT NOT NULL,
  `Group_idGroup` INT NOT NULL,
  PRIMARY KEY (`Student_idStudent`, `Group_idGroup`),
  INDEX `fk_Student_has_Group_Group1_idx` (`Group_idGroup` ASC),
  INDEX `fk_Student_has_Group_Student1_idx` (`Student_idStudent` ASC),
  CONSTRAINT `fk_Student_has_Group_Student1`
    FOREIGN KEY (`Student_idStudent`)
    REFERENCES `smdedbv1`.`Student` (`idStudent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Student_has_Group_Group1`
    FOREIGN KEY (`Group_idGroup`)
    REFERENCES `smdedbv1`.`Group` (`idGroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `smdedbv1`.`Institute`
-- -----------------------------------------------------
START TRANSACTION;
USE `smdedbv1`;
INSERT INTO `smdedbv1`.`Institute` (`idInstitute`, `instituteName`) VALUES ('PoliV9', 'Voca 9 Batiz');

COMMIT;


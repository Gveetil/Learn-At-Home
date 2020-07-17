DROP DATABASE IF EXISTS school_db;
CREATE DATABASE school_db;
USE school_db;

DROP TABLE IF EXISTS `SubmissionLinks`;
DROP TABLE IF EXISTS `Submissions`;
DROP TABLE IF EXISTS `AssignmentClass`;
DROP TABLE IF EXISTS `AssignmentLinks`;
DROP TABLE IF EXISTS `Assignments`;
DROP TABLE IF EXISTS `TeacherClassSubjects`;
DROP TABLE IF EXISTS `Ratings`;
DROP TABLE IF EXISTS `Students`;
DROP TABLE IF EXISTS `Class`;
DROP TABLE IF EXISTS `GradeSubjects`;
DROP TABLE IF EXISTS `Subjects`;
DROP TABLE IF EXISTS `Grades`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `AccessTypes`;

CREATE TABLE IF NOT EXISTS `AccessTypes` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` VARCHAR(50) NOT NULL, 
    PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `Users` (
    `id` INTEGER NOT NULL auto_increment , 
    `userName` VARCHAR(255) NOT NULL UNIQUE,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL, 
    `phone` varchar(100),
    `email` varchar(255),
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `AccessTypeId` INTEGER NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`AccessTypeId`) REFERENCES `AccessTypes` (`id`) 
        ON DELETE NO ACTION);

CREATE TABLE IF NOT EXISTS `Grades` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` VARCHAR(100) NOT NULL, 
    PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `Subjects` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` VARCHAR(255) NOT NULL, 
    PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `GradeSubjects` (
    `SubjectId` INTEGER NOT NULL, 
    `GradeId` INTEGER NOT NULL, 
    FOREIGN KEY (`SubjectId`) REFERENCES `Subjects` (`id`) 
        ON DELETE NO ACTION, 
    FOREIGN KEY (`GradeId`) REFERENCES `Grades` (`id`) 
        ON DELETE NO ACTION);

CREATE TABLE IF NOT EXISTS `Class` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` varchar(50) NOT NULL,
    `GradeId` INTEGER NOT NULL, 
    `TeacherId` INTEGER, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`GradeId`) REFERENCES `Grades` (`id`) 
        ON DELETE NO ACTION, 
    FOREIGN KEY (`TeacherId`) REFERENCES `Users` (`id`) 
        ON DELETE NO ACTION);
    
CREATE TABLE IF NOT EXISTS `StudentClass` (
    `StudentId` INTEGER, 
    `ClassId` INTEGER NOT NULL, 
    FOREIGN KEY (`StudentId`) REFERENCES `Users` (`id`) 
        ON DELETE NO ACTION, 
    FOREIGN KEY (`ClassId`) REFERENCES `Class` (`id`) 
        ON DELETE NO ACTION);

CREATE TABLE IF NOT EXISTS `Ratings` (
    `id` INTEGER NOT NULL auto_increment , 
    `name` VARCHAR(50) NOT NULL, 
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `TeacherClassSubjects` (
    `TeacherId` INTEGER NOT NULL, 
    `SubjectId` INTEGER NOT NULL, 
    `ClassId` INTEGER NOT NULL, 
    FOREIGN KEY (`TeacherId`) REFERENCES `Users` (`id`) 
        ON DELETE NO ACTION, 
    FOREIGN KEY (`SubjectId`) REFERENCES `Subjects` (`id`) 
        ON DELETE NO ACTION, 
    FOREIGN KEY (`ClassId`) REFERENCES `Class` (`id`) 
        ON DELETE NO ACTION);

CREATE TABLE IF NOT EXISTS `Assignments` (
    `id` INTEGER NOT NULL auto_increment , 
    `title` VARCHAR(255) NOT NULL, 
    `instructions` TEXT, 
    `isLearningTask` BOOLEAN NOT NULL DEFAULT TRUE, 
    `dueDate` DATETIME, 
    `postedDate` DATETIME, 
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `TeacherId` INTEGER NOT NULL, 
    `SubjectId` INTEGER NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`TeacherId`) REFERENCES `Users` (`id`) 
        ON DELETE NO ACTION, 
    FOREIGN KEY (`SubjectId`) REFERENCES `Subjects` (`id`) 
        ON DELETE NO ACTION);

CREATE TABLE IF NOT EXISTS `AssignmentLinks` (
    `id` INTEGER NOT NULL auto_increment , 
    `title` VARCHAR(255), 
    `link` VARCHAR(500) NOT NULL, 
    `fileType` VARCHAR(100), 
    `dropboxFileId` VARCHAR(255), 
    `isUploaded` BOOLEAN NOT NULL DEFAULT FALSE, 
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `AssignmentId` INTEGER NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`AssignmentId`) REFERENCES `Assignments` (`id`) 
        ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS `AssignmentClass` (
    `id` INTEGER NOT NULL auto_increment , 
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `AssignmentId` INTEGER NOT NULL, 
    `ClassId` INTEGER NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`AssignmentId`) REFERENCES `Assignments` (`id`) 
        ON DELETE CASCADE, 
    FOREIGN KEY (`ClassId`) REFERENCES `Class` (`id`) 
        ON DELETE NO ACTION);

CREATE TABLE IF NOT EXISTS `Submissions` (
    `id` INTEGER NOT NULL auto_increment , 
    `comment` TEXT, 
    `submissionDate` DATETIME, 
    `markedDate` DATETIME, 
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `RatingId` INTEGER, 
    `AssignmentId` INTEGER NOT NULL, 
    `StudentId` INTEGER NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`RatingId`) REFERENCES `Ratings` (`id`) 
        ON DELETE NO ACTION, 
    FOREIGN KEY (`AssignmentId`) REFERENCES `Assignments` (`id`) 
        ON DELETE NO ACTION, 
    FOREIGN KEY (`StudentId`) REFERENCES `Users` (`id`) 
        ON DELETE NO ACTION);

CREATE TABLE IF NOT EXISTS `SubmissionLinks` (
    `id` INTEGER NOT NULL auto_increment , 
    `title` VARCHAR(255), 
    `link` VARCHAR(500) NOT NULL, 
    `fileType` VARCHAR(100), 
    `dropboxFileId` VARCHAR(255), 
    `isUploaded` BOOLEAN NOT NULL DEFAULT TRUE, 
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP, 
    `SubmissionId` INTEGER NOT NULL, 
    PRIMARY KEY (`id`), 
    FOREIGN KEY (`SubmissionId`) REFERENCES `Submissions` (`id`) 
        ON DELETE NO ACTION); 

CREATE OR REPLACE VIEW `AssignmentSubmissions` (
`AssignmentId` , `NotMarked`, `StudentsSubmitted`, `StudentsPending`)
    AS
    (SELECT 
		AC.AssignmentId, 
		count(SC.StudentId) - count(S.markedDate) `NotMarked`,
		count(S.submissionDate) `StudentsSubmitted`, 
		(count(SC.StudentId) - count(S.submissionDate)) `StudentsPending` 
	FROM AssignmentClass AC
	LEFT JOIN StudentClass SC
		ON AC.ClassId = SC.ClassId
	LEFT JOIN Submissions S
		ON AC.AssignmentId = S.AssignmentId
		AND SC.StudentId = S.StudentId 
	GROUP BY AC.AssignmentId);

CREATE OR REPLACE VIEW `StudentAssignments` (
`AssignmentId`, `StudentId`, `StudentName`, `ClassName` , `SubmissionId`)
    AS
    (SELECT 
		AC.AssignmentId, 
		SC.StudentId , 
        CONCAT(U.firstName , " ", U.lastName)  StudentName,
        C.name ClassName,
		S.id SubmissionId
	FROM StudentClass SC 
    INNER JOIN Users U
		ON U.id = SC.StudentId
    INNER JOIN Class C
		ON C.id = SC.ClassId
	INNER JOIN AssignmentClass AC
		ON AC.ClassId = SC.ClassId
	LEFT JOIN Submissions S
		ON AC.AssignmentId = S.AssignmentId
		AND SC.StudentId = S.StudentId);

CREATE OR REPLACE VIEW `UserClassSubjects` (
`SubjectId`, `SubjectName` , `ClassId`, `ClassName` , `UserId`)
AS
(SELECT 
        S.id SubjectId, S.name SubjectName, 
        C.id ClassId, C.name ClassName,
        SC.StudentId UserId
    FROM Subjects S 
    INNER JOIN GradeSubjects GS
        ON GS.SubjectId = S.id
    INNER JOIN Class C
        ON C.GradeId = GS.GradeId
    INNER JOIN StudentClass SC
        ON SC.ClassId = C.id)
UNION ALL
(SELECT 
	S.id SubjectId, S.name SubjectName, 
	C.id ClassId, C.name ClassName,
	TCS.TeacherId UserId
  FROM TeacherClassSubjects TCS 
  INNER JOIN Subjects S 
	ON TCS.SubjectId = S.id
  INNER JOIN Class C 
	ON TCS.ClassId = C.id);
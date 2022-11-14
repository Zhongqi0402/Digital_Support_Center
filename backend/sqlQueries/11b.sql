SELECT `id`, `ticketID`, `text`, `isStaff`, `createdAt`, `updatedAt` 
	FROM `348-project-sample`.`notes` AS `note` 
	WHERE `note`.`ticketID` = '4' 
	ORDER BY `note`.`createdAt` ASC;

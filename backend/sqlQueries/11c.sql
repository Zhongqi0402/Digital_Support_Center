SELECT `id`, `ticketID`, `text`, `isStaff`, `createdAt`, `updatedAt` 
	FROM `348-project-production`.`notes` AS `note` 
	WHERE `note`.`ticketID` = 10002 
	ORDER BY `note`.`createdAt` ASC;
CREATE INDEX ticketIDIdx on `348-project-production`.`notes`(ticketID);

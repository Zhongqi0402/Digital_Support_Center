SELECT `ticket`.`id`, `ticket`.`userID`, `ticket`.`productID`, `ticket`.`description`, 
`ticket`.`status`, `ticket`.`createdAt`, `ticket`.`updatedAt`, `user`.`id` AS `user.id`, `user`.`name` AS `user.name`, 
`user`.`email` AS `user.email`, `user`.`password` AS `user.password`, `user`.`isAdmin` AS `user.isAdmin`, 
`user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt`,
`product`.`id` AS `product.id`, `product`.`manufacturer` AS `product.manufacturer`,
`product`.`type` AS `product.type`, `product`.`colour` AS `product.colour`,
`product`.`createdAt` AS `product.createdAt`, `product`.`updatedAt` AS `product.updatedAt` 
FROM `348-project-sample`.`tickets` AS `ticket` 
LEFT OUTER JOIN `348-project-sample`.`users` AS `user` ON `ticket`.`userID` = `user`.`id` 
LEFT OUTER JOIN `348-project-sample`.`products` AS `product` ON `ticket`.`productID` = `product`.`id` 
WHERE `ticket`.`status` = 'open' AND `ticket`.`userID` = 1;
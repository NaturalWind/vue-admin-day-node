DROP TABLE IF EXISTS `day_file`;
CREATE TABLE `day_file` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL COMMENT '文件名称',
  `name_old` VARCHAR(128) NOT NULL COMMENT '文件旧名称',
  `type` VARCHAR(24) NOT NULL COMMENT '文件类型',
  `encoding` VARCHAR(24) NOT NULL COMMENT '文件编码',
  `path` varchar(256) NOT NULL COMMENT '文件路径',
  `suffix` VARCHAR(24) NOT NULL COMMENT '文件后缀',
  `size` INT(11) NOT NULL COMMENT '文件大小',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='文件表';
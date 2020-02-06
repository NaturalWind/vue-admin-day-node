-- ----------------------------
-- day_menu
-- ----------------------------
DROP TABLE IF EXISTS `day_menu`;
CREATE TABLE `day_menu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `parent_id` INT(11) DEFAULT '0',
  `sort` INT(11) NOT NULL,
  `icon` VARCHAR(128) DEFAULT NULL COMMENT '菜单图标',
  `name` VARCHAR(48) NOT NULL COMMENT '菜单名称',
  `path` VARCHAR(198) NOT NULL COMMENT '菜单路径：如果为 http、https 开头则采用ifrom is_jump字段判断是否跳转出去',
  `component` VARCHAR(198) NOT NULL COMMENT '页面组件',
  `keep_alive` tinyint(1) DEFAULT 0 COMMENT '是否缓存页面',
  `show_parent_menu` tinyint(1) DEFAULT 1 COMMENT '是否显示父菜单',
  `is_jump` tinyint(1) DEFAULT 0 COMMENT '外链是否跳转',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';
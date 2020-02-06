DROP DATABASE IF EXISTS `CF_DAY`;
CREATE DATABASE `CF_DAY`;
USE `CF_DAY`;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- user
-- ----------------------------
DROP TABLE IF EXISTS `day_user`;
CREATE TABLE `day_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_id` INT(11) COMMENT '关联角色',
  `account` VARCHAR(48) NOT NULL COMMENT '用户账号',
  `name` VARCHAR(24) NOT NULL COMMENT '用户昵称',
  `password` VARCHAR(48) NOT NULL COMMENT '用户密码',
  `type` TINYINT(4) NOT NULL COMMENT '用户类型: 0: 手机注册 1: 管理平台注册 2: 管理平台添加',
  `sex` TINYINT(4) DEFAULT NULL COMMENT '性别: 0:男 1:女',
  `avatar` VARCHAR(128) DEFAULT NULL COMMENT '头像',
  `phone` VARCHAR(24) DEFAULT NULL COMMENT '手机号',
  `wechat` VARCHAR(24) DEFAULT NULL COMMENT '微信',
  `qq` VARCHAR(24) DEFAULT NULL COMMENT 'qq',
  `email` VARCHAR(48) DEFAULT NULL COMMENT '邮箱',
  `desc` VARCHAR(48) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- ----------------------------
-- token
-- ----------------------------
DROP TABLE IF EXISTS `day_token`;
CREATE TABLE `day_token` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL COMMENT '所属用户',
  `token` VARCHAR(1024) DEFAULT NULL,
  `phone_token` VARCHAR(1024) DEFAULT NULL,
  `device` VARCHAR(1024) DEFAULT NULL,
  `phone_device` VARCHAR(1024) DEFAULT NULL,
  `ip` VARCHAR(48) DEFAULT NULL,
  `phone_ip` VARCHAR(48) DEFAULT NULL,
  `expire_time` datetime DEFAULT NULL,
  `phone_expire_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='token表';

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
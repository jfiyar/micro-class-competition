-- MySQL dump 10.13  Distrib 5.7.25, for macos10.14 (x86_64)
--
-- Host: localhost    Database: ems
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `auth` int(11) NOT NULL DEFAULT '1',
  `code` int(3) NOT NULL AUTO_INCREMENT COMMENT '工号 自动递增',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `sex` int(1) NOT NULL COMMENT '性别 1 男 0 女',
  `birthday` int(11) NOT NULL COMMENT '生日',
  `join_day` int(11) NOT NULL COMMENT '入园日期',
  `dormitory` varchar(255) NOT NULL COMMENT '寝室号',
  `school` varchar(255) DEFAULT NULL COMMENT '来自 XXX学校名称',
  `state` int(11) NOT NULL DEFAULT '1' COMMENT '员工状态 1 在职位 0 未在职',
  `major` varchar(255) DEFAULT NULL COMMENT '专业',
  `tel` varchar(11) DEFAULT NULL COMMENT '联系电话',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注',
  `password` varchar(255) NOT NULL DEFAULT '4297f44b13955235245b2497399d7a93' COMMENT '密码',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=123133 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (3,1000,'爱丽丝',0,20190322,20190322,'天兴楼 405','重庆地壳研院第十八附属大学',1,'地壳运动研究专业','15368937661','神棍','4297f44b13955235245b2497399d7a93'),(1,1001,'天火',1,19950905,20180906,'007','xxxxxx',1,'zzy','18514588980','','4297f44b13955235245b2497399d7a93'),(1,123125,'测试',1,1,1,'1','1',1,'1','1','','1'),(1,123126,'123',1,1551865735,1553939340,'132','123',1,'123','123','undefined','4297f44b13955235245b2497399d7a93'),(1,123127,'123',1,1551262246,1553940653,'23','23',1,'123','123','undefined','4297f44b13955235245b2497399d7a93'),(1,123128,'123',1,1551953505,1553940711,'123','123',1,'123','123','undefined','4297f44b13955235245b2497399d7a93'),(1,123129,'123',1,1551953505,1553940712,'123','123',1,'123','123','undefined','4297f44b13955235245b2497399d7a93'),(1,123130,'123',1,1551953505,1553940713,'123','123',1,'123','123','undefined','4297f44b13955235245b2497399d7a93'),(1,123131,'123',1,1553681780,1553940985,'123','13',1,'123','123','undefined','4297f44b13955235245b2497399d7a93'),(1,123132,'123',1,1553077144,1553941151,'123','123',1,'123','123','123','4297f44b13955235245b2497399d7a93');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jurisdiction`
--

DROP TABLE IF EXISTS `jurisdiction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jurisdiction` (
  `id` varchar(32) NOT NULL,
  `position_name` varchar(255) NOT NULL COMMENT '职位名称',
  `specific_authority` varchar(255) NOT NULL COMMENT '具体权限   以逗号隔开（查看 look 添加 add_to   修改 modify 删除 delete）',
  `create_id` varchar(32) NOT NULL COMMENT '创建人id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_id` varchar(32) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jurisdiction`
--

LOCK TABLES `jurisdiction` WRITE;
/*!40000 ALTER TABLE `jurisdiction` DISABLE KEYS */;
INSERT INTO `jurisdiction` VALUES ('9b432202373247a6a13f18f9ece0eecc','gly','look,add_to,modify,delete','000000','2019-03-22 17:06:07',NULL,NULL),('adsfasdfpkd','000gh0','afdgsfdg','sdsd','2019-03-22 17:06:07',NULL,NULL),('sfdgsdfg','管理员','[{\"key\":\"specific_authority\",\"value\":\" look,add_to,modify,delete\",\"equals\":true,\"description\":\"\",\"enabled\":true}]','000','2019-03-22 17:06:07',NULL,NULL);
/*!40000 ALTER TABLE `jurisdiction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `simulationredis`
--

DROP TABLE IF EXISTS `simulationredis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `simulationredis` (
  `token` varchar(32) NOT NULL COMMENT '模拟redis数据库中key值',
  `token_values` varchar(2000) NOT NULL COMMENT 'm模拟redis数据库的value值',
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simulationredis`
--

LOCK TABLES `simulationredis` WRITE;
/*!40000 ALTER TABLE `simulationredis` DISABLE KEYS */;
INSERT INTO `simulationredis` VALUES ('51cfeccf75fa400c8075f82c9808e265','{\"u_name\":\"cs00001222222222\",\"update_id\":\"000000\",\"create_time\":1553442248000,\"sex\":\"1\",\"date_of_enrollment\":1536163200000,\"school_name\":\"xxxxxx\",\"telephone\":\"18514588980\",\"birth_day\":810230400000,\"password\":\"e10adc3949ba59abbe56e057f20f883e\",\"dormitory_number\":\"007\",\"update_time\":1553489928000,\"project_number\":123124,\"major\":\"zzy\",\"create_id\":\"000000\",\"id\":\"1a2b60b4ec074fad80cc6ec9d52e3164\",\"state\":\"1\",\"remarks\":\"zzzb\"}');
/*!40000 ALTER TABLE `simulationredis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_relationships`
--

DROP TABLE IF EXISTS `user_role_relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_relationships` (
  `employe_id` varchar(32) NOT NULL COMMENT '员工id（一个员工只有一个角色）',
  `jurisdiction_id` varchar(32) NOT NULL COMMENT '角色id',
  PRIMARY KEY (`employe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_relationships`
--

LOCK TABLES `user_role_relationships` WRITE;
/*!40000 ALTER TABLE `user_role_relationships` DISABLE KEYS */;
INSERT INTO `user_role_relationships` VALUES ('1a2b60b4ec074fad80cc6ec9d52e3164','9b432202373247a6a13f18f9ece0eecv');
/*!40000 ALTER TABLE `user_role_relationships` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-30 18:35:48

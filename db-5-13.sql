-- MySQL dump 10.13  Distrib 5.7.23, for macos10.13 (x86_64)
--
-- Host: localhost    Database: micro_class_competition
-- ------------------------------------------------------
-- Server version	5.7.23

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
-- Table structure for table `competition`
--

DROP TABLE IF EXISTS `competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competition` (
  `competition_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_name` varchar(255) NOT NULL,
  `competition_desc` text,
  `competition_state` int(11) NOT NULL DEFAULT '0',
  `competition_time` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `competition_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`competition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition`
--

LOCK TABLES `competition` WRITE;
/*!40000 ALTER TABLE `competition` DISABLE KEYS */;
INSERT INTO `competition` VALUES (15,'微积分微课','充分利用微课的特性，促进教师之间的交流。\n学生充分利用零散时间，查漏补缺。\n',0,'9月1号截止','2019-05-13 00:32:54','2019-05-13 01:11:18',8);
/*!40000 ALTER TABLE `competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `judge`
--

DROP TABLE IF EXISTS `judge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `judge` (
  `judge_id` int(11) NOT NULL AUTO_INCREMENT,
  `judge_user_id` int(11) DEFAULT NULL,
  `judge_competition_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`judge_id`),
  UNIQUE KEY `judge_pk` (`judge_user_id`,`judge_competition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `judge`
--

LOCK TABLES `judge` WRITE;
/*!40000 ALTER TABLE `judge` DISABLE KEYS */;
INSERT INTO `judge` VALUES (36,45,15);
/*!40000 ALTER TABLE `judge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `judge_mc`
--

DROP TABLE IF EXISTS `judge_mc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `judge_mc` (
  `judge_id` int(11) NOT NULL,
  `mc_id` int(11) NOT NULL,
  `score` int(4) NOT NULL,
  `commend` text NOT NULL,
  UNIQUE KEY `judge_mc_pk` (`judge_id`,`mc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `judge_mc`
--

LOCK TABLES `judge_mc` WRITE;
/*!40000 ALTER TABLE `judge_mc` DISABLE KEYS */;
INSERT INTO `judge_mc` VALUES (36,24,85,'很不错\n');
/*!40000 ALTER TABLE `judge_mc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `micro_class`
--

DROP TABLE IF EXISTS `micro_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `micro_class` (
  `mc_id` int(11) NOT NULL AUTO_INCREMENT,
  `mc_user_id` int(11) DEFAULT NULL,
  `mc_competition_id` int(11) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mc_id`),
  UNIQUE KEY `micro_class_pk` (`mc_user_id`,`mc_competition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `micro_class`
--

LOCK TABLES `micro_class` WRITE;
/*!40000 ALTER TABLE `micro_class` DISABLE KEYS */;
INSERT INTO `micro_class` VALUES (24,46,15,'/upload/1557680423973&&46&&15&&艺术家简介及其艺术作品在线展示系统 - Google Chrome 2019_5_4 20_48_47.mp4');
/*!40000 ALTER TABLE `micro_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `teacher_user_id` int(11) NOT NULL,
  `teacher_university_id` int(11) NOT NULL,
  PRIMARY KEY (`teacher_user_id`),
  UNIQUE KEY `teacher_teacher_user_id_uindex` (`teacher_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (44,23),(46,23);
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(32) NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_type_name_uindex` (`type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (14,'人工智能'),(16,'区块链'),(13,'历史'),(12,'文学'),(17,'新媒体'),(19,'未来'),(15,'物联网'),(18,'科技'),(11,'编程'),(8,'高等数学');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university` (
  `university_id` int(11) NOT NULL AUTO_INCREMENT,
  `university_name` varchar(255) NOT NULL,
  PRIMARY KEY (`university_id`),
  UNIQUE KEY `university_university_name_uindex` (`university_name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES (28,'人工智能学院'),(25,'传媒学院'),(34,'国防科技大学'),(27,'工商管理学院'),(30,'新媒体学院'),(26,'物联网学院'),(32,'电子商务学院'),(33,'网红学院'),(24,'计算机与网络学院'),(29,'软件工程学院'),(23,'重庆工程学院');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(32) DEFAULT NULL,
  `user_name` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `sex` int(11) DEFAULT '0',
  `tel` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT '1' COMMENT '1 教师\n2 裁判\n3 管理员',
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `delete` int(11) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_account_uindex` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (44,'admin','A超级管理员','4297f44b13955235245b2497399d7a93',0,'',NULL,3,'2019-05-13 00:28:21',0),(45,'weijifen01','胡二万','4297f44b13955235245b2497399d7a93',1,'1399854682','weijifen01@mc.com',2,'2019-05-13 00:34:12',0),(46,'zixuan','梓萱','4297f44b13955235245b2497399d7a93',0,'1312412452','zixuan@mc.com',1,'2019-05-13 00:36:01',0),(47,'weijifen02','李丝','4297f44b13955235245b2497399d7a93',0,'16824867931','wiejifen02@mc.com',2,'2019-05-13 01:04:46',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-13  9:37:59

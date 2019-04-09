-- MySQL dump 10.13  Distrib 5.7.25, for macos10.14 (x86_64)
--
-- Host: localhost    Database: micro_class_competition
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition`
--

LOCK TABLES `competition` WRITE;
/*!40000 ALTER TABLE `competition` DISABLE KEYS */;
INSERT INTO `competition` VALUES (1,'几何基础微课比赛','几何，就是研究空间结构及性质的一门学科。它是数学中最基本的研究内容之一，与分析、代数等等具有同样重要的地位，并且关系极为密切。几何学发展历史悠长，内容丰富。它和代数、分析、数论等等关系极其密切。几何思想是数学中最重要的一类思想。暂时的数学各分支发展都有几何化趋向，即用几何观点及思想方法去探讨各数学理论。常见定理有勾股定理，欧拉定理，斯图尔特定理等。',1,'2019年4月1日 到 2019年5月1日','2019-04-08 21:09:35','2019-04-08 21:09:36',1),(2,'微积分微课讲解比赛','微积分（Calculus）是高等数学中研究函数的微分(Differentiation)、积分(Integration)以及有关概念和应用的数学分支。它是数学的一个基础学科。内容主要包括极限、微分学、积分学及其应用。微分学包括求导数的运算，是一套关于变化率的理论。它使得函数、速度、加速度和曲线的斜率等均可用一套通用的符号进行讨论。积分学，包括求积分的运算，为定义和计算面积、体积等提供一套通用的方法 [1]  。',0,'不限制','2019-04-08 22:12:12','2019-04-08 22:12:12',1),(3,'方程式微课讲解比赛','    方程（equation）是指含有未知数的等式。 是表示两个数学式（如两个数、函数、量、运算）之间相等关系的一种等式，使等式成立的未知数的值称为“解”或“根”。 求方程的解的过程称为“解方程”。',0,'二零一九年七月一日 到 二零一九年八月一日','2019-04-09 14:22:05','2019-04-09 14:22:05',1),(4,'测试比赛','测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。测试比赛。',0,'九月一号截止','2019-04-09 16:16:32','2019-04-09 16:16:32',NULL),(5,'测试比萨','123123132 123123132 123123132 123123132 123123132 123123132 123123132 123123132 123123132 123123132 123123132 123123132 123123132 123123132 123123132 ',0,'123','2019-04-09 16:16:51','2019-04-09 16:16:51',NULL);
/*!40000 ALTER TABLE `competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `judge`
--

DROP TABLE IF EXISTS `judge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `judge` (
  `judge_user_id` int(11) NOT NULL,
  `judge_competition_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `judge`
--

LOCK TABLES `judge` WRITE;
/*!40000 ALTER TABLE `judge` DISABLE KEYS */;
INSERT INTO `judge` VALUES (33,1),(31,2),(32,2);
/*!40000 ALTER TABLE `judge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `micro_class`
--

DROP TABLE IF EXISTS `micro_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `micro_class` (
  `mc_user_id` int(11) NOT NULL,
  `mc_competition_id` int(11) NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mc_user_id`,`mc_competition_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `micro_class`
--

LOCK TABLES `micro_class` WRITE;
/*!40000 ALTER TABLE `micro_class` DISABLE KEYS */;
INSERT INTO `micro_class` VALUES (13,1,NULL),(13,2,NULL),(13,3,NULL),(13,4,NULL),(13,5,NULL);
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
INSERT INTO `teacher` VALUES (13,1),(17,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'数学');
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
  PRIMARY KEY (`university_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES (1,'清华大学'),(2,'北京大学'),(3,'浙江大学'),(4,'厦门大学'),(5,'重庆大学'),(6,'四川大学'),(7,'长沙大学');
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
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_account_uindex` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','超管','4297f44b13955235245b2497399d7a93',0,'1514671411','jasd@qq.com',3,'2019-04-08 21:06:43'),(13,'123','测试教师','4297f44b13955235245b2497399d7a93',0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(17,'123123','测试教师','4297f44b13955235245b2497399d7a93',0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(18,'1','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(19,'2','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(20,'3','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(21,'4','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(22,'5','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(23,'6','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(24,'7','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(25,'8','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(26,'9','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(27,'0','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(28,'11','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(29,'12','测试教师',NULL,0,'1514671411','jasd@qq.com',1,'2019-04-08 21:06:43'),(30,'22','测试裁判','4297f44b13955235245b2497399d7a93',0,'1514671411','jasd@qq.com',2,'2019-04-08 21:06:43'),(31,'33','测试裁判',NULL,0,NULL,NULL,2,'2019-04-09 01:00:55'),(32,'34','测试裁判',NULL,0,NULL,NULL,2,'2019-04-09 01:00:55'),(33,'36','测试裁判',NULL,0,NULL,NULL,2,'2019-04-09 01:00:55');
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

-- Dump completed on 2019-04-09 18:12:10

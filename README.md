# micro-class-competition
微课比赛管理系统
maven项目，spring boot+mybatis

## api
* /register 教师注册
* /login  登录
* /admin/user 用户列表
* /admin/user/{id} 用户详情
* /admin/user/{id}/change 更新用户信息（更新，锁定）
* /admin/competition 比赛列表
* /admin/competition/{id} 比赛详情
* /admin/competition/{id}/change 修改比赛信息
* /admin/competition_type 比赛分类列表
* /admin/university 大学列表
* /admin/university/add 添加大学
* /admin/university/{id}/remove 移除大学
* /admin/judge 裁判列表
* /admin/judge/add 添加裁判

## 界面路由
* / 权限判定
* /login
* /register
* /admin
* /judge
* /teacher
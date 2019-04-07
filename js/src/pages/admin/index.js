import React from "react";
import {Layout, Menu} from "antd";
import UserAvatar from "@/components/avatar";
import {Switch,Route,Redirect} from 'react-router-dom';
import Home from './home';
import User from './user';
import Judge from './judge';
import Univercity from './university';
import MicroClass from './micro-class';
import MicroClassType from './micro-class-type';

class Admin extends React.Component{
    constructor(props){
        super(props)
        let key=props.location.pathname.split("/admin")[1].split('/')[1];
        console.log(props.location.pathname.split("/admin"),key)
        if(key===""||key==="/"||typeof key==="undefined"){
            key='home'
        }
        this.defaultSelectedKey='/admin/'+key;
    }
    state={myCompetition:[]};
    handleMenuSelect=item=>{
        this.props.history.push(item.key)
    }
    render(){
        return<Layout>
        <Layout.Header style={{color:'#fff'}}>
            <span style={{fontSize:26,fontWeight:'lighter'}}>微课比赛管理系统</span>
            <UserAvatar style={{float:'right'}} />
        </Layout.Header>
        <Layout>
            <Layout.Sider>
                <Menu onSelect={this.handleMenuSelect} defaultSelectedKeys={[this.defaultSelectedKey]} mode="inline" theme="dark">
                    <Menu.Item key="/admin/home" >首页</Menu.Item>
                    <Menu.Item key="/admin/user" >用户管理</Menu.Item>
                    <Menu.Item key="/admin/judge" >裁判管理</Menu.Item>
                    <Menu.Item key="/admin/university" >高校管理</Menu.Item>
                    <Menu.Item key="/admin/micro-class" >微课管理</Menu.Item>
                    <Menu.Item key="/admin/micro-class-type" >微课分类管理</Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout.Content>
                <Switch>
                    <Route path="/admin/home" component={Home} />
                    <Route path="/admin/user" component={User} />
                    <Route path="/admin/judge" component={Judge} />
                    <Route path="/admin/university" component={Univercity} />
                    <Route path="/admin/micro-class" component={MicroClass} />
                    <Route path="/admin/micro-class-type" component={MicroClassType} />
                    <Redirect to="/admin/home" />
                </Switch>
            </Layout.Content>
        </Layout>
    </Layout>
    }
}


export default Admin
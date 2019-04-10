import React, { Component } from 'react';
import {Form, Input, Icon, Button, Spin, message, Avatar, Select} from 'antd';
import styled from 'styled-components';
import { withRouter,Link } from 'react-router-dom';
import md5 from 'md5';
import bg from '@/images/bg.png'
import {post,get} from '@/utils/request'




const Styled = styled.div`
width:100%;
height:100%;
position:fixed;
overflow:hidden;
background:${p => p.hide ? '#f0f2f5' : '#fff'};
background:#eee;
    background:#003763 url(${bg});
    background-size:100% 100%;
&::before{
    content:" ";
    display: block;
    width:200%;
    height:100%;
    left:-50%;
    top:${p => p.hide ? '-120%' : '-50%'};
    position: fixed;
}
.form{
    opacity:${p => p.hide ? 0 : 1};
    transition:300ms;
    width:450px;
    height:640px;
    margin:auto;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:rgba(255,255,255,1);
    transform:translateX(30%);
    padding:70px 50px 100px;
    box-shadow:0 10px 10px rgba(0,0,0,0.2);
    .name{
        /* animation:rotate 10s infinite alternate; */
        text-align:center;
        font-size:30px;
        padding-bottom:20px;
        /* padding-top:30px; */
    }
}
`;

const { Item } = Form;
class Login extends Component {
    state = { login: !!localStorage.getItem('token'),loading:false,hide:false,home:'/login',university:[] }
    checkpassword=(r,v,cb)=>{
        if(v&&v.length<6){
            cb('密码强度太低');
        }else{
            cb()
        }
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    }
    submit = e => {
        e.preventDefault()
        const form=this.props.form
        form.validateFields((err,val)=>{
            console.log(err)
            if (err) {
                return
            }
            this.setState({loading:true})
            delete val['re-password']
            val.password=md5(val.password);
            localStorage.setItem("account",val.account)
            post('/open/register',val).then(json=>{
                this.setState({loading:false})
                if(json.code===0){
                    this.props.history.push('/login')
                }else{
                    message.error(json.message)
                }
            })
        })
    }
    componentDidMount(){
        get("/open/university").then(json=>{
            this.setState({university:json.data})
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Styled hide={this.state.hide}>
                <Form className="form" onSubmit={this.submit}>
                    <Spin spinning={this.state.loading} tip=" 权限认证中" >
                        <Item className="name">
                            <Avatar style={{width:100,height:100,lineHeight:'100px',fontSize:60,background:'#118bff'}} icon="user" />
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('account', { rules: [{ required: true, message: '不能为空' }] })(
                                    <Input placeholder="设置一个账户，建议英文" prefix={<Icon type="user" />} type="text" />
                                )
                            }
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '不能为空' },{validator:this.checkpassword}],
                            })(
                                <Input.Password placeholder="设置你的登录密码" prefix={<Icon type="lock" />} type="password" />
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('re-password', {
                                rules: [{ required: true, message: '不能为空' },{validator:this.compareToFirstPassword}],
                            })(
                                <Input.Password placeholder="重复一下登录密码" prefix={<Icon type="lock" />} type="password" />
                            )}
                        </Item>
                        <Item style={{marginBottom:0}}>
                            {getFieldDecorator('university_id', {
                                rules: [{ required: true, message: '不能为空' }],
                            })(
                                <Select placeholder="选择你的学校" optionFilterProp="children" showSearch type="password" >

                                    {this.state.university.map(v=>{
                                        return <Select.Option key={v.university_id} value={v.university_id}>{v.university_name}</Select.Option>
                                    })}
                                </Select>
                            )}
                        </Item>
                        <div style={{textAlign:'right'}}><Link style={{lineHeight:'36px'}} to="/login">返回登录</Link></div>
                        <Item>
                            <Button block type="primary" htmlType="submit">注册</Button>
                        </Item>
                    </Spin>
                </Form>
            </Styled>
        )
    }
}


const LoginForm = Form.create({ name: 'login_form' })(Login);

export default withRouter(LoginForm);

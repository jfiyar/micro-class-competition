import React, { Component } from 'react';
import {Form, Input, Icon, Button, Spin, message, Avatar} from 'antd';
import styled from 'styled-components';
import { withRouter,Link } from 'react-router-dom';
import md5 from 'md5';
import bg from '@/images/bg.png'




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
    width:400px;
    height:500px;
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
    state = { login: !!localStorage.getItem('token'),loading:false,hide:false,home:'/login' }
    submit = e => {
        e.preventDefault()
        this.props.form.validateFields(async (err, val) => {
            if (err) {
                return
            }
            this.setState({loading:true})
            localStorage.setItem("code",val.code)

            try{
                let data = await window.post('/open/login',{code:val.code,password:md5(val.password)})
                this.setState({ loading: false })
                if(data.code!==0){
                    message.error(data.message)
                    return
                }
                data=data.data
                localStorage.setItem("token",data.token)
                localStorage.setItem("auth",data.auth)
                const {history}=this.props
                switch (data.auth){
                    case 1:history.push('/emp');break
                    case 2:history.push('/sup');break
                    case 3:history.push('/adm');break
                    default:history.push('/login')
                }
            }catch(e){
                message.error("无法连接到服务器")
                this.setState({ loading: false })
            }
        })
    }
    componentDidMount(){
        localStorage.clear()
    }
    componentWillUnmount(){

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
                                getFieldDecorator('code', { rules: [{ required: true, message: '不能为空' }] })(
                                    <Input prefix={<Icon type="user" />} type="text" />
                                )
                            }
                        </Item>
                        <Item style={{marginBottom:0}}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '不能为空' }],
                            })(
                                <Input.Password prefix={<Icon type="lock" />} type="password" />
                            )}
                        </Item>
                        <div style={{textAlign:'right'}}><Link style={{lineHeight:'36px'}} to="/register">注 册</Link></div>
                        <Item>
                            <Button block type="primary" htmlType="submit">登 录</Button>
                        </Item>
                    </Spin>
                </Form>
            </Styled>
        )
    }
}


const LoginForm = Form.create({ name: 'login_form' })(Login);

export default withRouter(LoginForm);

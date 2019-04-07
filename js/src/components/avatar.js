import React from "react";
import {Avatar, Button, Drawer,Input} from "antd";
import {Link} from 'react-router-dom'

class UserAvatar extends React.Component{
    state={username:'站天狼'};
    render(){
        return <div style={{...this.props.style}}>
            <Avatar onClick={()=>this.setState({show:true})} style={{backgroundColor:'rgba(255,255,255,.4)',cursor:'pointer'}}>{this.state.username.substr(0,1)}</Avatar>
            <Drawer title="个人信息" onClose={()=>this.setState({show:false})} visible={this.state.show} width={300}>
                {this.state.changePassword?<div>
                    <p>旧密码：<Input.Password/></p>
                    <p>新密码：<Input.Password/></p>
                    <p>确认密码：<Input.Password/></p>
                    <br/>
                    <p>
                        <Button onClick={()=>this.setState({changePassword:false})} >放弃修改</Button>
                        <Button style={{float:'right'}} type={"primary"}>提交修改</Button>
                    </p>
                </div>:<div>
                    <p> 姓名：{this.state.username}</p>
                    {<p> 所在大学：{this.state.university}</p>}
                    <p> 账号：{this.state.account}</p>
                    <p> 性别：{this.state.sex}</p>
                    <p> 联系电话：{this.state.tel}</p>
                    <p> 电子邮箱：{this.state.email}</p>
                    <p><Button onClick={()=>this.setState({changePassword:true})} block >修改密码</Button></p>
                    <p><Link to="/login"><Button block type={"danger"}>注销登录</Button></Link></p>
                </div>}
            </Drawer>
        </div>
    }
}
export default UserAvatar
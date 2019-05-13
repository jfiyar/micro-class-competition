
import React from "react";
import { Avatar, Button, Drawer, Input, Icon, Radio, message } from "antd";
import { Link, Redirect } from 'react-router-dom'
import { post } from "@/utils/request";
import md5 from 'md5'

class UserAvatar extends React.Component {
  state = {};
  change = (key) => {
    const { value } = this.refs[key].state
    this.setState({ [key]: value, ['edit_' + key]: false })
    console.log(this.state.user_id, key, value)
    post('/open/user/update', {
      user_id: this.state.user_id,
      [key]: value
    }).then(() => {
      message.success('信息修改成功')
    })
    const user = JSON.parse(localStorage.getItem('user'));
    user[key] = value
    localStorage.setItem(user, JSON.stringify(user))
  }
  changePassword = () => {
    const oldPassword = this.refs.old.state.value
    const newPassword = this.refs.new.state.value
    const rep = this.refs.rep.state.value
    if (rep !== newPassword) {
      return message.error("两次密码不一致")
    }
    if (rep.length < 6) {
      return message.error("密码强度不够")
    }
    this.setState({ loading: true })
    post('/open/user/changePassword', {
      user_id: this.state.user_id,
      oldPassword: md5(oldPassword),
      newPassword: md5(newPassword),
    }).then(json => {
      this.setState({ loading: false })
      if (json.code !== 0) {
        return message.error('修改失败，旧的密码不正确')
      }
      message.success('修改成功')
      this.setState({ logout: true })
    })
  }
  componentDidMount() {
    this.setState({ ...JSON.parse(localStorage.getItem('user')) });
  }
  render() {
    if (this.state.logout) {
      return <Redirect to="/login" />
    }
    const { user_name, university, tel, email } = this.state
    return <div style={{ ...this.props.style }}>
      <Avatar
        onClick={() => this.setState({ show: true })}
        style={{ backgroundColor: 'rgba(255,255,255,.4)', cursor: 'pointer' }}
      >
        {user_name && user_name.substr(0, 1)}
      </Avatar>
      <Drawer
        title="个人信息"
        onClose={() => this.setState({ show: false })}
        visible={this.state.show}
        destroyOnClose
        width={300}
      >
        {this.state.changePassword ? <div>
          <p>旧密码：<Input type="password" ref="old" /></p>
          <p>新密码：<Input type="password" ref="new" /></p>
          <p>确认密码：<Input type="password" ref="rep" /></p>
          <br />
          <p>
            <Button onClick={() => this.setState({ changePassword: false })} >放弃修改</Button>
            <Button loading={this.state.loading} onClick={this.changePassword} style={{ float: 'right' }} type={"primary"}>提交修改</Button>
          </p>
        </div> : <div>
            {this.state.edit_user_name ?
              <Input
                style={{ marginBottom: 3 }}
                addonBefore="姓名"
                defaultValue={user_name}
                ref="user_name"
                autoFocus
                onPressEnter={() => this.change('user_name')}
                suffix={<Icon onClick={() => this.setState({ edit_user_name: false })} type='close' />}
              />
              : <p style={{ cursor: 'pointer' }} onClick={() => this.setState({ edit_user_name: true })}> 姓名：{user_name}</p>}
            {university && < p > 所在大学：{university}</p>}
            <p> 账号：{this.state.account}</p>
            {this.state.edit_sex ?
              <div style={{ marginBottom: 11 }}>
                性别：
                <Radio.Group ref="sex" defaultValue={this.state.sex}>
                  <Radio value={0}>女</Radio>
                  <Radio value={1}>男</Radio>
                </Radio.Group>
                <Button.Group size="small">
                  <Button onClick={() => this.setState({ edit_sex: false })}>取消</Button>
                  <Button onClick={() => this.change('sex')} type="primary">保存</Button>
                </Button.Group>
              </div>
              : <p style={{ cursor: 'pointer' }} onClick={() => this.setState({ edit_sex: true })}> 性别：{this.state.sex === 0 ? '女' : '男'}</p>}
            {this.state.edit_tel ?
              <Input
                style={{ margin: '-4px 0 7px 0' }}
                addonBefore="tel"
                defaultValue={tel}
                ref="tel"
                autoFocus
                onPressEnter={() => this.change('tel')}
                suffix={<Icon onClick={() => this.setState({ edit_tel: false })} type='close' />}
              />
              : <p style={{ cursor: 'pointer' }} onClick={() => this.setState({ edit_tel: true })}> 联系电话：{tel}</p>}
            {this.state.edit_email ?
              <Input
                style={{ margin: '-4px 0 7px 0' }}
                addonBefore="email"
                defaultValue={email}
                ref="email"
                autoFocus
                onPressEnter={() => this.change('email')}
                suffix={<Icon onClick={() => this.setState({ edit_email: false })} type='close' />}
              />
              : <p style={{ cursor: 'pointer' }} onClick={() => this.setState({ edit_email: true })}> 电子邮箱：{email}</p>}
            <p><Button onClick={() => this.setState({ changePassword: true })} block >修改密码</Button></p>
            <p><Link to="/login"><Button block type={"danger"}>注销登录</Button></Link></p>
          </div>}
      </Drawer>
    </div >
  }
}
export default UserAvatar
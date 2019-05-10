import React from 'react'
import { Button, Divider, Table, Drawer, Form, Input, Radio } from 'antd'
import { Link } from 'react-router-dom'
import { get, post } from '@/utils/request'

class Infopage extends React.Component {
  state = { types: [] }
  componentDidMount() {
    this.loadData()
    get("/admin/type").then(json => {
      this.setState({ types: json.data })
    })
  }
  loadData = () => {
    get(`/admin/competition/${this.props.match.params.id}`).then(json => {
      console.log({ ...json })
      this.setState({
        loaded: true,
        com: json.data.competition,
        mcList: json.data.micro_class,
      })
    })
  }
  columns = [
    { dataIndex: 'user_name', title: '姓名' },
    { title: '性别', render: d => d.sex === 0 ? '男' : '女' },
    { dataIndex: 'university_name', title: '高校' },
    { title: '打分进度', render: d => `${d.judgeCount}/${d.judgeTotal}` },
    { dataIndex: 'score', title: '总分', sorter: (a, b) => a.score - b.score },
    { title: '平均分', align: 'right', render: d => (d.score / d.judgeCount).toFixed(2), sorter: (a, b) => a.score / a.judgeCount - b.score / b.judgeCount },
  ]
  submit = e => {
    e.preventDefault()
    console.log(this.props.form)
    this.props.form.validateFields((err, data) => {
      if (err) {
        return
      }

      post(`/admin/competition/${this.props.match.params.id}/update`, data).then(_ => {
        this.loadData()
        this.setState({ eidt: false })
      })
    })
    // this.props.form.validataFields((err, data) => {
    //   if (err) return
    //   console.log(data)
    // })
  }
  render() {
    return <div style={{ background: '#fff' }}>
      <div style={{ textAlign: 'right', padding: 20, }}>
        <Link to="/admin/competition"><Button>返回</Button></Link>
      </div>
      {
        this.state.loaded && <div style={{ padding: 20 }}>
          <div style={{ textAlign: 'center', fontSize: 18 }}>{this.state.com.competition_name}</div>
          <Divider />
          <div>分类：{this.state.com.type_name}</div>
          <div>时间：{this.state.com.competition_time}</div>
          <br />
          <div>描述：{this.state.com.competition_desc}</div>
          <br />
          <div>比赛状态：{this.state.com.competition_state === 0 ? '已关闭（在比赛列表中可开启比赛）' : '开启中（在比赛列表中可关闭比赛）'}</div>
          <br />
          <div>创建时间：{this.state.com.create_time}</div>
          <div>更新时间：{this.state.com.update_time}</div>
          <br />
          <div style={{ textAlign: 'right' }}><Button onClick={_ => this.setState({ eidt: true })} type="primary">编辑</Button></div>
          <br />
          <br />
          <Table
            bordered
            pagination={false}
            rowKey="mc_id"
            columns={this.columns}
            dataSource={this.state.mcList}
          />
          <Drawer
            title="编辑详情"
            width={600}
            visible={this.state.eidt}
            onClose={_ => this.setState({ eidt: false })}
            destroyOnClose
          >
            <Form wrapperCol={{ xs: 20 }} labelCol={{ xs: 4 }} onSubmit={this.submit}>
              <Form.Item label="比赛名称">
                {this.props.form.getFieldDecorator('competition_title', { initialValue: this.state.com.competition_name })(<Input />)}
              </Form.Item>
              <Form.Item label="类型">
                {this.props.form.getFieldDecorator('competition_type', { initialValue: this.state.com.competition_type })(<Radio.Group>
                  {this.state.types.map(t => {
                    return <Radio key={t.type_name} value={t.type_id}>{t.type_name}</Radio>
                  })}
                </Radio.Group>)}
              </Form.Item>
              <Form.Item label="时间限制">
                {this.props.form.getFieldDecorator('competition_time', { initialValue: this.state.com.competition_time })(<Input />)}
              </Form.Item>
              <Form.Item label="比赛描述">
                {this.props.form.getFieldDecorator('competition_desc', { initialValue: this.state.com.competition_desc })(<Input.TextArea autosize />)}
              </Form.Item>
              <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                <Button onClick={_ => this.setState({ eidt: false })} size="large" type="danger">放弃更改</Button>
                <Button onClick={this.submit} style={{ marginLeft: 30 }} size="large" type="primary">提交保存</Button>
              </div>
            </Form>
          </Drawer>
        </div>
      }
    </div>
  }
}

export default Form.create()(Infopage)
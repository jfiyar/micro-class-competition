import React from 'react'
import { Divider, Spin, Row, Col, message } from 'antd';
import get, { post } from '@/utils/request';

export default class extends React.Component {
  state = {}
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    get('/admin/university').then(json => this.setState({ data: json.data }))
  }
  addUniversity = () => {
    const university_name = window.prompt('请输入高校名称')
    if (university_name) {
      post('/admin/university/add', { university_name }).then(() => {
        this.getData()
      })
    }
  }
  update = university => {
    const { university_id } = university
    const university_name = window.prompt(`修改“${university.university_name}”为`, university.university_name)
    if (university_name === university.university_name) {
      message.error("修改失败，名称没有改变")
      return
    }
    if (university_name === '') {
      if (window.confirm(`确认删除“${university.university_name}”？`)) {
        get(`/admin/university/delete`, { university_id }).then(() => {
          message.warn(`成功删除“${university.university_name}”`)
          this.getData()
        })
        return
      }
      this.update(university)
      return
    }
    if (university_name) {
      post('/admin/university/update', { university_id, university_name }).then(() => {
        this.getData()
      })
    }
  }
  render() {
    const { data } = this.state
    const colStyle = {
      background: '#fff',
      padding: '15% 0',
      fontSize: '1.3vw',
      fontWeight: 'bold',
      fontStyle: 'italic',
      textAlign: 'center',
      marginBottom: 20,
      cursor: 'pointer'
    }
    return (<div style={{ padding: '0 20px' }}>
      <Divider orientation="left">高校管理</Divider>
      {data ? <Row gutter={30}>
        <Col onClick={this.addUniversity} style={{ color: '#aaa', cursor: 'pointer' }} span={4}><div style={colStyle}  >十 添加高校</div></Col>
        {data.map(university => (<Col key={university.university_id} span={4}>
          <div onClick={() => this.update(university)} style={colStyle}> {university.university_name}</div>
        </Col>))}
      </Row> : <Spin style={{ display: 'block' }} tip="加载中" />}
    </div>)
  }
}
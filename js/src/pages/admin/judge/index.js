import React from 'react';
import { Table, Button, Drawer, Form, Input, Checkbox, message, Radio } from 'antd';
import { get, post } from '@/utils/request';

class Home extends React.Component {
    state = { data: [], edit: false }
    offset = 0;
    limit = 10;
    columns = [
        { title: '账号', dataIndex: 'account' },
        { title: '姓名', dataIndex: 'user_name' },
        { title: '裁判场次（场）', dataIndex: 'count' },
        { title: '平均评分(分)', dataIndex: 'score' },
        { title: '性别', render: d => d.sex === 1 ? '男' : '女' },
        { title: '联系电话', dataIndex: 'tel' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '账号状态', render: d => d.delete === 1 ? <span style={{ color: '#f00' }}>已封号</span> : '正常' },
        { title: <Button onClick={_ => this.setState({ edit: {} })} icon="plus">添加</Button>, align: 'right', render: d => <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={_ => this.setState({ edit: d })}>编辑</span> },
    ]
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        return get('/admin/user', {
            offset: this.offset,
            limit: this.limit,
            type: 2,
        }).then(json => {
            console.log(json)
            this.setState({ user: json.data.user, count: json.data.count })
        })
    }
    pageChange = (page, limit) => {
        this.offset = (page - 1) * limit;
        this.limit = limit;
        this.getData();
    }
    submit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, data) => {
            if (err) return
            const user_id = this.state.edit.user_id
            if (!user_id) data.type = 2
            data.delete = data.delete ? 1 : 0
            // console.log(data.delete)
            post(`/admin/user/${user_id ? `${user_id}/update` : `add`}`, data).then(json => {
                if (json.code !== 0) {
                    message.error('保存失败，账号已存在')
                    return
                }
                this.setState({ edit: false })
                this.getData()
            })
        })
    }
    render() {
        return <div>
            <Table columns={this.columns}
                rowKey="user_id"
                rowSelection={{ onChange: () => { } }}
                pagination={{
                    onChange: this.pageChange,
                    onShowSizeChange: this.pageChange,
                    total: this.state.count,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (d) => '共' + d + '条数据'
                }}
                dataSource={this.state.user}
            >
            </Table>
            <Drawer
                title="添加/编辑裁判信息"
                visible={!!this.state.edit}
                width={400}
                onClose={_ => this.setState({ edit: false })}
                destroyOnClose
            >
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    onSubmit={this.submit}
                >
                    <Form.Item label="账号">
                        {this.props.form.getFieldDecorator('account', { initialValue: this.state.edit.account })(<Input />)}
                    </Form.Item>
                    <Form.Item label="姓名">
                        {this.props.form.getFieldDecorator('user_name', { initialValue: this.state.edit.user_name })(<Input />)}
                    </Form.Item>
                    <Form.Item label="设置密码">
                        {this.props.form.getFieldDecorator('password')(<Input />)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {this.props.form.getFieldDecorator('sex', { initialValue: this.state.edit.sex === 1 ? 1 : 0 })(<Radio.Group>
                            <Radio value={1} > 男 </Radio>
                            <Radio value={0} > 女 </Radio>
                        </Radio.Group>)}
                    </Form.Item>
                    <Form.Item label="联系电话">
                        {this.props.form.getFieldDecorator('tel', { initialValue: this.state.edit.tel })(<Input />)}
                    </Form.Item>
                    <Form.Item label="邮箱">
                        {this.props.form.getFieldDecorator('email', { initialValue: this.state.edit.email })(<Input />)}
                    </Form.Item>
                    <Form.Item label="禁止登陆">
                        {this.props.form.getFieldDecorator('delete', { initialValue: this.state.edit.delete === 1 })(<Checkbox defaultChecked={this.state.edit.delete === 1} />)}
                    </Form.Item>
                    <Button htmlType="submit" block type="primary">提交</Button>
                </Form>
            </Drawer>
        </div>
    }
}

export default Form.create()(Home)
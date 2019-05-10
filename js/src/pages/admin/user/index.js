import React from 'react';
import { Table, Input, Form, Radio, Drawer, Select, Button, Checkbox, Icon } from 'antd';
import { get, post } from '@/utils/request';

class Home extends React.Component {
    state = { data: [], university: [] }
    offset = 0;
    limit = 10;
    columns = [
        { title: '账号', dataIndex: 'account' },
        { title: '姓名', dataIndex: 'user_name' },
        { title: '作品(个)', dataIndex: 'count' },
        { title: '性别', render: d => d.sex === 0 ? '女' : '男' },
        { title: '联系电话', dataIndex: 'tel' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '所属高校', dataIndex: 'university_name' },
        { title: '封号', render: d => !d.delete ? '正常' : <span style={{ color: 'red' }}>封号</span> },
        { title: '操作', align: 'right', render: d => <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={_ => this.setState({ edit: d })}>编辑</span> },
    ]
    componentDidMount() {
        this.getData();
        get('/admin/university').then(json => {
            this.setState({ university: json.data })
        })
    }
    getData = () => {
        this.setState({ loading: true })
        return get('/admin/user', {
            offset: this.offset,
            limit: this.limit,
            type: 1,
        }).then(json => {
            this.setState({ user: json.data.user, count: json.data.count, loading: false })
        })
    }
    pageChange = (page, limit) => {
        this.offset = (page - 1) * limit;
        this.limit = limit;
        this.getData();
    }
    save = e => {
        e.preventDefault()
        this.props.form.validateFields((err, data) => {
            if (err) return
            data.delete = data.delete ? 1 : 0
            post(`/admin/user/${this.state.edit.user_id}/update`, data).then(json => {
                this.setState({ edit: false })
                this.getData()
            })
        })
    }
    render() {
        return <div>
            <Table
                rowKey="account"
                columns={this.columns}
                loading={this.state.loading}
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
            />
            <Drawer
                width={500}
                visible={!!this.state.edit}
                title="编辑用户信息"
                onClose={_ => this.setState({ edit: false })}
                destroyOnClose
            >
                {this.state.edit && <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    onSubmit={this.save}
                >
                    <Form.Item label="账号">
                        {this.props.form.getFieldDecorator('account', { initialValue: this.state.edit.account })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="用户名">
                        {this.props.form.getFieldDecorator('user_name', { initialValue: this.state.edit.user_name })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="性别">
                        {this.props.form.getFieldDecorator('sex', { initialValue: this.state.edit.sex })(
                            <Radio.Group>
                                <Radio value={0}>女</Radio>
                                <Radio value={1}>男</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="联系电话">
                        {this.props.form.getFieldDecorator('tel', { initialValue: this.state.edit.tel })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="email">
                        {this.props.form.getFieldDecorator('email', { initialValue: this.state.edit.email })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="所属高校">
                        {this.props.form.getFieldDecorator('university_id', { initialValue: this.state.edit.university_id })(
                            <Select>
                                {this.state.university.map(u => {
                                    return <Select.Option key={u.university_id} value={u.university_id}>{u.university_name}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="禁止登陆">
                        {this.props.form.getFieldDecorator('delete', { initialValue: this.state.edit.delete === 1 })(
                            <Checkbox defaultChecked={this.state.edit.delete === 1}>
                                {this.props.form.getFieldValue('delete') && <span style={{ color: '#f00' }}><Icon type="warning" /> 用户已被封禁</span>}
                            </Checkbox>
                        )}
                    </Form.Item>
                    <div style={{ right: 20, position: 'absolute', bottom: 10 }}>
                        <Button htmlType="submit" icon="upload" type="primary">保 存</Button>
                    </div>
                </Form>}
            </Drawer>
        </div>
    }
}

export default Form.create()(Home)
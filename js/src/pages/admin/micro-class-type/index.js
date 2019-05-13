import React from 'react';
import { Button, Modal, Input, Divider, Popconfirm } from 'antd';
import { get, post } from '@/utils/request';
import University from './University'

class Home extends React.Component {
    state = { type: [] }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        this.setState({ loading: true })
        return get('/admin/type', {
            offset: this.offset,
            limit: this.limit,
            type: 2,
        }).then(json => {
            this.setState({ type: json.data })
        })
    }
    add = _ => {
        post(`/admin/type/add`, {
            type_name: this.refs.add.state.value
        }).then(_ => {
            this.getData();
            this.setState({ add: false })
        })
    }
    save = () => {
        post(`/admin/type/${this.state.edit.type_id}/update`, { type_name: this.refs.type_name.state.value }).then(_ => {
            this.getData()
            this.setState({ edit: false })
        })
    }
    remove = _ => {
        console.log(1)
        get(`/admin/type/${this.state.edit.type_id}/remove`).then(_ => {
            this.getData()
            this.setState({ edit: false })
        })
    }
    render() {
        return <div>
            <div style={{ margin: 20, color: '#222', background: '#fff', padding: 20, fontSize: 18 }} >类型 / 高校管理</div>
            <div style={{ margin: 20, background: '#fff', padding: 20, fontSize: 16 }} >
                <span style={{ marginTop: 6, display: 'inline-block' }}>全部类型 </span>
                <Button type="primary" onClick={_ => this.setState({ add: true })} style={{ float: 'right' }} >新增</Button>
                <Divider />
                {this.state.type.map(t => {
                    return <Button style={{ margin: 10 }} onClick={_ => this.setState({ edit: t })} key={t.type_id} >{t.type_name}</Button>
                })}
            </div>
            <Modal
                title="新增类别"
                visible={this.state.add}
                destroyOnClose
                onCancel={_ => this.setState({ add: false })}
                okText="保存"
                onOk={this.add}
            >
                <Input autoFocus onPressEnter={this.add} addonBefore="类别名称" ref="add" />
            </Modal>
            <Modal
                title="编辑类别"
                visible={!!this.state.edit}
                destroyOnClose
                onCancel={_ => this.setState({ edit: false })}
                okText="保存"
                onOk={this.save}
            >
                {this.state.edit && <>
                    <Input autoFocus onPressEnter={this.save} ref="type_name" addonBefore="类别名称" defaultValue={this.state.edit.type_name} />
                    <br />
                    <br />
                    <Popconfirm title="确认删除？" onConfirm={this.remove}>
                        <Button block type="danger">删除</Button>
                    </Popconfirm>
                </>}
            </Modal>
            <University />
        </div>
    }
}

export default Home
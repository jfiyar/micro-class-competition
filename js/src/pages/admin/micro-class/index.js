import React from 'react';
import { Table, Button, Modal, message, Popconfirm } from 'antd';
import { get, ip } from '@/utils/request';

class Home extends React.Component {
    state = { data: [] }
    offset = 0;
    limit = 10;
    columns = [
        { title: 'id', dataIndex: 'mc_id' },
        { title: '参赛教师', dataIndex: 'user_name' },
        { title: '比赛名', dataIndex: 'competition_name' },
        { title: '所属分类', dataIndex: 'type_name' },
        { title: '微课作品', key: 'meida', render: d => <Button icon="play-circle" onClick={() => this.setState({ media: d.media })} type="link">播放</Button> },
        {
            title: '操作', align: 'right', render: d => <Popconfirm title="不可撤销，确认删除?" onConfirm={() => this.delete(d.mc_id)}>
                <Button icon="lock" type="danger">删除</Button>
            </Popconfirm>
        },
    ]
    componentDidMount() {
        this.getData();
    }
    delete = id => {
        get(`/admin/micro_class/${id}/delete`).then(() => {
            message.warn('删除成功')
            this.getData()
        })
    }
    getData = () => {
        this.setState({ loading: true })
        return get('/admin/micro_class', {
            offset: this.offset,
            limit: this.limit,
            type: 2,
        }).then(json => {
            const { data } = json
            console.log(json)
            this.setState({ data: data.micro_class, count: data.count, loading: false })
        })
    }
    pageChange = (page, limit) => {
        this.offset = (page - 1) * limit;
        this.limit = limit;
        this.getData();
    }
    render() {
        return <div>
            <Table
                rowKey="mc_id"
                loading={this.state.loading} columns={this.columns}
                rowSelection={{ onChange: () => { } }}
                pagination={{
                    onChange: this.pageChange,
                    onShowSizeChange: this.pageChange,
                    total: this.state.count,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (d) => '共' + d + '条数据'
                }}
                dataSource={this.state.data}
            >

            </Table>
            <Modal footer={null} width={800} title={this.state.mediaTitle} onCancel={() => this.setState({ media: false })} destroyOnClose visible={!!this.state.media}>
                <div style={{ textAlign: 'center' }}>
                    <video style={{ maxHeight: 460, maxWidth: '100%' }} src={ip + this.state.media} controls autoPlay />
                </div>
            </Modal>
        </div>
    }
}

export default Home
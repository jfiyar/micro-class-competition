import React from 'react'
import { Layout, Table } from "antd";
import UserAvatar from "@/components/avatar";
import { get } from '@/utils/request';
import banner from '@/images/banner.jpg';

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: props.match.params.id, com: {}, mcList: [] }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        get('/teacher/competition/' + this.state.id).then(json => {
            console.log(json)
            this.setState({ com: json.data.competition, mcList: json.data.micro_class })
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
    render() {
        return <Layout>
            <Layout.Header style={{ color: '#fff' }}>
                <UserAvatar style={{ float: 'right' }} />
            </Layout.Header>
            <Layout.Content style={{ minHeight: '100vh' }}>
                <div style={{ background: `url(${banner}) center`, backgroundSize: 'cover', color: '#fff', padding: 30, textAlign: 'center' }}>
                    <div style={{ fontSize: 46 }}>{this.state.com.competition_name}</div>
                    <div style={{ fontSize: 17, letterSpacing: .4, marginTop: -10 }}>{this.state.com.competition_time}</div>
                    <br />
                    <div
                        style={{
                            maxWidth: 900, lineHeight: '40px', margin: '0 auto', textAlign: 'left', fontSize: 16, fontWeight: 'lighter', letterSpacing: 1,
                            textShadow: '0 1px 1px #000'
                        }}
                    >
                        {this.state.com.competition_desc}
                        <br /><br />
                    </div>
                </div>
                <Table
                    pagination={false}
                    rowKey="mc_id"
                    columns={this.columns}
                    dataSource={this.state.mcList}
                />
            </Layout.Content>
        </Layout>
    }
}

export default p => <Page key={Math.random()} {...p} />
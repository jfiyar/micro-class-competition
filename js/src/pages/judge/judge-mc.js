import React from 'react'
import { Layout, Button, Modal, message, Divider, Icon, Tooltip } from "antd";
import UserAvatar from "@/components/avatar";
import { ip, get } from '@/utils/request';
import banner from '@/images/banner.jpg';
import RateForm from './RateForm';
import { Link } from 'react-router-dom'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: props.match.params.judge_id, com: {} }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        get('/judge/competition/' + this.state.id).then(json => {
            this.setState({ com: json.data })
        })
    }
    render() {
        let down = []
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
                <br />
                <div style={{ margin: 20 }}>
                    {this.state.com.mc && this.state.com.mc.map((mc, i) => {
                        const name = `作品${i + 1}`;
                        if (mc.score | mc.score === 0) {
                            mc.name = name
                            down.push(mc)
                            return null
                        }
                        return (<div key={mc.mc_id} style={
                            {
                                margin: 20,
                                background: '#fff',
                                display: 'inline-block',
                                padding: '14px 20px',
                                borderRadius: 6,
                                boxShadow: '2px 2px 3px #ccc'
                            }
                        }>
                            <span style={{ fontSize: 16, marginRight: 20 }}>{name}</span>
                            <Button icon="play-circle" onClick={() => this.setState({ isUpdate: false, media: mc.media, mediaTitle: name, mcId: mc.mc_id, score: 0, commend: '' })} type="primary" >打分</Button>
                        </div>)
                    })}
                </div>
                <Divider ><Icon type="down" />已打分 <Tooltip title="已打分的微课作品，点击查看按钮可以重新审阅、打分。"><Icon style={{ color: '#aaa', cursor: 'pointer' }} type="question-circle" /></Tooltip></Divider>
                <div style={{ margin: 20 }}>
                    {this.state.com.mc && down.map((mc, i) => {
                        const name = mc.name;
                        return (<div key={mc.mc_id} style={
                            {
                                margin: 20,
                                background: '#fff',
                                display: 'inline-block',
                                padding: '14px 20px',
                                width: 300,
                                borderRadius: 6,
                                boxShadow: '2px 2px 3px #ccc'
                            }
                        }>
                            <span style={{ fontSize: 16, marginRight: 20 }}>{name}</span>
                            <span style={{ float: 'right' }}>{mc.score}分</span>
                            <pre style={{ padding: 10, lineHeight: '20px', height: 50, overflowY: 'hidden' }}>{mc.commend}</pre>
                            <div style={{ textAlign: 'right' }}>
                                <Button icon="play-circle" onClick={() => this.setState({ isUpdate: true, media: mc.media, mediaTitle: name, mcId: mc.mc_id, score: mc.score, commend: mc.commend })} type="primary" >查看</Button>
                            </div>
                        </div>)
                    })}
                </div>
                <div style={{ position: 'fixed', bottom: '5vh', right: '5vw' }}>
                    <Link to="/judge"><Button shape="circle" size="large" type="primary" icon="rollback" /></Link>
                </div>
                <Modal footer={null} width={800} title={this.state.mediaTitle} onCancel={() => this.setState({ media: false })} destroyOnClose visible={!!this.state.media}>
                    <div style={{ textAlign: 'center' }}>
                        <video style={{ maxHeight: 460, maxWidth: '100%' }} src={ip + this.state.media} controls autoPlay />
                    </div>
                    <Divider />
                    <RateForm isUpdate={!!this.state.isUpdate} score={this.state.score} commend={this.state.commend} judgeId={this.state.id} mcId={this.state.mcId} onCancel={() => this.setState({ media: false })} onSuccess={() => {
                        message.success('提交成功')
                        this.loadData()
                        this.setState({ media: false })
                    }} />
                </Modal>
            </Layout.Content>
        </Layout>
    }
}

export default p => <Page key={Math.random()} {...p} />
import React from 'react';
import { Table,Button, Modal, Form, Input, message, Tooltip, Switch, Select } from 'antd';
import {get, post} from '@/utils/request';

class MySelect extends React.Component{
    state={ops:[],loading:false}
    def=[]
    componentDidMount(){
        get('/admin/user',{type:2,competition_id:this.props.d.competition_id}).then(json=>{
            json.data.user.map(i=>{
                return i.judge_competition_id&&this.def.push(i.user_id)
            })
            this.props.onChange(this.def)
            this.setState({ops:json.data.user,loading:true})
        })
    }
    render(){
        return<div>
            {this.state.loading&&<Select mode="multiple" onChange={this.props.onChange} defaultValue={this.def} style={{width:'100%'}}>
                {this.state.ops.map(i=>{
                    return <Select.Option value={i.user_id} key={i.user_id}>
                        {i.user_name}({i.account})
                    </Select.Option>
                })}
            </Select>}
        </div>
    }
}
class MySwitch extends React.Component{
    constructor(props){
        super(props)
        this.state={open:props.data===1}
    }
    handleChange=d=>{
        this.setState({open:d})
        post(`/admin/competition/${this.props.id}/update`,{
            competition_state:d?1:0
        })
    }
    render(){
        return<Tooltip title={this.state.open?'已开启':'已关闭'}><Switch onChange={this.handleChange} defaultChecked={this.state.open}/></Tooltip>
    }
}
class Home extends React.Component{
    state={data:[],competition:{}}
    offset=0;
    limit=10;
    columns=[
        {title:'id',dataIndex:'competition_id'},
        {title:'比赛名',dataIndex:'competition_name'},
        {title:'比赛状态',render:d=><MySwitch id={d.competition_id} data={d.competition_state} />},
        {title:'描述',render:d=><Tooltip title={d.competition_desc}>{d.competition_desc.substr(0,10)+'...'}</Tooltip>},
        {title:'时间描述',render:d=><Tooltip title={d.competition_time}>{d.competition_time.substr(0,10)+'...'}</Tooltip>},
        {title:'裁判（位）',dataIndex:'judge'},
        {title:'选手（位）',dataIndex:'teacher'},
        {title:'参赛学校（所）',dataIndex:'university'},
        {title:<Button icon="plus" onClick={()=>this.setState({showAddModal:true})}>创建</Button>,align:'right',render:d=><Button.Group>
        <Button icon="edit" >编辑</Button>
        <Button icon="fork" onClick={()=>this.setState({addJudge:true,competition:d})} >指定</Button>
        <Button icon="eye" >查看</Button>
        </Button.Group>},
    ]
    componentDidMount(){
        this.getData();
    }
    getData=()=>{
        this.setState({loading:true})
        return get('/admin/competition',{
            offset:this.offset,
            limit:this.limit,
            type:1,
        }).then(json=>{
            console.log(json)
            this.setState({user:json.data.competition,count:json.data.count,loading:false})
        })
    }
    pageChange=(page,limit)=>{
        this.offset=(page-1)*limit;
        this.limit=limit;
        this.getData();
    }
    addOk=()=>{
        const title=this.refs.title.input.value;
        const time=this.refs.time.input.value;
        const desc=this.refs.desc.textAreaRef.value;
        let pass=true;
        if(!title){
            message.error("标题不能为空");
            pass=false;
        }
        if(!time){
            message.error("时间描述不能为空");
            pass=false;
        }
        if(!desc){
            message.error("竞赛描述不能为空");
            pass=false;
        }
        if(!pass){
            return
        }
        this.setState({okLoading:true})
        post('/admin/competition/add',{
            competition_name:title,
            competition_time:time,
            competition_desc:desc
        }).then(json=>{
            this.setState({okLoading:false,showAddModal:false})
            console.log(json)
        })

    }
    handleAddJudgeOk=()=>{
        get(`/admin/judge/${this.state.competition.competition_id}/reset`,{users:this.def}).then(json=>{
            this.setState({addJudge:false})
        })
    }
    render(){
        return<div>
            <Table columns={this.columns} 
                rowKey="competition_id"
                loading={this.state.loading}
                rowSelection={{onChange:()=>{}}}
                pagination={{
                    onChange:this.pageChange,
                    onShowSizeChange:this.pageChange,
                    total:this.state.count,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    showTotal:(d)=>'共'+d+'条数据'
                }} 
                dataSource={this.state.user}
            >

            </Table>
            <Modal title="创建比赛" okButtonProps={{loading:this.state.okLoading}} onOk={this.addOk} destroyOnClose onCancel={()=>this.setState({showAddModal:false})} visible={this.state.showAddModal}>
                <Form>
                    <Form.Item >
                        <Input ref="title" addonBefore="比赛标题" />
                    </Form.Item>
                    <Form.Item label="预估时间" >
                        <Input ref="time" />
                    </Form.Item>
                    <Form.Item label="描述" >
                        <Input.TextArea ref="desc" autosize={{minRows:4}} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal destroyOnClose onOk={this.handleAddJudgeOk} onCancel={()=>this.setState({addJudge:false})} visible={this.state.addJudge} title={this.state.competition.competition_name}>
                <MySelect d={this.state.competition} onChange={d=>this.def=d} />
            </Modal>
        </div>
    }
}

export default Home
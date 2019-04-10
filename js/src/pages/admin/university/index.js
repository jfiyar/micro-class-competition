import React from 'react';
import { Table,Button } from 'antd';
import {get} from '@/utils/request';

class Home extends React.Component{
    state={data:[]}
    offset=0;
    limit=10;
    columns=[
        {title:'id',dataIndex:'university_id'},
        {title:'高校名称',dataIndex:'university_name'},
        {title:'教师数量（名）',dataIndex:'teacher'},
        {title:'平均排名（位）',dataIndex:'range'},
        {title:'最高排名（位）',dataIndex:'top'},
        {title:<Button icon="plus">新增</Button>,align:'right',render:d=><Button.Group>
        <Button icon="lock" type="danger">删除</Button>
        <Button icon="edit" >编辑</Button>
        </Button.Group>},
    ]
    componentDidMount(){
        this.getData();
    }
    getData=()=>{
        this.setState({loading:true})
        return get('/admin/user',{
            offset:this.offset,
            limit:this.limit,
            type:2,
        }).then(json=>{
            this.setState({user:json.data.user,count:json.data.count,loading:false})
        })
    }
    pageChange=(page,limit)=>{
        this.offset=(page-1)*limit;
        this.limit=limit;
        this.getData();
    }
    render(){
        return<div>
            <Table loading={this.state.loading} columns={this.columns} 
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
        </div>
    }
}

export default Home
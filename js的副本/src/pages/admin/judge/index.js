import React from 'react';
import { Table,Button } from 'antd';
import {get} from '@/utils/request';

class Home extends React.Component{
    state={data:[]}
    offset=0;
    limit=10;
    columns=[
        {title:'账号',dataIndex:'account'},
        {title:'姓名',dataIndex:'user_name'},
        {title:'裁判场次（场）',dataIndex:'count'},
        {title:'平均评分(分)',dataIndex:'score'},
        {title:'性别',dataIndex:'sex'},
        {title:'联系电话',dataIndex:'tel'},
        {title:'邮箱',dataIndex:'email'},
        {title:<Button icon="plus">添加</Button>,align:'right',render:d=><Button.Group>
        <Button icon="eye" >查看</Button>
        <Button icon="fork" >指定</Button>
        </Button.Group>},
    ]
    componentDidMount(){
        this.getData();
    }
    getData=()=>{
        return get('/admin/user',{
            offset:this.offset,
            limit:this.limit,
            type:2,
        }).then(json=>{
            console.log(json)
            this.setState({user:json.data.user,count:json.data.count})
        })
    }
    pageChange=(page,limit)=>{
        this.offset=(page-1)*limit;
        this.limit=limit;
        this.getData();
    }
    render(){
        return<div>
            <Table columns={this.columns} 
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
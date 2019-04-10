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
        {title:'作品(个)',dataIndex:'count'},
        {title:'最高排行(位)',dataIndex:'score'},
        {title:'性别',dataIndex:'sex'},
        {title:'联系电话',dataIndex:'tel'},
        {title:'邮箱',dataIndex:'email'},
        {title:'所属高校',dataIndex:'university_name'},
        {title:'操作',align:'right',render:d=><Button.Group>
        <Button icon="lock" type="danger">封禁</Button>
        <Button icon="edit" >编辑</Button>
        <Button icon="eye" >查看</Button>
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
            type:1,
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
            <Table columns={this.columns} 
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
        </div>
    }
}

export default Home
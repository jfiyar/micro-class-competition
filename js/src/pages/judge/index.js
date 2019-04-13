import React from "react";
import {Layout,Button,Empty, Divider, Col, Row} from "antd";
import UserAvatar from "@/components/avatar";
import banner from '@/images/banner.jpg';
import{get}from '@/utils/request';
import {Link} from 'react-router-dom';

class MyCompetition extends React.Component{
    state={myCompetition:[]};
    componentDidMount(){
        this.getMyCompetition();
    }
    getMyCompetition=()=>{
        get('/judge/competition').then(json=>{
        console.log(json)
            this.setState({myCompetition:json.data})
        })
    };
    render(){
        return<div>
            {this.state.myCompetition.length===0&&<Empty description={"目前还没有分配给您的比赛哦"} />}
            <Row gutter={20}>
            {this.state.myCompetition.map(com=>{
                return <Col key={com.judge_id} style={{marginBottom:20}} span={6}>
                        <div style={{padding:20,background:'#082a46',color:'#fff',lineHeight:2}} key={com.competition_id+com.judge_user_id}>
                            <div style={{textAlign:'center',fontSize:20,marginBottom:20}}>{com.competition_name}</div>
                            <div>参赛教师：{com.teacher} 名</div>
                            <div style={{whiteSpace:"nowrap",overflowX:'hidden'}}>时间：{com.competition_time}</div>
                            <div>已上传微课作品：{com.media} 个</div>
                            <div>已评分作品：0 个</div>
                            <div>未评分作品：0 个</div>
                            <div style={{textAlign:'right',marginTop:20}}><Link to={'/judge/'+com.judge_id}><Button ghost>进入比赛</Button></Link></div>
                        </div>
                </Col>
            })}
            </Row>
        </div>
    }
}

const  Teacher=()=>{
    return<Layout>
        <Layout.Header style={{color:'#fff'}}>
            <UserAvatar style={{float:'right'}} />
        </Layout.Header>
        <Layout.Content>
            <div style={{background:`url(${banner}) center`,backgroundSize:'cover',color:'#fff',padding:30,textAlign:'center'}}>
                <div style={{fontSize:46}}>裁 判 守 则</div>
                <div style={{fontWeight:'lighter',fontSize:17,letterSpacing:.4,marginTop:-10}}>MICRO CLASS COMPETITION</div>
                <br/>
                <div
                    style={{
                        maxWidth:900,lineHeight:'40px',margin:'0 auto',textAlign:'left',fontSize:16,fontWeight:'lighter',letterSpacing:1,
                        textShadow:'0 1px 1px #000'
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;裁判应当公平公正的为作品打分，为参赛教师提供优质的评分服务，裁判身份由超管指定，超管会根据您的专业，
                    评分以及留言表现为您分配适当的微课比赛。
                    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打分方法：在下方选择微课比赛，进入微课作品列表，系统将为您列出没有评分的微课作品，在比赛截止之前，
                    您可以修改您的打分以及评论，一旦比赛结束，不允再修改。
                    <br/><br/>
                </div>
            </div>
            <div>
                <div style={{background:'#fff',marginBottom:10,padding:20}}>
                    <Divider>比赛列表</Divider>
                    <MyCompetition/>
                </div>
            </div>
        </Layout.Content>
    </Layout>
};

export default Teacher
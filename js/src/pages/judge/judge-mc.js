import React from 'react'
import {Layout, Row, Col, Button} from "antd";
import UserAvatar from "@/components/avatar";
import {ip,get} from '@/utils/request';
import banner from '@/images/banner.jpg';

class Page extends React.Component{
    constructor(props){
        super(props)
        this.state={id:props.match.params.judge_id,com:{}}
    }
    componentDidMount(){
        get('/judge/competition/'+this.state.id).then(json=>{
            console.log(json);
            this.setState({com:json.data})
        })
    }
    render(){
        return<Layout>
        <Layout.Header style={{color:'#fff'}}>
            <UserAvatar style={{float:'right'}} />
        </Layout.Header>
        <Layout.Content>
            <div style={{background:`url(${banner}) center`,backgroundSize:'cover',color:'#fff',padding:30,textAlign:'center'}}>
                <div style={{fontSize:46}}>{this.state.com.competition_name}</div>
                <div style={{fontSize:17,letterSpacing:.4,marginTop:-10}}>{this.state.com.competition_time}</div>
                <br/>
                <div
                    style={{
                        maxWidth:900,lineHeight:'40px',margin:'0 auto',textAlign:'left',fontSize:16,fontWeight:'lighter',letterSpacing:1,
                        textShadow:'0 1px 1px #000'
                    }}
                >
                    {this.state.com.competition_desc}
                    <br/><br/>
                </div>
            </div>
            <br />
            <Row gutter={10} style={{margin:20}}>
                {this.state.com.mc&&this.state.com.mc.map((mc,i)=>{
                    return <Col key={mc.mc_id} span={6}>
                        <div style={{margin:10,background:'#072f60',color:'#fff',padding:20}}>
                            <div> 微课作品 {i+1}</div>
                            <div> 分数 {100}</div>
                            <div> 点评 234123</div>
                            <Button style={{marginTop:20}} size="large" block ghost icon="play-circle">播放</Button>
                        </div>
                    </Col>
                })}
            </Row>
        </Layout.Content>
    </Layout>
    }
}

export default p=><Page key={Math.random()} {...p} />
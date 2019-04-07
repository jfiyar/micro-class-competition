import React from "react";
import {Layout,Divider,Empty} from "antd";
import UserAvatar from "@/components/avatar";
import banner from '@/images/banner.jpg';

class MyCompetition extends React.Component{
    state={myCompetition:[]};
    render(){
        return<div>
            {this.state.myCompetition.length===0&&<Empty description={"您还没有参赛作品哦"} />}
            {this.state.myCompetition.map(com=>{
                return <div>1</div>
            })}
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
                <div style={{fontSize:46}}>微 课 竞 赛</div>
                <div style={{fontWeight:'lighter',fontSize:17,letterSpacing:.4,marginTop:-10}}>MICRO CLASS COMPETITION</div>
                <br/>
                <div
                    style={{
                        maxWidth:900,lineHeight:'40px',margin:'0 auto',textAlign:'left',fontSize:16,fontWeight:'lighter',letterSpacing:1,
                        textShadow:'0 1px 1px #000'
                    }}
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“微课”的核心组成内容是课堂教学视频（课例片段），同时还包含与该教学主题相关的教学设计、素材课件、教学反思、练习测试及学生反馈、教师点评等辅助性教学资源，它们以一定的组织关系和呈现方式共同“营造”了一个半结构化、主题式的资源单元应用“小环境”。<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因此，“微课”既有别于传统单一资源类型的教学课例、教学课件、教学设计、教学反思等教学资源，又是在其基础上继承和发展起来的一种新型教学资源。<br/><br/>
                </div>
            </div>
            <div>
                <div style={{background:'#fff',marginBottom:10,padding:20}}>
                    <Divider >我的参赛</Divider>
                    <MyCompetition/>
                </div>
                <div style={{background:'#fff',padding:20}}>
                    <Divider >比赛信息</Divider>
                    <Empty description={"很遗憾，目前还没有比赛，耐心等待比赛发布"} />
                </div>
            </div>
        </Layout.Content>
    </Layout>
};

export default Teacher
import React from "react";
import {Layout,Divider,Empty, Button, message, Tooltip, Upload} from "antd";
import UserAvatar from "@/components/avatar";
import banner from '@/images/banner.jpg';
import {get,ip} from '@/utils/request'
import bg from '@/images/true.jpeg'
class MyUpload extends React.Component{
    state={}
    uploadProps = {
        name: 'file',
        action: ip+'/teacher/micro-class/upload',
        headers: {
            authorization: localStorage.getItem('token'),
        },
        beforeUpload:()=>{
            this.setState({
                loading:true
            })
        },
        onChange:info=> {
            if (info.file.status === 'uploading') {
                if(info.event){
                    console.log(parseFloat(info.event.percent))
                    this.setState({progress:parseFloat(info.event.percent)})
                }
            }
            if (info.file.status === 'done') {
                this.setState({
                    loading:false
                })
            message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
            this.setState({
                loading:false
            })
            }
        },
    };
    render(){
        return<Upload {...this.uploadProps} ><Button loading={this.state.loading} ghost size="small" icon="upload" >
        {this.state.loading?parseInt(this.state.progress)+'%':'上传'}
        </Button></Upload>
    }
}
class Competition extends React.Component{
    state={competition:[]};
    componentDidMount(){
        get("/teacher/competition").then(json=>{
            console.log(json)
            this.setState({competition:json.data.competition})
        })

    }
    handleJoin=id=>{
        get(`/teacher/competition/${id}/join`).then(json=>{
            if(json.code===0){
                message.success("报名成功");
                this.props.onSuccess();
            }else{
                message.error("报名失败");
            }
        })
    }
    render(){
        return<div>
            {this.state.competition.length===0&&<Empty description={"很遗憾，目前还没有比赛，耐心等待比赛发布"} />}
            <div style={{width:'100%',overflowX:'auto',whiteSpace:'nowrap'}}>
            {this.state.competition.map(com=>{
                return <div key={com.competition_id} style={{width:500,padding:20,whiteSpace:'normal',color:'#fff',margin:20,background:'#0d143c',display:'inline-block'}}>
                    <div style={{fontSize:26,textAlign:'center',fontWeight:'lighter'}}>【{com.type_name}】{com.competition_name}</div>
                    <div style={{textAlign:'center',color:'rgba(255,255,255,.6)',paddingBottom:20}}>时间：{com.competition_time}</div>
                    <pre style={{whiteSpace:'normal',lineHeight:2,height:140,overflow:'hidden'}}>{com.competition_desc}</pre>
                    <div style={{textAlign:'right'}}><Button onClick={()=>{this.handleJoin(com.competition_id)}} ghost>报名参赛</Button></div>
                </div>
            })}
            </div>
        </div>
    }
}

class Teacher extends React.Component{
    state={myCompetition:[]}
    componentDidMount(){
        this.loadMyCompetition();
    }
    loadMyCompetition=()=>{
        get('/teacher/micro-class').then(json=>{
            this.setState({myCompetition:json.data})
        })
    }
    render(){
        return <Layout>
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
                    <div>
                        {this.state.myCompetition.length===0&&<Empty description={"您还没有参赛作品哦"} />}
                        <div style={{whiteSpace:'nowrap',overflowX:'auto'}}>
                            {this.state.myCompetition.map(com=>{
                                return <div style={{display:'inline-block',width:300,height:180,whiteSpace:'normal',margin:20,background:`url(${bg}) center`,
                                backgroundSize:'cover',borderRadius:10,overflow:'hidden',color:'#fff'
                                }}>
                                <div style={{width:'100%',height:'100%',padding:20,background:'rgba(0,0,0,.6)'}}>
                                    <div style={{textAlign:'center',paddingBottom:10,fontSize:18}}>{com.competition_name}</div>
                                    <div style={{fontSize:12,height:20,overflow:'hidden'}}>时间：<Tooltip title={com.competition_time}>{com.competition_time}</Tooltip></div>
                                    <div>分类：{com.type_name}</div>
                                    <div>排行：{com.score?com.score:"待结算"}</div>
                                    <div style={{textAlign:'right',marginTop:20}}><MyUpload/></div>
                                </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div style={{background:'#fff',padding:20}}>
                    <Divider >比赛信息</Divider>
                    <Competition onSuccess={this.loadMyCompetition} />
                </div>
            </div>
        </Layout.Content>
    </Layout>
    }
}

export default Teacher
import React from 'react'
import { Form, InputNumber, Input, Button, Slider } from 'antd';
import {post} from '@/utils/request'
class RateForm extends React.Component{
    handleSubmit=event=>{
        event.preventDefault();
        this.props.form.validateFields((err,data)=>{
            console.log(err,data);
            if(err){
                return
            }
            data.mc_id=this.props.mcId
            if(this.props.isUpdate){
                data.isUpdate=true;
            }
            post('/judge/micro-class/'+this.props.judgeId,data).then(json=>{
                this.props.onSuccess();
            })
        })
    }
    render(){
        const {getFieldDecorator}=this.props.form
        return(
            <Form onSubmit={this.handleSubmit} labelCol={{sm:2}} wrapperCol={{sm:22}}>
                <Form.Item label="成绩">
                    {getFieldDecorator('score',{initialValue:this.props.score,rules:[{required:true}]})(<Slider style={{width:580,maxWidth:'97%',display:'inline-block',float:'left'}} min={0} max={100} />)}
                    {getFieldDecorator('score',{initialValue:this.props.score,rules:[{required:true}]})(<InputNumber style={{float:'right',marginTop:2}} min={0} max={100} />)}
                </Form.Item>
                <Form.Item label="点评">
                    {getFieldDecorator('commend',{initialValue:this.props.commend,rules:[{required:true}]})(<Input.TextArea placeholder="作品优点，不足之处，内容的生动性，教学效率等方面" autosize={{minRows:3}} />)}
                </Form.Item>
                <div style={{textAlign:'right'}}>
                    <Button onClick={this.props.onCancel} style={{marginRight:20}}>取消</Button> <Button htmlType="submit" type="primary">提交打分</Button>
                </div>
            </Form>
        )
    }
}

export default Form.create({name:'rate-form'})(RateForm)
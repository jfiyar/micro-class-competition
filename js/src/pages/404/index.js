import React from "react";
import {Icon} from 'antd';

export default ()=>{
    return <div style={{width:330,height:100,margin:'auto',position:'fixed',left:0,right:0,top:0,bottom:0}}>
        <div style={{marginTop:-100}}>
            <Icon style={{float:'left',fontSize:'100px'}} type="robot" />
            <div style={{float:'left',marginLeft:20}}>
                <div style={{fontSize:'110px',lineHeight:1,letterSpacing:10,marginTop:-20,color:'#f00'}}>404</div>
                <div style={{fontSize:16,marginTop:-10,fontWeight:'lighter',letterSpacing:6}}>您访问的页面不存在</div>
            </div>
        </div>
    </div>
}
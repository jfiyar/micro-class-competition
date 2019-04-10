import React from 'react'
import {Route, Switch} from "react-router-dom";
import Login from './login'
import NotFound from './404'
import Register from './register'
import Teacher from "./teacher";
import Judge from './judge';
import Admin from './admin';
const Homepage=({history})=>{
    if(!localStorage.getItem("token")){
        history.push("/login")
    }else {
        const auth=localStorage.getItem("auth");
        if(!auth){
            history.push("/login")
        }else {
            switch (auth){
                case "1":history.push("/teacher");break;
                case "2":history.push("/judge");break;
                case "3":history.push("/admin");break;
                default:history.push("/login");
            }
        }
    }
    return null;
};

const Pages = ()=>{
    return <div>
        <Route path="/" component={Homepage} exact />
        <Switch>
            <Route path="/teacher" component={Teacher} />
            <Route path="/judge" component={Judge}  />
            <Route path="/admin" component={Admin}  />
            <Route path="/login" component={Login}  />
            <Route path="/register" component={Register}  />
            <Route path="/:any" component={NotFound}  />
        </Switch>
    </div>
};

export default Pages
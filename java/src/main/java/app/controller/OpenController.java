package app.controller;


import app.mapper.TeacherMapper;
import app.mapper.UniversityMapper;
import app.mapper.UserMapper;


import app.util.AppException;
import app.util.Err;
import app.util.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/open")
public class OpenController {

    @Autowired UserMapper userMapper;
    @Autowired TeacherMapper teacherMapper;
    @Autowired UniversityMapper universityMapper;


    @PostMapping("/register")
    public void userLogin(@RequestParam HashMap map,int university_id) throws Exception {
        try{
            userMapper.add(map);
            System.out.println(map);
            teacherMapper.add(Integer.parseInt(map.get("user_id").toString()),university_id);
        }catch (Exception e){
            e.printStackTrace();
            throw new AppException(60001,"账户不可用");
        }
    }

    @PostMapping("/login")
    public HashMap userLogin(String account,String password) throws Exception {
        if(account==null){
            account="";
        }
        if(password==null){
            password="";
        }
        String finalAccount = account;
        String finalPassword = password;
        List<HashMap> list=userMapper.find(new HashMap(){{
            put("account", finalAccount);
            put("password", finalPassword);
            put("limit",1);
        }});
        if(list.isEmpty()){
            throw new AppException(Err.USER_LOGIN_ERR);
        }
        HashMap user=list.get(0);
        return new HashMap(){{
            put("token",new JWTUtil().createJWT(user.get("user_id").toString(),(int)user.get("type"),1000*60*60*24*24));
            put("auth",user.get("type"));
        }};

    }

    @GetMapping("/university")
    public List getUniversity(){
        return universityMapper.find();
    }
}

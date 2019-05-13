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
        if((int)user.get("delete")==1){
            throw new AppException(Err.USER_DELETED);
        }
        return new HashMap(){{
            put("token",new JWTUtil().createJWT(user.get("user_id").toString(),(int)user.get("type"),1000*60*60*24*24));
            put("auth",user.get("type"));
            put("user",user);
        }};

    }
    @PostMapping("/user/update")
    public void changeUser(@RequestParam HashMap map){
        System.out.println(map);
        userMapper.update(map);
    }
    @PostMapping("/user/changePassword")
    public void changePassword(@RequestParam HashMap map){
        int x=userMapper.changePassword(map);
        if(x==0){
            throw new Error("密码不正确");
        }
    }
    @GetMapping("/university")
    public List getUniversity(){
        return universityMapper.find();
    }

    @GetMapping("/method")
    public String get(){
        return "get 测试通过";
    }
    @PatchMapping("/method")
    public String patch(){
        return "patch 测试通过";
    }
    @PostMapping("/method")
    public HashMap post(@RequestParam HashMap map){
        return map;
    }

    @PutMapping("/method")
    public HashMap put(@RequestParam HashMap map){
        map.put("message","put 测试通过");
        return map;
    }

    @DeleteMapping("/method")
    public String delete(){
        return "delete 测试通过";
    }
}

package app.controller;


import app.mapper.TeacherMapper;
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


    @PostMapping("/register")
    public void userLogin(@RequestParam HashMap map,int university_id) throws Exception {
        try{
            userMapper.add(map);
            teacherMapper.add((int)map.get("uid"),university_id);
        }catch (Exception e){
            throw new AppException(60001,"账户不可用");
        }
    }
}

package app.controller;


import app.mapper.CompetitionMapper;
import app.mapper.McMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired CompetitionMapper competitionMapper;
    @Autowired
    McMapper mcMapper;

    @GetMapping("/competition")
    public HashMap findCompetition(@RequestParam HashMap map){
        return new HashMap<String,Object>(){{
            put("competition",competitionMapper.find(map));
            put("count",competitionMapper.count(map));
        }};
    }
    @GetMapping("/competition/{id}/join")
    public void findCompetition(HttpServletRequest request, @PathVariable int id){
        int teacher=(int)request.getAttribute("this_user_id");
        mcMapper.add(new HashMap<String,Object>(){{
            put("user_id",teacher);
            put("competition_id",id);
        }});
    }
    @GetMapping("/micro-class")
    public List mc(HttpServletRequest req){
        return mcMapper.find(new HashMap<String,Object>(){{
            put("user_id",req.getAttribute("this_user_id"));
        }});
    }
    @PostMapping("/competition/{id}/upload")
    public void upload(MultipartFile file,HttpServletRequest req,@PathVariable int id) throws IOException {
        int user_id=(int)req.getAttribute("this_user_id");
        File path = new File(ResourceUtils.getURL("classpath:").getPath());
        if(!path.exists()) path = new File("");
        String media="/upload/"+new Date().getTime()+"&&"+user_id+"&&"+id+"&&"+file.getOriginalFilename();
        mcMapper.update(new HashMap<String,Object>(){{
            put("media",media);
            put("user_id",user_id);
            put("competition_id",id);
        }});
        file.transferTo(new File(path.getAbsolutePath()+"/static"+media));
    }
}

package app.controller;


import app.mapper.JudgeMapper;
import app.mapper.JudgeMcMapper;
import app.mapper.McMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/judge")
public class JudgeController {
    @Autowired
    JudgeMapper judgeMapper;
    @Autowired
    McMapper mcMapper;
    @Autowired
    JudgeMcMapper judgeMcMapper;
    @GetMapping("/competition")
    public List<HashMap> competition(HttpServletRequest request){
        int judge=(int)request.getAttribute("this_user_id");
        return judgeMapper.findCompetition(new HashMap<String,Object>(){{
            put("user_id",judge);
        }});
    }
    /**
     * 裁判比赛信息judge_id=>{比赛基本信息，[作品信息]}
     */
    @GetMapping("/competition/{judge_id}")
    public HashMap competitionDesc(@PathVariable int judge_id){
//        List<HashMap> list=judgeMapper.findMicroClass(new HashMap<String,Object>(){{
//            put("judge_id",id);
//            put("limit",1);
//        }});
//        HashMap<String,Object> map=list.get(0);
//        map.put("mc",mcMapper.find(new HashMap<String,Object>(){{
//            put("competition_id",map.get("competition_id"));
//            put("judge_id",id);
//        }}));
        return null;
    }
    @PostMapping("/micro-class/{id}")
    public void judgeMc(@PathVariable int id,@RequestParam HashMap<String,Object> map,boolean isUpdate){
        if(isUpdate){
            map.put("judge_id",id);
            judgeMcMapper.update(map);
            return;
        }
        map.put("judge_id",id);
        judgeMcMapper.add(map);
    }
}

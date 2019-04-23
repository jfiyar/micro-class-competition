package app.controller;


import app.mapper.CompetitionMapper;
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
    @Autowired
    CompetitionMapper competitionMapper;

    /**
     * 根据裁判信息，获取比列表
     * @param request 教师信息
     * @return 比赛列表
     */
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
        HashMap map=competitionMapper.findByJudgeId(judge_id);
        map.put("mc",mcMapper.findByJudge(judge_id));
        return map;
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

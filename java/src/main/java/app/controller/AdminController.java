package app.controller;


import app.mapper.CompetitionMapper;
import app.mapper.JudgeMapper;
import app.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired UserMapper userMapper;
    @Autowired CompetitionMapper competitionMapper;
    @Autowired JudgeMapper judgeMapper;
    @GetMapping("/user")
    public HashMap user(@RequestParam HashMap<String, Object> hashMap, String offset, String limit){
        if(offset!=null){
            hashMap.put("offset",Integer.parseInt(offset));
        }
        if(limit!=null){
            hashMap.put("limit",Integer.parseInt(limit));
        }
        return new HashMap<String,Object>(){{
            put("user",userMapper.find(hashMap));
            put("count",userMapper.count(hashMap));
        }};
    }

    @GetMapping("/competition")
    public HashMap findCompetition(@RequestParam HashMap map){
        return new HashMap(){{
            put("competition",competitionMapper.find(map));
            put("count",competitionMapper.count(map));
        }};
    }
    @PostMapping("/competition/add")
    public void addCompetition(@RequestParam HashMap map){
        competitionMapper.add(map);
    }

    @PostMapping("/competition/{id}/update")
    public void updateComp(@RequestParam HashMap<String, Integer> map, @PathVariable int id){
        map.put("competition_id",id);
        competitionMapper.update(map);
    }

    @GetMapping("/judge/{competition}/reset")
    public void addJudge(@PathVariable int competition,String users){
        judgeMapper.remove(new HashMap(){{
            put("judge_competition_id",competition);
        }});
        String[] arr=users.split(",");
        for (int i = 0; i < arr.length; i++) {
            int finalI = i;
            judgeMapper.add(new HashMap(){{
                put("judge_competition_id",competition);
                put("judge_user_id",arr[finalI]);
            }});
        }
    }
}

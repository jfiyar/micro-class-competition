package app.controller;


import app.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired UserMapper userMapper;
    @Autowired CompetitionMapper competitionMapper;
    @Autowired JudgeMapper judgeMapper;
    @Autowired McMapper mcMapper;
    @Autowired UniversityMapper universityMapper;
    @Autowired TeacherMapper teacherMapper;
    @GetMapping("/type")
    public List findComTypes(){
        return competitionMapper.findTypes();
    }
    @PostMapping("/type/{id}/update")
    public void updateType(@RequestParam HashMap<String, Object> map, @PathVariable int id){
        map.put("type_id",id);
        competitionMapper.updateType(map);
    }
    @GetMapping("/type/{id}/remove")
    public void removeType( @PathVariable int id){
        competitionMapper.removeType(id);
    }
    @PostMapping("/type/add")
    public void addType(@RequestParam HashMap<String, Object> map){
        competitionMapper.addType(map);
    }
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
    @PostMapping("/user/add")
    public void addJudge(@RequestParam HashMap map){
        userMapper.add(map);
    }
    @PostMapping("/user/{id}/update")
    public void updateUser(@RequestParam HashMap map,@PathVariable int id){
        map.put("user_id",id);
        userMapper.update(map);
        if(map.get("university_id")!=null){
            teacherMapper.update(map);
        }
    }
    @GetMapping("/competition")
    public HashMap findCompetition(@RequestParam HashMap map){
        return new HashMap(){{
            put("competition",competitionMapper.find(map));
            put("count",competitionMapper.count(map));
        }};
    }
    @GetMapping("/competition/{id}")
    public HashMap teacherCompetition(@PathVariable int id){
        return new HashMap<String,Object>(){{
            put("competition",competitionMapper.findById(id));
            put("micro_class",mcMapper.findByCompetition(id));
        }};
    }
    @GetMapping("/competition/{id}/delete")
    public void deleteCom(@PathVariable int id){
        competitionMapper.delete(id);
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
    @GetMapping("/university")
    public List findUniversity(){
        return universityMapper.find();
    }

    @GetMapping("/micro_class")
    public HashMap mc(@RequestParam HashMap map){
        return new HashMap(){{
            put("micro_class",mcMapper.find(map));
            put("count",mcMapper.findCount(map));
        }};
    }

    @GetMapping("/micro_class/{id}/delete")
    public void dmc(@PathVariable int id){
        mcMapper.remove(new HashMap<String,Object>(){{
            put("mc_id",id);
        }});
    }

    @PostMapping("/university/add")
    public void addU(String university_name){
        universityMapper.add(university_name);
    }

    @PostMapping("/university/update")
    public void addU(String university_name,int university_id){
        universityMapper.update(university_id,university_name);
    }

    @GetMapping("/university/delete")
    public void duni(int university_id){
        universityMapper.remove(university_id);
    }

}

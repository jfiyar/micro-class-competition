package app.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface McMapper {
    @Insert("insert into micro_class (mc_user_id,mc_competition_id)values(#{user_id},#{competition_id})")
    void add(HashMap hashMap);

    @Select("<script>" +
            "select * " +
            "from micro_class " +
            "left join competition on mc_competition_id=competition_id " +
            "left join type on competition_type=type_id " +
            "left join judge_mc on judge_id=#{judge_id} and judge_mc.mc_id=micro_class.mc_id " +
            "left join user on user_id=mc_user_id " +
            "where true" +
            "<if test='user_id!=null'>and mc_user_id=#{user_id}</if>" +
            "<if test='competition_id!=null'>and mc_competition_id=#{competition_id}</if>" +
            "</script>")
    List<HashMap> find(HashMap hashMap);

    //@Select("select micro_class.mc_id,media,score,commend from judge left join micro_class on judge_competition_id=mc_competition_id left join judge_mc on judge_mc.mc_id=micro_class.mc_id and judge_mc.judge_id=judge.judge_id where mc_competition_id=#{0}")
    @Select("select micro_class.*,user_name,sex,university.*,(select sum(score) from judge_mc where judge_mc.mc_id=micro_class.mc_id) score,(select count(1) from judge where judge_competition_id=1) judgeTotal,(select count(1) from judge_mc where micro_class.mc_id=judge_mc.mc_id) judgeCount from micro_class left join user on user_id=mc_user_id left join teacher on teacher_user_id=mc_user_id left join university on university_id=teacher_university_id  where mc_competition_id=#{0}")
    List<HashMap> findByCompetition(int id);

    @Update("<script>" +
            "update micro_class" +
            "<set>" +
            "<if test='media!=null'>media=#{media},</if>" +
            "" +
            "</set>" +
            "where mc_competition_id=#{competition_id} and mc_user_id=#{user_id}" +
            "</script>")
    void update(HashMap map);

    @Delete("<script>" +
            "delete from micro_class where " +
            "<if test='mc_id!=null'> mc_id=#{mc_id} </if>" +
            "<if test='mc_id==null'> mc_user_id=#{user_id} and mc_competition_id=#{competition_id}</if>" +
            "</script>")
    void remove(HashMap<String, Object> stringObjectHashMap);

    @Select("select micro_class.mc_id,media,score,commend from judge left join micro_class on judge_competition_id=mc_competition_id left join judge_mc on judge_mc.mc_id=micro_class.mc_id and judge_mc.judge_id=judge.judge_id where judge.judge_id=#{0}")
    List<HashMap> findByJudge(int judge_id);


    @Select("select competition_id,media,competition_state,competition_name,competition_time,type_name,(select count(1) from judge where judge_competition_id=mc_competition_id) judgeCount,(select sum(score) from judge_mc where judge_mc.mc_id=micro_class.mc_id) sc,(SELECT count(1) FROM judge_mc m where m.score>sc)+1 ranks,(select count(1) from judge_mc where judge_mc.mc_id=micro_class.mc_id) judgedCount from micro_class  left join competition on mc_competition_id=competition_id left join type on type_id=competition_type where mc_user_id=#{0}")
    List<HashMap> findByTeacher(int teacherUserId);

    @Select("<script>" +
            "select count(1) " +
            "from micro_class " +
            "left join competition on mc_competition_id=competition_id " +
            "left join type on competition_type=type_id " +
            "left join judge_mc on judge_id=#{judge_id} and judge_mc.mc_id=micro_class.mc_id " +
            "where true" +
            "<if test='user_id!=null'>and mc_user_id=#{user_id}</if>" +
            "<if test='competition_id!=null'>and mc_competition_id=#{competition_id}</if>" +
            "</script>")
    int findCount(HashMap map);
}

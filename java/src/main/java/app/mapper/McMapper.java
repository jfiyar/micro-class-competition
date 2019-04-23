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
            "where true" +
            "<if test='user_id!=null'>and mc_user_id=#{user_id}</if>" +
            "<if test='competition_id!=null'>and mc_competition_id=#{competition_id}</if>" +
            "</script>")
    List<HashMap> find(HashMap hashMap);

    @Select("select count(1) from competition")
    int count(HashMap map);

    @Update("<script>" +
            "update micro_class" +
            "<set>" +
            "<if test='media!=null'>media=#{media},</if>" +
            "" +
            "</set>" +
            "where mc_competition_id=#{competition_id} and mc_user_id=#{user_id}" +
            "</script>")
    void update(HashMap map);

    @Delete("delete from micro_class where mc_user_id=#{user_id} and mc_competition_id=#{competition_id}")
    void remove(HashMap<String, Object> stringObjectHashMap);

    @Select("select micro_class.mc_id,media,score,commend from judge left join micro_class on judge_competition_id=mc_competition_id left join judge_mc on judge_mc.mc_id=micro_class.mc_id where judge.judge_id=#{0}")
    List<HashMap> findByJudge(int judge_id);


    @Select("select * from micro_class left join competition on mc_competition_id=competition_id" +
            " left join type on competition_type=type_id" +
            " left join judge_mc on judge_mc.mc_id=micro_class.mc_id" +
            " where mc_user_id=#{0}")
    List<HashMap> findByTeacher(int teacherUserId);
}

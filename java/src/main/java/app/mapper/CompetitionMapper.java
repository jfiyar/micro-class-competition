package app.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface CompetitionMapper {
    @Insert("insert into competition (competition_name,competition_desc,competition_time)values(#{competition_name},#{competition_desc},#{competition_time})")
    void add(HashMap hashMap);

    @Select("select * from competition left join type on competition_type=type_id")
    List<HashMap> find(HashMap hashMap);

    @Select("select * from competition left join type on competition_type=type_id where competition_id=#{0}")
    HashMap findById(int id);

    @Select("select count(1) from competition")
    int count(HashMap map);

    @Update("<script>" +
            "update competition" +
            "<set>" +
            "<if test='competition_state!=null'>competition_state=#{competition_state}+0,</if>" +
            "<if test='competition_name!=null'>competition_name=#{competition_name},</if>" +
            "<if test='competition_desc!=null'>competition_desc=#{competition_desc},</if>" +
            "<if test='competition_time!=null'>competition_time=#{competition_time},</if>" +
            "<if test='competition_type!=null'>competition_type=#{competition_type},</if>" +
            "update_time=now(),"+
            "</set>" +
            "where competition_id=#{competition_id}" +
            "</script>")
    void update(HashMap map);

    @Select("select * from judge left join competition on competition_id=judge_competition_id where judge_id=#{0}")
    HashMap findByJudgeId(int judge_id);

    @Select("select * from type")
    List<HashMap> findTypes();

    @Update("update type set type_name=#{type_name} where type_id=#{type_id}")
    void updateType(HashMap map);

    @Delete("delete from type where type_id=#{0}")
    void removeType(int type_id);

    @Delete("delete from competition where competition_id=#{0}")
    void delete(int competition_id);

    @Insert("insert into type (type_name) values (#{type_name}) ")
    void addType(HashMap<String, Object> map);

}

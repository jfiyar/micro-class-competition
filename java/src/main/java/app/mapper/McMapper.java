package app.mapper;

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

    @Select("select * from micro_class left join competition on mc_competition_id=competition_id left join type on competition_type=type_id where mc_user_id=#{user_id}")
    List<HashMap> find(HashMap hashMap);

    @Select("select count(1) from competition")
    int count(HashMap map);

    @Update("<script>" +
            "update competition" +
            "<set>" +
            "<if test='competition_state!=null'>competition_state=#{competition_state}+0,</if>" +
            "" +
            "</set>" +
            "where competition_id=#{competition_id}" +
            "</script>")
    void update(HashMap map);
}

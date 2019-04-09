package app.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface CompetitionMapper {
    @Insert("insert into competition (competition_name,competition_desc,competition_time)values(#{competition_name},#{competition_desc},#{competition_time})")
    void add(HashMap hashMap);

    @Select("select * from competition left join type on competition_type=type_id")
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

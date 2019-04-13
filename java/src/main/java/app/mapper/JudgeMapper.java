package app.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface JudgeMapper {
    @Insert("insert into judge (judge_user_id,judge_competition_id)values(#{judge_user_id},#{judge_competition_id})")
    void add(HashMap hashMap);

    @Delete("delete from judge where judge_competition_id=#{judge_competition_id}")
    void remove(HashMap map);

    @Select("<script>select *," +
            "(select count(1) from micro_class where competition_id=mc_competition_id) teacher " +
//            "(select count(1) from micro_class where competition_id=mc_competition_id and media=null) media " +
//            "(select count(1) from micro_class where competition_id=mc_competition_id and media=null) media " +
            "from judge left join competition on judge_competition_id=competition_id " +
            "where true " +
            "<if test='user_id!=null'>and judge_user_id=#{user_id}</if>" +
            "<if test='judge_id!=null'>and judge_id=#{judge_id}</if>" +
            "<if test='limit!=null'>limit #{limit}</if>" +
            "</script>")
    List<HashMap> find(HashMap map);

}

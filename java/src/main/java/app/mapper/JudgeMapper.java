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

    /**
     * 查询裁判的比赛列表
     * @param map 裁判信息
     * @return 比赛列表
     */
    @Select("<script>"+
            "select type_name,judge_id,competition_id,competition_name,competition_time,competition_state,judge_id,(select count(1) from micro_class where mc_competition_id=competition_id) count ,(select count(1) from judge_mc where judge.judge_id=judge_id) review from judge left join competition on competition_id=judge_competition_id left join type on competition_type=type_id where judge_user_id=#{user_id}"+
            "</script>")
    List<HashMap> findCompetition(HashMap map);

    @Select("<script>"+
            "select type_name,judge_id,competition_id,competition_name,competition_time,competition_state,judge_id,(select count(1) from micro_class where mc_competition_id=competition_id) count ,(select count(1) from judge_mc where judge.judge_id=judge_id) review from judge left join competition on competition_id=judge_competition_id left join type on competition_type=type_id where judge_user_id=#{user_id}"+
            "</script>")
    List<HashMap> findMicroClass(HashMap map);


}

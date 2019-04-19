package app.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface JudgeMcMapper {
    @Insert("insert into judge_mc (judge_id,mc_id,score,commend)values(#{judge_id},#{mc_id},#{score},#{commend})")
    void add(HashMap hashMap);

    @Delete("delete from judge where judge_competition_id=#{judge_competition_id}")
    void remove(HashMap map);


    @Update("update judge_mc set score=#{score},commend=#{commend} where mc_id=#{mc_id} and judge_id=#{judge_id}")
    void update(HashMap<String, Object> map);
}

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

}

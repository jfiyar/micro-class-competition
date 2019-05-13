package app.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Repository
public interface TeacherMapper {
    @Insert("insert into teacher (teacher_user_id,teacher_university_id) values (#{user_id},#{university_id})")
    void add(@Param("user_id")int user_id,@Param("university_id")int university_id);

    @Update("update teacher set teacher_university_id=#{university_id} where teacher_user_id=#{user_id}")
    void update(HashMap map);
}

package app.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherMapper {
    @Insert("insert into user (account,password) values (#{account},#{password})")
    void add(@Param("uid")int uid,@Param("university")int university);
}

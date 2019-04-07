package app.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.HashMap;

@Repository
public interface UserMapper {
    @Options(useGeneratedKeys = true,keyColumn = "uid",keyProperty = "uid")
    @Insert("insert into user (account,password) values (#{account},#{password})")
    void add(HashMap map);
}

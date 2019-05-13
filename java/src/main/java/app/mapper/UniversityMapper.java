package app.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface UniversityMapper {
    @Select("select * from university")
    List<HashMap> find();

    @Insert("insert into university set university_name=#{0}")
    void add(String university_name);

    @Update("update university set university_name=#{university_name} where university_id=#{university_id}")
    void update(int university_id, String university_name);

    @Delete("delete from university where university_id=#{id}")
    void remove(int id);
}

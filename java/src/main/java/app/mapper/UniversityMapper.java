package app.mapper;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface UniversityMapper {
    @Select("select * from university")
    List<HashMap> find();
}

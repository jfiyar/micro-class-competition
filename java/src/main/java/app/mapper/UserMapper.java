package app.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface UserMapper {
    @Options(useGeneratedKeys = true,keyColumn = "user_id",keyProperty = "user_id")
    @Insert("insert into user (account,password) values (#{account},#{password})")
    void add(HashMap map);

    @Select("<script>select user_id,type,account,user_name,sex,tel,email" +
            "<if test='type==1'>,university_name</if>" +
            "<if test='competition_id!=null'>,judge_competition_id</if>" +
            " from user " +
            "<if test='type==1'>left join teacher on teacher_user_id=user_id left join university on university_id=teacher_university_id</if>"+
            "<if test='competition_id!=null'>left join judge on judge_user_id=user_id and judge_competition_id=#{competition_id}</if>"+
            "where true " +
            "<if test='type!=null'>and type=#{type}</if>" +
            "<if test='account!=null'>and account=#{account}</if>" +
            "<if test='password!=null'>and password=#{password}</if>" +
            "<if test='limit!=null'>limit #{limit} <if test='offset!=null'>offset #{offset}</if> </if>" +
            "</script>")
    List<HashMap> find(HashMap map);
    @Select("<script>select count(1) from user where true " +
            "<if test='account!=null'>and account=#{account}</if>" +
            "<if test='password!=null'>and password=#{password}</if>" +
            "<if test='type!=null'>and type=#{type}</if>" +
            "</script>")
    int count(HashMap map);

}

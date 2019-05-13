package app.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface UserMapper {
    @Options(useGeneratedKeys = true,keyColumn = "user_id",keyProperty = "user_id")
    @Insert("<script>" +
            "insert into user <set>" +
            "<if test='account!=null'>account=#{account},</if>" +
            "<if test='password!=null'>password=#{password},</if>" +
            "<if test='user_name!=null'>user_name=#{user_name},</if>" +
            "<if test='sex!=null'>sex=#{sex},</if>" +
            "<if test='type!=null'>type=#{type},</if>" +
            "<if test='email!=null'>email=#{email},</if>" +
            "<if test='tel!=null'>tel=#{tel},</if>" +
            "<if test='delete!=null'>`delete`=#{delete},</if>" +
            "</set></script>")
    void add(HashMap map);

    @Select("<script>select user_id,type,account,user_name,sex,tel,email,`delete`" +
            "<if test='type==1'>,university_name,university_id</if>" +
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

    @Update("<script>" +
            "update user <set>" +
            "<if test='account!=null'>account=#{account},</if>" +
            "<if test='user_name!=null'>user_name=#{user_name},</if>" +
            "<if test='password!=null'>password=#{password},</if>" +
            "<if test='sex!=null'>sex=#{sex},</if>" +
            "<if test='tel!=null'>tel=#{tel},</if>" +
            "<if test='account!=null'>tel=#{tel},</if>" +
            "<if test='email!=null'>email=#{email},</if>" +
            "<if test='type!=null'>type=#{type},</if>" +
            "<if test='time!=null'>time=#{time},</if>" +
            "<if test='delete!=null'>`delete`=#{delete},</if>" +
            "<if test='type!=null'>type=#{type},</if>" +
            "</set> where user_id=#{user_id}" +
            "</script>")
    void update(HashMap map);

    @Update("update user set password=#{newPassword} where user_id=#{user_id} and password=#{oldPassword}")
    int changePassword(HashMap map);
}

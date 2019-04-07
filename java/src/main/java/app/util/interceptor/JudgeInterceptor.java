package app.util.interceptor;

import app.util.AppException;
import app.util.Err;
import app.util.JWTUtil;
import com.alibaba.fastjson.JSON;
import io.jsonwebtoken.Claims;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

class JudgeInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String token=request.getHeader("Authorization");
        JWTUtil jwtUtil=new JWTUtil();
        Claims claims;
        boolean isNoAuth=false;
        try{
            claims=jwtUtil.parseJWT(token);
            if(!((int)claims.get("auth")>=2)){
                isNoAuth=true;
                throw new Error();
            }
        }catch (Exception e){
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json;charset=utf-8");
            Boolean finalIsNoAuth = isNoAuth;
            response.getWriter().write(JSON.toJSONString(new HashMap<String,Object>(){{
                AppException appException=new AppException(finalIsNoAuth ?Err.USER_AUTH_ERR:Err.USER_LOGIN_ERR);
                put("code",appException.getCode());
                put("message",appException.getMessage());
            }}));
            return false;
        }
        request.setAttribute("this_user_id",Integer.parseInt(claims.getId()));
        return true;
    }
    /**
     * 执行完Controller之后 && DispatcherServlet进行视图渲染之前执行
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        System.out.println("请求完成后的操作...");
    }

    /**
     * DispatcherServlet渲染之后取执行。可以用于资源清理等工作
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        System.out.println("视图渲染之后...");
    }
}

package app.util;

import com.alibaba.fastjson.JSON;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.util.HashMap;

@ControllerAdvice
public class ResultFormatter implements ResponseBodyAdvice {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Exception handleException(Exception e){
        e.printStackTrace();
        return e;
    }
    @Override
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        HashMap<String, Object> map=new HashMap<>();
        if(o instanceof AppException){
            AppException appException=(AppException)o;
            map.put("code",appException.getCode());
            map.put("message",appException.getMessage());
            System.out.println(appException.getMessage());
        }else if(o instanceof Exception){
            AppException appException=new AppException(Err.SYS_ERR);
            map.put("code",appException.getCode());
            map.put("message",appException.getMessage());
        }else {
            map.put("code",0);
            map.put("data",o);
            if(o instanceof String){
                return JSON.toJSONString(map);
            }
        }
        return map;
    }
}

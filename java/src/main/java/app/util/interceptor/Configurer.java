package app.util.interceptor;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Configurer
        implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 多个拦截器组成一个拦截器链
        // addPathPatterns 用于添加拦截规则
        // excludePathPatterns 用户排除拦截
        registry.addInterceptor(new JudgeInterceptor()).addPathPatterns("/judge/**");
        registry.addInterceptor(new TeacherInterceptor()).addPathPatterns("/teacher/**");
        registry.addInterceptor(new AdminLoginInterceptor()).addPathPatterns("/admin/**");
    }

}

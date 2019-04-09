package app.util;

public enum  Err {
    SYS_ERR(5000,"系统异常"),
    USER_AUTH_ERR(6100,"没有权限"),
    USER_LOGIN_ERR(6200,"账号或密码错误"),
    USER_NOT_LOGIN(6300,"用户未登录"),
    ;

    private int code;
    private String message;

    Err(int code,String message){
        this.code=code;
        this.message=message;
    }


    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

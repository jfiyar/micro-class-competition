package app.util;


public class AppException extends Exception {
    private int code;
    private String message;
    protected AppException(){}
    public AppException(Exception e){
        if(e instanceof AppException){
            AppException appException=(AppException)e;
            this.code=appException.getCode();
            this.message=appException.getMessage();
        }else {
            AppException appException=new AppException(Err.SYS_ERR);
            this.code=appException.getCode();
            this.message=e.getMessage();
        }
    }
    public AppException(int code,String message){
        this.code=code;
        this.message=message;
    }
    public AppException(Err err){
        this.code=err.getCode();
        this.message=err.getMessage();
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

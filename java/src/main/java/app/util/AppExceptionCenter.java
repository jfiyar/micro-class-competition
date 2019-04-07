package app.util;

public interface AppExceptionCenter {
    int SystemExceptionCode=10000;
    String SystemExceptionMessage="未知系统异常";

    int LoginExceptionCode=10001;
    String LoginExceptionMessage="用户未登录";

    int UserNotExistExceptionCode=10002;
    String UserNotExistExceptionMessage="用户不存在";
}

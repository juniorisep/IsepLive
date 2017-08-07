package com.iseplive.api.conf.jwt;

/**
 * Created by Guillaume on 07/08/2017.
 * back
 */
public class JwtAuthRequest {
    private String studentId;
    private String password;

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

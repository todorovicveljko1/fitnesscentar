package com.fitnesscentar.entities.dto;

public class UpdatePassDto {
    private String old_pass;
    private String pass;

    public String getOld_pass() {
        return old_pass;
    }

    public void setOld_pass(String old_pass) {
        this.old_pass = old_pass;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
}

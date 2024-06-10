package com.example.blinkidspringbootapp.entities.auth.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginReq {
    @NotBlank(message = "Email is cannot be empty")
    @Email
    private String email;
    @NotBlank(message = "Password is cannot be empty")
    private String password;
}

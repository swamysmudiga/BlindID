package com.example.blinkidspringbootapp.entities.auth.response;

import com.example.blinkidspringbootapp.entities.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRes {
    private String email;
    private String token;
    private User user;
}

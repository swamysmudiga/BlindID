package com.example.blinkidspringbootapp.exceptionhandling.exceptions;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserNotAuthenticatedException extends RuntimeException {
    private final String message;
}

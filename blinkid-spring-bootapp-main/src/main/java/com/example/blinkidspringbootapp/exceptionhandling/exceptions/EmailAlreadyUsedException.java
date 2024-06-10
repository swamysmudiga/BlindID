package com.example.blinkidspringbootapp.exceptionhandling.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EmailAlreadyUsedException extends RuntimeException {
    private final String message;
}

package com.example.blinkidspringbootapp.controllers.auth;

import com.example.blinkidspringbootapp.entities.auth.request.LoginReq;
import com.example.blinkidspringbootapp.entities.auth.response.LoginRes;
import com.example.blinkidspringbootapp.entities.user.User;
import com.example.blinkidspringbootapp.repositories.UserRepository;
import com.example.blinkidspringbootapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/users")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;

    }

    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<LoginRes> login(@RequestBody LoginReq loginReq) {

        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
        String email = authentication.getName();
        User user = userRepository.findUserByEmail(email);
        String token = jwtUtil.createToken(user);
        LoginRes loginRes = new LoginRes(email, token, user);

        return ResponseEntity.ok(loginRes);
    }
}
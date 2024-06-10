package com.example.blinkidspringbootapp.repositories;


import com.example.blinkidspringbootapp.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);

}

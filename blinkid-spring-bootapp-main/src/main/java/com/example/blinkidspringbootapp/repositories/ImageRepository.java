package com.example.blinkidspringbootapp.repositories;


import com.example.blinkidspringbootapp.entities.user.ERole;
import com.example.blinkidspringbootapp.entities.user.Image;
import com.example.blinkidspringbootapp.entities.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
}

package com.example.blinkidspringbootapp.repositories;


import com.example.blinkidspringbootapp.entities.Group;
import com.example.blinkidspringbootapp.entities.user.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
}

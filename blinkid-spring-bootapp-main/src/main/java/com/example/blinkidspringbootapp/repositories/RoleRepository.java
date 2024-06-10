package com.example.blinkidspringbootapp.repositories;


import com.example.blinkidspringbootapp.entities.user.ERole;
import com.example.blinkidspringbootapp.entities.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}

package com.example.blinkidspringbootapp.controllers.auth;


import com.example.blinkidspringbootapp.entities.user.ERole;
import com.example.blinkidspringbootapp.entities.user.Role;
import com.example.blinkidspringbootapp.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("roles")
public class RoleController {

    @Autowired
    RoleRepository roleRepository;


    @GetMapping
    public ResponseEntity<List<Role>> getRoleS() {
        return ResponseEntity.ok(roleRepository.findAll());
    }


    @GetMapping("/fill")
    public ResponseEntity<List<Role>> fillRoles() {

        // fill roles if not already filled in the database
        // if roles are already filled, return the roles
        try {
            Role role1 = new Role(ERole.ROLE_STUDENT);
            Role role2 = new Role(ERole.ROLE_STAFF);
            Role role3 = new Role(ERole.ROLE_ADMIN);
            Role role4 = new Role(ERole.ROLE_TEACHER);

            roleRepository.save(role1);
            roleRepository.save(role2);
            roleRepository.save(role3);
            roleRepository.save(role4);
        } catch (DuplicateKeyException e) {
            return ResponseEntity.ok(roleRepository.findAll());
        }
        return ResponseEntity.ok(roleRepository.findAll());
    }
}

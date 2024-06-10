package com.example.blinkidspringbootapp.controllers.user;

import com.example.blinkidspringbootapp.entities.auth.request.CreateUserRequest;
import com.example.blinkidspringbootapp.entities.auth.request.SignupRequest;
import com.example.blinkidspringbootapp.entities.user.ERole;
import com.example.blinkidspringbootapp.entities.user.Image;
import com.example.blinkidspringbootapp.entities.user.Role;
import com.example.blinkidspringbootapp.entities.user.User;
import com.example.blinkidspringbootapp.exceptionhandling.exceptions.EmailAlreadyUsedException;
import com.example.blinkidspringbootapp.repositories.ImageRepository;
import com.example.blinkidspringbootapp.repositories.RoleRepository;
import com.example.blinkidspringbootapp.repositories.UserRepository;
import com.example.blinkidspringbootapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User tutorial = userService.getUser(id);
        return new ResponseEntity<>(tutorial, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/students")
    public ResponseEntity<List<User>> getStudents() {
        return new ResponseEntity<>(userService.getStudents(), HttpStatus.OK);
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<User>> getTeachers() {
        return new ResponseEntity<>(userService.getTeachers(), HttpStatus.OK);
    }

    @GetMapping("/staff")
    public ResponseEntity<List<User>> getStaff() {
        return new ResponseEntity<>(userService.getStaff(), HttpStatus.OK);
    }

    @GetMapping("/admins")
    public ResponseEntity<List<User>> getAdmins() {
        return new ResponseEntity<>(userService.getAdmins(), HttpStatus.OK);
    }

    @GetMapping("/{userId}/groups")
    public ResponseEntity<?> getGroups(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUsersGroups(userId));
    }

    @GetMapping("/admins/{userId}/groups")
    public ResponseEntity<?> getAdminsGroups(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUsersAdminGroups(userId));
    }

    @GetMapping("/{userId}/exams")
    public ResponseEntity<?> getExams(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUsersExams(userId));
    }

    @GetMapping("/admins/{userId}/exams")
    public ResponseEntity<?> getAdminsExams(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUsersAdminExams(userId));
    }


    @PostMapping("/student")
    public ResponseEntity<User> saveStudent(@RequestBody CreateUserRequest request) {
        Role studentRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Error: Role Student is not found."));
        User user = new User(request.getUsername().trim(), request.getPassword().trim(), request.getEmail().trim());
        user.getRoles().add(studentRole);
        Image image = new Image(request.getImage());
        user.getImages().add(image);
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody SignupRequest signupRequest) {
        try {
            User user = new User(signupRequest.getUsername().trim(), signupRequest.getPassword().trim(), signupRequest.getEmail().trim());
            Set<Role> roles = new HashSet<>();
            if (signupRequest.getRoles() == null) {
                Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                        .orElseThrow(() -> new RuntimeException("Error: Role Student is not found."));
                roles.add(userRole);
            } else {
                roles.addAll(signupRequest.getRoles());
            }
            user.setRoles(roles);
            return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
        } catch (DuplicateKeyException exception) {
            throw new EmailAlreadyUsedException("Email already used.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.getUser(id);
        if (user.getEmail() != null)
            updatedUser.setEmail(user.getEmail().trim());
        if (user.getPassword() != null)
            updatedUser.setPassword(user.getPassword().trim());
        if (user.getUsername() != null)
            updatedUser.setUsername(user.getUsername().trim());
        if (user.getRoles() != null)
            updatedUser.setRoles(user.getRoles());
        if (user.getStatus() != null)
            updatedUser.setStatus(user.getStatus().trim());

        return new ResponseEntity<>(userService.updateUser(id, updatedUser), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        User user = userService.getUser(id);
        user.setStatus("DELETED");
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAllUsers() {
        userService.deleteAllUsers();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("{id}/images")
    public ResponseEntity<User> addImagesToUser(@PathVariable Long id, @RequestBody Image image) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        Image newImage = new Image(image.getUrl());
        user.getImages().add(newImage);
        userRepository.save(user);
        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    @DeleteMapping("{id}/images/{imageId}")
    public ResponseEntity<HttpStatus> deleteImageFromUser(@PathVariable Long id, @PathVariable Long imageId) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        Image image = imageRepository.findById(imageId).orElseThrow(() -> new RuntimeException("Image not found"));
        user.getImages().remove(image);
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}

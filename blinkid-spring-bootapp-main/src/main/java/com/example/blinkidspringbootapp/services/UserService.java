package com.example.blinkidspringbootapp.services;


import com.example.blinkidspringbootapp.entities.Exam;
import com.example.blinkidspringbootapp.entities.Group;
import com.example.blinkidspringbootapp.entities.user.User;
import com.example.blinkidspringbootapp.exceptionhandling.exceptions.ResourceNotFoundException;
import com.example.blinkidspringbootapp.repositories.ExamRepository;
import com.example.blinkidspringbootapp.repositories.GroupRepository;
import com.example.blinkidspringbootapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ExamRepository examRepository;

    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + id));
    }

    public List<User> getUsers() {
        return userRepository.findAll().stream().filter(user -> user.getStatus().equals("ACTIVE")).toList();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }


    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + id));
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setEmail(user.getEmail());
//        existingUser.setRoles(user.getRoles());
        existingUser.setStatus(user.getStatus());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }


    public List<User> getTeachers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRoles()
                        .stream()
                        .anyMatch(role -> role.getName().name().equals("ROLE_TEACHER")))
                .filter(user -> user.getStatus().equals("ACTIVE"))
                .toList();
    }

    public List<User> getStaff() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRoles()
                        .stream()
                        .anyMatch(role -> role.getName().name().equals("ROLE_STAFF")))
                .filter(user -> user.getStatus().equals("ACTIVE"))
                .toList();
    }
    public List<User> getStudents() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRoles()
                        .stream()
                        .anyMatch(role -> role.getName().name().equals("ROLE_STUDENT")))
                .filter(user -> user.getStatus().equals("ACTIVE"))
                .toList();
    }

    public List<User> getAdmins() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRoles()
                        .stream()
                        .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN")))
                .filter(user -> user.getStatus().equals("ACTIVE"))
                .toList();
    }

    public List<Group> getUsersGroups(Long userId) {
        return groupRepository.findAll()
                .stream()
                .filter(group -> group.getUsers()
                        .stream()
                        .anyMatch(user -> user.getId() == (userId)))
                .toList();

    }

    public List<Group> getUsersAdminGroups(Long userId) {
        return groupRepository.findAll()
                .stream()
                .filter(group -> group.getAdmins()
                        .stream()
                        .anyMatch(user -> user.getId() == (userId)))
                .toList();
    }

    public List<Exam> getUsersExams(Long userId) {
        return examRepository.findAll()
                .stream()
                .filter(exam -> exam.getUsers()
                        .stream()
                        .anyMatch(user -> user.getId() == (userId)))
                .toList();
    }

    public List<Exam> getUsersAdminExams(Long userId) {
        return examRepository.findAll()
                .stream()
                .filter(exam -> exam.getAdmins()
                        .stream()
                        .anyMatch(user -> user.getId() == (userId)))
                .toList();
    }
}

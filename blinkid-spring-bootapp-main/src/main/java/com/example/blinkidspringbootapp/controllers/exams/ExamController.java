package com.example.blinkidspringbootapp.controllers.exams;


import com.example.blinkidspringbootapp.entities.Exam;
import com.example.blinkidspringbootapp.entities.user.User;
import com.example.blinkidspringbootapp.repositories.ExamRepository;
import com.example.blinkidspringbootapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/exams")
public class ExamController {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(examRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable long id) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
        return ResponseEntity.ok(exam);
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<Exam> getUsersByExamId(@PathVariable long id) {
        Exam exam = examRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(exam);
    }

    @GetMapping("/{id}/admins")
    public ResponseEntity<Exam> getAdminsByExamId(@PathVariable long id) {
        Exam exam = examRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(exam);
    }

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        Exam newExam = new Exam();
        newExam.setName(exam.getName().trim());
        newExam.setDescription(exam.getDescription().trim());
        newExam.setExamDate(exam.getExamDate().trim());
        newExam.setExamTime(exam.getExamTime().trim());
        newExam.setExamDuration(exam.getExamDuration().trim());
        newExam.setExamLocation(exam.getExamLocation().trim());

        return ResponseEntity.ok(examRepository.save(newExam));
    }

    @PostMapping("/{id}/users/{userId}")
    public ResponseEntity<Exam> addUserToExam(@PathVariable long id, @PathVariable long userId) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        exam.getUsers().add(user);
        return ResponseEntity.ok(examRepository.save(exam));
    }

    @PostMapping("/{id}/admins/{userId}")
    public ResponseEntity<Exam> addAdminToExam(@PathVariable long id, @PathVariable long userId) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        exam.getAdmins().add(user);
        return ResponseEntity.ok(examRepository.save(exam));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable long id, @RequestBody Exam exam) {
        Exam existingExam = examRepository.findById(id).orElseThrow();
        existingExam.setName(exam.getName().trim());
        existingExam.setDescription(exam.getDescription().trim());
        existingExam.setExamDate(exam.getExamDate().trim());
        existingExam.setExamTime(exam.getExamTime().trim());
        existingExam.setExamDuration(exam.getExamDuration().trim());
        existingExam.setExamLocation(exam.getExamLocation().trim());
        return ResponseEntity.ok(examRepository.save(existingExam));
    }

    @DeleteMapping("/{id}/users/{userId}")
    public ResponseEntity<Exam> removeUserFromExam(@PathVariable long id, @PathVariable long userId) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        exam.getUsers().remove(user);
        return ResponseEntity.ok(examRepository.save(exam));
    }

    @DeleteMapping("/{id}/admins/{userId}")
    public ResponseEntity<Exam> removeAdminFromExam(@PathVariable long id, @PathVariable long userId) {
        Exam exam = examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        exam.getAdmins().remove(user);
        return ResponseEntity.ok(examRepository.save(exam));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable long id) {

        examRepository.deleteById(id);
        return ResponseEntity.ok("Exam deleted successfully");
    }


    @DeleteMapping
    public ResponseEntity<?> deleteAllExams() {
        examRepository.deleteAll();
        return ResponseEntity.ok("All exams deleted successfully");
    }

}

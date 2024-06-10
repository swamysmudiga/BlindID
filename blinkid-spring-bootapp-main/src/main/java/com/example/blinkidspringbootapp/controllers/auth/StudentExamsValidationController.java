package com.example.blinkidspringbootapp.controllers.auth;


import com.example.blinkidspringbootapp.entities.StudentExamValidation;
import com.example.blinkidspringbootapp.entities.user.ERole;
import com.example.blinkidspringbootapp.entities.user.Role;
import com.example.blinkidspringbootapp.repositories.RoleRepository;
import com.example.blinkidspringbootapp.repositories.StudentExamValidationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("student-exams-validations")
public class StudentExamsValidationController {

    @Autowired
    StudentExamValidationsRepository studentExamValidationsRepository;


    @GetMapping("/{examId}")
    public ResponseEntity<List<StudentExamValidation>> getStudentExamsValidations(@PathVariable long examId) {
        return ResponseEntity.ok(studentExamValidationsRepository.findByExamId(examId));
    }

    @GetMapping("/{examId}/{studentId}")
    public ResponseEntity<StudentExamValidation> getStudentExamValidation(@PathVariable long examId, @PathVariable long studentId) {
        return ResponseEntity.ok(studentExamValidationsRepository.findByStudentIdAndExamId(examId, studentId));
    }

    @PostMapping
    public ResponseEntity<StudentExamValidation> validateStudent(@RequestBody StudentExamValidation studentExamValidation) {
        try {
            return ResponseEntity.ok(studentExamValidationsRepository.save(studentExamValidation));
        } catch (DuplicateKeyException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentExamValidation> updateStudentValidation(@PathVariable long id, @RequestBody StudentExamValidation studentExamValidation) {
        if (studentExamValidationsRepository.existsById(id)) {
            studentExamValidation.setId(id);
            return ResponseEntity.ok(studentExamValidationsRepository.save(studentExamValidation));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteStudentValidation(@RequestBody StudentExamValidation studentExamValidation) {
        studentExamValidationsRepository.delete(studentExamValidation);
        return ResponseEntity.ok().build();
    }


}

package com.example.blinkidspringbootapp.repositories;


import com.example.blinkidspringbootapp.entities.StudentExamValidation;
import com.example.blinkidspringbootapp.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentExamValidationsRepository extends JpaRepository<StudentExamValidation, Long> {

    StudentExamValidation findByStudentIdAndExamId(long studentId, long examId);

    List<StudentExamValidation> findByExamId(long examId);

}

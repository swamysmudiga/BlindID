package com.example.blinkidspringbootapp.repositories;


import com.example.blinkidspringbootapp.entities.Exam;
import com.example.blinkidspringbootapp.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}

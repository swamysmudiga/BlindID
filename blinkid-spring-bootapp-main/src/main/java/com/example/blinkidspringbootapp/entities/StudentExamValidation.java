package com.example.blinkidspringbootapp.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "student_exams_validations")
public class StudentExamValidation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "exam_id")
    private long examId;

    @Column(name = "student_id")
    private long studentId;

    @Column(name = "status")
    private boolean status;

    @Column(name = "image")
    private String image;

    public StudentExamValidation(long studentId, boolean status, String image) {
        this.studentId = studentId;
        this.status = status;
        this.image = image;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public StudentExamValidation() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getExamId() {
        return examId;
    }

    public void setExamId(long examId) {
        this.examId = examId;
    }

    public long getStudentId() {
        return studentId;
    }

    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}

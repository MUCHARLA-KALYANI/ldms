package com.example.LearningAndDevelopment.training.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "training_requests")
public class TrainingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String trainingProgram;
    private String position;
    private String status;
    private String createdDate;
}

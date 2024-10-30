package com.example.LearningAndDevelopment.dto;

public class TrainingRequestDTO {
    private Long id;
    private String trainingProgram;
    private String position;
    private String status;
    private String createdDate;

    // Default constructor
    public TrainingRequestDTO() {
    }

    // Parameterized constructor
    public TrainingRequestDTO(Long id, String trainingProgram, String position, String status, String createdDate) {
        this.id = id;
        this.trainingProgram = trainingProgram;
        this.position = position;
        this.status = status;
        this.createdDate = createdDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrainingProgram() {
        return trainingProgram;
    }

    public void setTrainingProgram(String trainingProgram) {
        this.trainingProgram = trainingProgram;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }
}


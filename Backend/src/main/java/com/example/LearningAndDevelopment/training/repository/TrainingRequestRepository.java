package com.example.LearningAndDevelopment.training.repository;

import com.example.LearningAndDevelopment.training.model.TrainingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingRequestRepository extends JpaRepository<TrainingRequest, Long> {
}

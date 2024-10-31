package com.example.LearningAndDevelopment.repository;

import com.example.LearningAndDevelopment.model.TrainingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingRequestRepository extends JpaRepository<TrainingRequest, Long> {
    // You can define custom query methods if needed
}

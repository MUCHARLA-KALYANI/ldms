package com.example.LearningAndDevelopment.training.repository;

import com.example.LearningAndDevelopment.training.model.TrainingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRequestRepository extends JpaRepository<TrainingRequest, Long> {
    // Additional query methods can be defined here if needed
}

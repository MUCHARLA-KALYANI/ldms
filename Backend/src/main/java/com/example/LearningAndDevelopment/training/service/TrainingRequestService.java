package com.example.LearningAndDevelopment.training.service;

import com.example.LearningAndDevelopment.training.model.TrainingRequest;
import java.util.List;

public interface TrainingRequestService {
    TrainingRequest createTrainingRequest(TrainingRequest request);
    List<TrainingRequest> getAllRequests();
    TrainingRequest getRequestById(Long id);
    TrainingRequest updateTrainingRequest(Long id, TrainingRequest updatedRequest);
    void deleteRequestById(Long id);
}

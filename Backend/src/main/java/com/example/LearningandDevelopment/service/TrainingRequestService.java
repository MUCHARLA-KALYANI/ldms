package com.example.LearningAndDevelopment.training.service;

import com.example.LearningAndDevelopment.training.model.TrainingRequest;
import java.util.List;

public interface TrainingRequestService {
    TrainingRequest save(TrainingRequest trainingRequest);
    List<TrainingRequest> getAllRequests();
    TrainingRequest getRequestById(Long id);
    void deleteRequest(Long id);
}

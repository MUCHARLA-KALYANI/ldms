package com.example.LearningAndDevelopment.training.service;

import com.example.LearningAndDevelopment.training.model.TrainingRequest;
import com.example.LearningAndDevelopment.training.repository.TrainingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingRequestServiceImpl implements TrainingRequestService {

    @Autowired
    private TrainingRequestRepository repository;

    @Override
    public TrainingRequest createTrainingRequest(TrainingRequest request) {
        return repository.save(request);
    }

    @Override
    public List<TrainingRequest> getAllRequests() {
        return repository.findAll();
    }

    @Override
    public TrainingRequest getRequestById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Training request not found for ID: " + id));
    }

    @Override
    public TrainingRequest updateTrainingRequest(Long id, TrainingRequest updatedRequest) {
        TrainingRequest existingRequest = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Training request not found for ID: " + id));

        existingRequest.setTrainingProgram(updatedRequest.getTrainingProgram());
        existingRequest.setPosition(updatedRequest.getPosition());
        existingRequest.setStatus(updatedRequest.getStatus());
        existingRequest.setCreatedDate(updatedRequest.getCreatedDate());

        return repository.save(existingRequest);
    }

    @Override
    public void deleteRequestById(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Training request not found for ID: " + id);
        }
        repository.deleteById(id);
    }
}

package com.example.LearningAndDevelopment.training.controller;

import com.example.LearningAndDevelopment.training.model.TrainingRequest;
import com.example.LearningAndDevelopment.training.service.TrainingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class TrainingRequestController {

    @Autowired
    private TrainingRequestService service;

    @PostMapping
    public TrainingRequest createRequest(@RequestBody TrainingRequest request) {
        return service.createTrainingRequest(request);
    }

    @GetMapping
    public List<TrainingRequest> getAllRequests() {
        return service.getAllRequests();
    }

    @GetMapping("/{id}")
    public TrainingRequest getRequestById(@PathVariable Long id) {
        return service.getRequestById(id);
    }

    @PutMapping("/{id}")
    public TrainingRequest updateTrainingRequest(@PathVariable Long id, @RequestBody TrainingRequest updatedRequest) {
        return service.updateTrainingRequest(id, updatedRequest);
    }

    @DeleteMapping("/{id}")
    public String deleteRequestById(@PathVariable Long id) {
        service.deleteRequestById(id);
        return "Training request with ID " + id + " has been deleted successfully.";
    }
}

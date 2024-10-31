package com.example.LearningAndDevelopment.controller;

import com.example.LearningAndDevelopment.model.TrainingRequest;
import com.example.LearningAndDevelopment.service.TrainingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-requests")
public class TrainingRequestController {

    @Autowired
    private TrainingRequestService trainingRequestService;

    @PostMapping
    public ResponseEntity<TrainingRequest> createTrainingRequest(@RequestBody TrainingRequest trainingRequest) {
        TrainingRequest savedRequest = trainingRequestService.save(trainingRequest);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TrainingRequest>> getAllTrainingRequests() {
        List<TrainingRequest> requests = trainingRequestService.getAllRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingRequest> getTrainingRequestById(@PathVariable Long id) {
        TrainingRequest request = trainingRequestService.getRequestById(id);
        if (request != null) {
            return new ResponseEntity<>(request, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingRequest(@PathVariable Long id) {
        trainingRequestService.deleteRequest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

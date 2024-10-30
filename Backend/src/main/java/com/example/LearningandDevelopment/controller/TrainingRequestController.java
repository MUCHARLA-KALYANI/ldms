package com.example.LearningAndDevelopment.training.controller;

import com.example.LearningAndDevelopment.dto.TrainingRequestDTO;
import com.example.LearningAndDevelopment.training.model.TrainingRequest;
import com.example.LearningAndDevelopment.training.service.TrainingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/requests")
public class TrainingRequestController {

    @Autowired
    private TrainingRequestService trainingRequestService;

    @PostMapping
    public ResponseEntity<TrainingRequestDTO> createTrainingRequest(@RequestBody TrainingRequestDTO trainingRequestDTO) {
        TrainingRequest trainingRequest = new TrainingRequest();
        trainingRequest.setTrainingProgram(trainingRequestDTO.getTrainingProgram());
        trainingRequest.setPosition(trainingRequestDTO.getPosition());
        trainingRequest.setStatus(trainingRequestDTO.getStatus());
        trainingRequest.setCreatedDate(trainingRequestDTO.getCreatedDate());

        TrainingRequest savedRequest = trainingRequestService.save(trainingRequest);

        TrainingRequestDTO savedRequestDTO = new TrainingRequestDTO(savedRequest.getId(),
                savedRequest.getTrainingProgram(), savedRequest.getPosition(),
                savedRequest.getStatus(), savedRequest.getCreatedDate());

        return ResponseEntity.status(HttpStatus.CREATED).body(savedRequestDTO);
    }

    @GetMapping
    public ResponseEntity<List<TrainingRequestDTO>> getAllTrainingRequests() {
        List<TrainingRequest> requests = trainingRequestService.getAllRequests();
        List<TrainingRequestDTO> requestDTOs = requests.stream()
                .map(request -> new TrainingRequestDTO(request.getId(),
                        request.getTrainingProgram(), request.getPosition(),
                        request.getStatus(), request.getCreatedDate()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(requestDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingRequestDTO> getTrainingRequestById(@PathVariable Long id) {
        TrainingRequest request = trainingRequestService.getRequestById(id);
        if (request == null) {
            return ResponseEntity.notFound().build();
        }

        TrainingRequestDTO requestDTO = new TrainingRequestDTO(request.getId(),
                request.getTrainingProgram(), request.getPosition(),
                request.getStatus(), request.getCreatedDate());

        return ResponseEntity.ok(requestDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainingRequest(@PathVariable Long id) {
        trainingRequestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}

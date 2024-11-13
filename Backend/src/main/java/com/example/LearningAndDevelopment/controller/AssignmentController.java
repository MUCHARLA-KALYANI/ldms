package com.example.LearningAndDevelopment.controller;
import com.example.LearningAndDevelopment.model.Assignment;
import com.example.LearningAndDevelopment.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    // Create a new Assignment and assign a Course to an Employee
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Assignment assignCourseToEmployee(@RequestBody @Valid Assignment assignment) {
        return assignmentService.assignCourseToEmployee(assignment);
    }

    // Get all assignments
    @GetMapping
    public List<Assignment> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    // Get a specific assignment by ID
    @GetMapping("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id) {
        return assignmentService.getAssignmentById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found with id " + id));
    }

    // Update an existing assignment by ID
    @PutMapping("/{id}")
    public Assignment updateAssignment(@PathVariable Long id, @RequestBody @Valid Assignment assignment) {
        // Ensure assignment exists first
        Optional<Assignment> existingAssignment = assignmentService.getAssignmentById(id);

        if (existingAssignment.isPresent()) {
            // Update the existing assignment with new data
            Assignment currentAssignment = existingAssignment.get();
            currentAssignment.setEmployee(assignment.getEmployee());  // Update employee
            currentAssignment.setCourse(assignment.getCourse());      // Update course
            currentAssignment.setDeadline(assignment.getDeadline()); // Update deadline
            currentAssignment.setStatus(assignment.getStatus());     // Update status
            return assignmentService.assignCourseToEmployee(currentAssignment);  // Save updated assignment
        } else {
            throw new RuntimeException("Assignment not found with id " + id);
        }
    }

    // Delete an assignment by ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
    }
}
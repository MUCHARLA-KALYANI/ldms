package com.example.LearningAndDevelopment.controller;

import com.example.LearningAndDevelopment.model.Course;
import com.example.LearningAndDevelopment.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Create a new Course
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@RequestBody @Valid Course course) {
        return courseService.createCourse(course);
    }

    // Get all Courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // Get a specific Course by ID
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    // Update an existing Course by ID
    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody @Valid Course course) {
        Optional<Course> existingCourse = courseService.getCourseById(id);
        if (existingCourse.isPresent()) {
            Course currentCourse = existingCourse.get();
            currentCourse.setName(course.getName());
            currentCourse.setDescription(course.getDescription());
            currentCourse.setDuration(course.getDuration());
            return courseService.createCourse(currentCourse);  // Save updated course
        } else {
            throw new RuntimeException("Course not found with id " + id);
        }
    }

    // Delete a Course by ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }
}

import React, { useState, useEffect } from 'react';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Call API to get courses
    const coursesData = [
      { id: 1, courseName: 'Course 1', description: 'This is course 1' },
      { id: 2, courseName: 'Course 2', description: 'This is course 2' },
    ];
    setCourses(coursesData);
  }, []);

  const handleEditCourse = (courseId) => {
    // Call API to edit course
    console.log(`Edit course ${courseId}`);
  };

  return (
    <div className="courses-container">
      <h1>Courses</h1>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseName}</td>
              <td>{course.description}</td>
              <td>
                <button onClick={() => handleEditCourse(course.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
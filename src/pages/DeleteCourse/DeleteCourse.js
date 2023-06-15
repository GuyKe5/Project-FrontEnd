import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DeleteCourse(props) {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is admin
  if (!props.User.isAdmin) {
    return <>You need to be an admin</>;
  }

  const course = location.state.course;

  return (
    <div>
      <h1>Delete Course {course.name}</h1>
      <h2>Are you sure you want to delete this course?</h2>
      <button
        onClick={async () => {
          const apiResponse = await fetch(`https://localhost:7162/api/Course/DeleteCourse?courseId=${course.id}`, {
            method: 'DELETE',
            headers: {
              'accept': '*/*'
            }
          });
          const data = await apiResponse
          navigate('/AdminPage');
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteCourse;

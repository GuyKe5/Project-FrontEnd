import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function AdminPage(props) {
  const [admin, setAdmin] = useState(false);
  const [response, setResponse] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Check if user is an admin, set the admin state
    if (props.User.isAdmin === false) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }

    // Fetch courses from the API
    async function callApi() {
      const apiResponse = await fetch('https://localhost:7162/api/Course/GetAllCourses', {
        headers: {
          'accept': '*/*'
        } 
      });
      const data = await apiResponse.json();
      setResponse(data);
    }

    callApi();
  }, []);

  useEffect(() => {
    setCourses(response);
  }, [response]);

  if (!admin) {
    return <>You need to be an admin to view this page.</>;
  }

  return (
    <div className="AdminPage">
      <h1>Admin Page</h1>
      <Table2 courses={courses} />
    </div>
  );
}

function Table2({ courses }) {
  const CourseRows = courses.map((course, index) => (
    <tr key={course.id}>
      <td>{index + 1}</td>
      <td>{course.name}</td>
      <td>
        <Link to={`/course/${course.id}`}>link</Link>
      </td>
      <td>

        <Link as={Link} to={`/DeleteCourse/${course.id}`} state={{course:course}}>delete</Link>
      </td>
    </tr>
  ));

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>course Name</th>
          <th>course</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>{CourseRows}</tbody>
    </Table>
  );
}

export default AdminPage;

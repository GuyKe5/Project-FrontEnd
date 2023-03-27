import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
function CoursesTable(props){
  let CourseRows;
if(props.courses){
     CourseRows = props.courses.map((Course, index) => {
        return (
          <tr key={Course.id}>
            <td>{index + 1}</td>
            <td>{Course.name}</td>
            <td>{ <Link as={Link} to= {"/AddQuestion/"} state={{ courseId: Course.id}}> Course </Link>}</td>
            {/* <td>{<Link to={"/AddQuestion"}>edit</Link>}</td> */}
            
          </tr>
        );
      });
    }
      return (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Enrolled </th>
              <th>questions </th>
              <th>Edit Course</th>
            </tr>
          </thead>
          <tbody>{CourseRows}</tbody>
        </Table>
      );
}
export default CoursesTable;
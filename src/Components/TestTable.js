import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function TestTable(props){
  console.log(props.tests)
    let tests;
    if(props.tests!=null){
            tests = props.tests.map((test, index) => {
            return (
              <tr key={test.id}>
                <td>{index + 1}</td>
                <td>{test.name}</td>
                <td>
                <span className={test.status === "V" ? "text-success" : "text-warning"}>{test.status}</span>


</td>




                
              </tr>
            );
          });
        }
          return (
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>test Name</th>
                  <th>status </th>
                </tr>
              </thead>
              <tbody>{tests}</tbody>
            </Table>
          );
    }

    export default TestTable;
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComponentsCss.css";
import { Link } from "react-router-dom";
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap/";
import { useEffect, useState } from "react";
function Ccard(props) {
  return (
    <Card className="Card">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-1 text-muted">{props.date}</Card.Subtitle>
        <Card.Text>
          {props.description == null ? <br /> : props.description}
        </Card.Text>
        <Card.Link
          as={Link}
          to= {"/Course/"+props.id} state={{ courseName: props.name}}
        >
          Course
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
export default Ccard;

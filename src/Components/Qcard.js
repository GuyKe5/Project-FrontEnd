import "bootstrap/dist/css/bootstrap.min.css";
import "./ComponentsCss.css";
import { Link } from "react-router-dom";
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap/";
function Qcard(props) {

  return (
    <Card className="Card">
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-1 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link as={Link}to="/Question/1">Card Link</Card.Link>
        <Card.Link as={Link}to="/Question/2">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Qcard;

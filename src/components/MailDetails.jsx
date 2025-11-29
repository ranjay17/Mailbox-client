import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const MailDetails = () => {
  const mail = useSelector((state) => state.mail.selectedMail);
  const navigate = useNavigate();

  if (!mail) return <h3 className="mt-5 text-center">No mail selected</h3>;

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Card className="mt-3 shadow-sm">
        <Card.Header>
          <h5>{mail.subject}</h5>
        </Card.Header>

        <Card.Body>
          <p>
            <strong>From:</strong> {mail.from}
          </p>
          <hr />
          <p>{mail.body}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MailDetails;

import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();

  const handleCompose = () => {
    navigate("/compose");
  };

  const handleInbox = () => {
    navigate("/inbox");
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card
        className="p-4 shadow"
        style={{ width: "450px", textAlign: "center" }}
      >
        <h2 className="mb-4">Welcome to Your Mailbox</h2>

        <div className="d-grid gap-3">
          <Button variant="primary" size="lg" onClick={handleInbox}>
            📥 Inbox
          </Button>
          <Link to="/sent" style={{ textDecoration: "none" }}>
            <Button variant="info" size="lg" className="w-100">
              📤 Sent
            </Button>
          </Link>
          <Button variant="success" size="lg" onClick={handleCompose}>
            ✉️ Compose Mail
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Home;

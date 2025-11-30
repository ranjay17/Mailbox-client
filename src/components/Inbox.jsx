import { useNavigate } from "react-router-dom";
import { Container, ListGroup, Badge, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setInbox, setSelectedMail } from "../redux/mailSlice";
import useInbox from "../hooks/useInbox";

const Inbox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedEmail = localStorage.getItem("email")?.replace(/\./g, ",");
  const inboxURL = `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${loggedEmail}.json`;

  const mails = useInbox(inboxURL); 

  dispatch(setInbox(mails));

  const handleOpenMail = (mail) => {
    dispatch(setSelectedMail(mail));
    navigate(`/mail/${mail.id}`);
  };

  const handleDelete = async (id) => {
    const url = `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${loggedEmail}/${id}.json`;

    try {
      await fetch(url, { method: "DELETE" });
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>
        Inbox <Badge bg="primary">{mails.filter((m) => !m.read).length}</Badge>
      </h3>

      <ListGroup>
        {mails.map((mail) => (
          <ListGroup.Item key={mail.id}>
            <Row>
              <Col xs={1}>
                {!mail.read && (
                  <Badge
                    bg="primary"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </Col>

              <Col
                xs={7}
                onClick={() => handleOpenMail(mail)}
                style={{ cursor: "pointer" }}
              >
                <strong>{mail.subject}</strong>
                <div className="text-muted">{mail.body?.slice(0, 40)}...</div>
              </Col>

              <Col xs={2} className="text-muted">
                {mail.from}
              </Col>

              <Col xs={2} className="text-end">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(mail.id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;

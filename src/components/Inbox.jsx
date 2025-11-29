import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ListGroup, Badge, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setInbox, setSelectedMail } from "../redux/mailSlice";

const Inbox = () => {
  const [mails, setMails] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedEmail = localStorage.getItem("email")?.replace(/\./g, ",");
  const inboxURL = `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${loggedEmail}.json`;

  // Fetch Inbox
  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await fetch(inboxURL);
        const data = await res.json();

        if (data) {
          const arr = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setMails(arr);
          dispatch(setInbox(arr));
        }
      } catch (err) {
        console.log("Error fetching inbox:", err);
      }
    };

    fetchInbox();
  }, []);

  // 🔥 DELETE MAIL FUNCTION
  const handleDelete = async (id) => {
    const url = `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${loggedEmail}/${id}.json`;

    try {
      await fetch(url, { method: "DELETE" });

      // Remove from frontend
      const updated = mails.filter((m) => m.id !== id);
      setMails(updated);
      dispatch(setInbox(updated));
    } catch (error) {
      console.log("Error deleting mail:", error);
    }
  };

  // Open mail
  const handleOpenMail = (mail) => {
    dispatch(setSelectedMail(mail));
    navigate(`/mail/${mail.id}`);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">
        Inbox <Badge bg="primary">{mails.filter((m) => !m.read).length}</Badge>
      </h3>

      <ListGroup>
        {mails.map((mail) => (
          <ListGroup.Item
            key={mail.id}
            className="d-flex justify-content-between align-items-center"
          >
            <Row className="w-100 align-items-center">
              <Col xs={1} className="d-flex align-items-center">
                {!mail.read && (
                  <Badge
                    bg="primary"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                    }}
                  ></Badge>
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
              <Col xs={2} className="text-end text-muted">
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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ListGroup, Badge, Row, Col } from "react-bootstrap";
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

  // Open mail (mark read + navigate)
  const handleOpenMail = async (mail) => {
    const mailURL = `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${loggedEmail}/${mail.id}.json`;

    try {
      await fetch(mailURL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...mail, read: true }),
      });

      dispatch(setSelectedMail(mail)); 
      navigate(`/mail/${mail.id}`);
    } catch (error) {
      console.log("Error marking as read:", error);
    }
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
            action
            onClick={() => handleOpenMail(mail)}
            className="d-flex justify-content-between align-items-center"
          >
            <Row className="w-100">
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

              <Col xs={8}>
                <strong>{mail.subject}</strong>
                <div className="text-muted">{mail.body?.slice(0, 40)}...</div>
              </Col>

              <Col xs={3} className="text-end text-muted">
                {mail.from}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Inbox;

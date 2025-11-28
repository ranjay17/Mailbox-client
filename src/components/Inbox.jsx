import { useEffect, useState } from "react";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const navigate = useNavigate();
  const [mails, setMails] = useState([]);

  const email = localStorage.getItem("email");

  const convertMailId = (mail) => mail.replace(/\./g, ",");

  useEffect(() => {
    const fetchMails = async () => {
      const userPath = convertMailId(email);

      const res = await fetch(
        `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${userPath}.json`
      );

      const data = await res.json();

      if (data) {
        const arr = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setMails(arr);
      }
    };

    fetchMails();
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Inbox</h3>
        <Button onClick={() => navigate("/compose")}>Compose</Button>
      </div>

      <Card>
        <ListGroup variant="flush">
          {mails.length === 0 && (
            <p className="p-3 text-center">No mails found</p>
          )}

          {mails.map((mail) => (
            <ListGroup.Item
              key={mail.id}
              className="d-flex justify-content-between"
            >
              <div>
                <strong>{mail.from}</strong>
                <div>{mail.subject}</div>
              </div>
              <small>{new Date(mail.time).toLocaleString()}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Inbox;

import { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedMail } from "../redux/mailSlice";

const Sent = () => {
  const [sentMails, setSentMails] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const senderEmail = localStorage.getItem("email");
  const senderPath = senderEmail?.replace(/\./g, ",");

  const sentURL = `https://mailbox-client-eb666-default-rtdb.firebaseio.com/sent/${senderPath}.json`;

  useEffect(() => {
    const fetchSentBox = async () => {
      try {
        const response = await fetch(sentURL);
        const data = await response.json();

        if (data) {
          const arr = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setSentMails(arr);
        }
      } catch (error) {
        console.log("Error fetching sent mails:", error);
      }
    };

    fetchSentBox();
  }, [sentURL]);

  const handleOpenMail = (mail) => {
    dispatch(setSelectedMail(mail));
    navigate(`/mail/${mail.id}`);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Sent Mails</h3>

      <ListGroup>
        {sentMails.map((mail) => (
          <ListGroup.Item
            key={mail.id}
            action
            onClick={() => handleOpenMail(mail)}
            className="d-flex justify-content-between align-items-center"
          >
            <Row className="w-100">
              <Col xs={8}>
                <strong>{mail.subject}</strong>
                <div className="text-muted">{mail.body?.slice(0, 40)}...</div>
              </Col>

              <Col xs={4} className="text-end text-muted">
                To: {mail.to}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Sent;

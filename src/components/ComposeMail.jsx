import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ComposeMail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const senderEmail = localStorage.getItem("email");

  const convertMailId = (mail) => mail.replace(/\./g, ",");

  const handleSend = async () => {
    if (!to || !subject || !body) {
      alert("To, Subject and Body are required!");
      return;
    }

    const senderPath = convertMailId(senderEmail);
    const receiverPath = convertMailId(to);

    const emailData = {
      from: senderEmail,
      to,
      subject,
      body,
      time: Date.now(),
      read: false,
    };

    try {
      // Receiver inbox
      await fetch(
        `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${receiverPath}.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        }
      );

      // Sender sentbox
      await fetch(
        `https://mailbox-client-eb666-default-rtdb.firebaseio.com/sent/${senderPath}.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        }
      );

      alert("Mail sent successfully!");
      navigate("/home");

      setTo("");
      setSubject("");
      setBody("");
    } catch (error) {
      console.log(error);
      alert("Error sending mail!");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h3 className="mb-3">Compose Mail</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter receiver email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mail Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message..."
            />
          </Form.Group>

          <Button className="mt-3 w-100" onClick={handleSend}>
            Send
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ComposeMail;

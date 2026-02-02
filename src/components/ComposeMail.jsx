import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../CSS/ComposeMail.css";

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
      await fetch(
        `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${receiverPath}.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        },
      );

      await fetch(
        `https://mailbox-client-eb666-default-rtdb.firebaseio.com/sent/${senderPath}.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailData),
        },
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
    <>
    <Header />
      <div className="compose-container">
        <div className="compose-card">
          <h3 className="compose-title">Compose Mail</h3>

          <form className="compose-form">
            <div className="form-group">
              <label>To</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter receiver email"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </div>

            <div className="form-group">
              <label>Mail Body</label>
              <textarea
                rows="8"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your message..."
              />
            </div>

            <button type="button" className="send-btn" onClick={handleSend}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ComposeMail;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedMail } from "../redux/mailSlice";
import Header from "./Header";
import "../CSS/Sent.css";

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
    <div className="sent-container">
      <Header />

      <h3 className="sent-title">Sent Mails</h3>

      <div className="sent-list">
        {sentMails.map((mail) => (
          <div
            key={mail.id}
            className="sent-item"
            onClick={() => handleOpenMail(mail)}
          >
            <div className="sent-content">
              <strong>{mail.subject}</strong>
              <div className="sent-preview">{mail.body?.slice(0, 40)}...</div>
            </div>

            <div className="sent-to">To: {mail.to}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sent;

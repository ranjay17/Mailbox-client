import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setInbox, setSelectedMail } from "../redux/mailSlice";
import useInbox from "../hooks/useInbox";
import Header from "./Header";
import "../CSS/Inbox.css";

const Inbox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedEmail = localStorage.getItem("email")?.replace(/\./g, ",");
  const inboxURL = `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${loggedEmail}.json`;

  const mails = useInbox(inboxURL);

  dispatch(setInbox(mails));

  const handleOpenMail = async (mail) => {
    dispatch(setSelectedMail({ ...mail, read: true }));
    navigate(`/mail/${mail.id}`);

    if (mail.read) return;
    const readUrl = `https://mailbox-client-eb666-default-rtdb.firebaseio.com/inbox/${loggedEmail}/${mail.id}/read.json`;

    try {
      await fetch(readUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(true),
      });
    } catch (err) {
      console.log("Read update failed", err);
    }
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
    <div className="inbox-container">
      <Header />

      <h3 className="inbox-title">
        Inbox
        <span className="inbox-badge">
          {mails.filter((m) => !m.read).length}
        </span>
      </h3>

      <div className="mail-list">
        {mails.map((mail) => (
          <div className="mail-item" key={mail.id}>
            <div className="mail-status">
              {!mail.read && <span className="unread-dot"></span>}
            </div>

            <div className="mail-content" onClick={() => handleOpenMail(mail)}>
              <strong>{mail.subject}</strong>
              <div className="mail-preview">{mail.body?.slice(0, 40)}...</div>
            </div>

            <div className="mail-from">{mail.from}</div>

            <div className="mail-actions">
              <button
                className="delete-btn"
                onClick={() => handleDelete(mail.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;

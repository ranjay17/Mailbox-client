import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../CSS/MailDetails.css";

const MailDetails = () => {
  const mail = useSelector((state) => state.mail.selectedMail);
  const navigate = useNavigate();

  if (!mail) {
    return <h3 className="no-mail">No mail selected</h3>;
  }

  return (
    <div className="mail-details-container">
      <Header />

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="mail-card">
        <div className="mail-card-header">
          <h5>{mail.subject}</h5>
        </div>

        <div className="mail-card-body">
          <p>
            <strong>From:</strong> {mail.from}
          </p>
          <hr />
          <p>{mail.body}</p>
        </div>
      </div>
    </div>
  );
};

export default MailDetails;

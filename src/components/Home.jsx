import { Link } from "react-router-dom";
import Header from "./Header";
import "../CSS/Home.css";

const Home = () => {
  return (
    <>
      <Header />

      <div className="home-container">
        <div className="home-card">
          <h2 className="home-title">Welcome to Your Mailbox</h2>

          <div className="home-actions">
            <Link to="/inbox" className="home-link">
              <button className="home-btn inbox-btn">📥 Inbox</button>
            </Link>

            <Link to="/sent" className="home-link">
              <button className="home-btn sent-btn">📤 Sent</button>
            </Link>

            <Link to="/compose" className="home-link">
              <button className="home-btn compose-btn">✉️ Compose Mail</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const handleCompose = () =>{
    navigate('/compose')
  }
  return (
    <div>
      <div>
        <h1>Welcome to your mail box</h1>
      </div>
      <button onClick={handleCompose}>Compose Mail</button>
    </div>
  );
}

export default Home

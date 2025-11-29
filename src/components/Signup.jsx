import { useState } from 'react'
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate()

    const handleSignup = async(event) =>{
        event.preventDefault()
        if(!email || !password || !confirmPassword){
            alert("All fields are mandatory!");
            return
        }
        if(password != confirmPassword){
            alert("Passwords do not match!");
            return
        }
        try {
            const response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIWIv4gF6B5o-mi3BCyYap3ATb3fEsYeY",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                })
              }
            );
            const data = await response.json();
            if (!response.ok) {
              alert(data.error?.message || "Signup failed");
              console.log("Signup Failed:", data);
              return; 
            }
            alert("Signup successfull")
            navigate('/login')
            console.log("User has successfully signed up:", data);
        } catch (error) {
            console.log(error)
        }
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-3">SignUp</h3>

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Sign up
          </Button>
        </Form>

        <Link to='/login'>
          <Button variant="success" className="w-100 mt-3">
            Have an account? Login
          </Button>
        </Link>
      </Card>
    </Container>
  );
}

export default Signup


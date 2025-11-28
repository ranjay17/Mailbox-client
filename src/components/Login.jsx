import React, { useState } from 'react'
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async(event) =>{
        event.preventDefault();
        if(!email || !password){
            alert("All fields are mandatory!");
            return
        }
        try {
            const response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDIWIv4gF6B5o-mi3BCyYap3ATb3fEsYeY",
              {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                })
              }
            );
            const data = await response.json()
            if(!response.ok){
                alert(data.error.message)
                return
            }
            alert("Login Successfull")
            localStorage.setItem('token', data.idToken);
            localStorage.setItem("email", email);

            navigate('/home')
            console.log("User has successfully Loged in:", data);
        } catch (error) {
            console.log(error)
        }
        setEmail("")
        setPassword("")
    }
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Login</h3>

        <Form onSubmit={handleLogin}>
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

          <Button variant="primary" type="submit" className="w-100 mt-2">
            Login
          </Button>
        </Form>

        <Link to='/'>
          <Button variant="success" className="w-100 mt-3">
            Dont't have an account? Signup
          </Button>
        </Link>
      </Card>
    </Container>
  );
}

export default Login

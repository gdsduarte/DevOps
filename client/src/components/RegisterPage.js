import {
  registerWithEmailAndPassword
} from "../services/firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import React, { useState } from "react";

import "../App.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container-fluid" style={{ marginTop: "10%" }}>
      <div className="row">
        <div className="col col-2"></div>
        <div className="col col-8">
          <div className="row">
            <div className="col col-6">
              <Card>
                <Card.Body>
                  <Card.Title>User Registration</Card.Title>
                  <Card.Text>First time visiting? register Here</Card.Text>
                  <div>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <hr style={{ margin: "5%" }} />

                    <div className="d-grid gap-2">
                      <Button
                        variant="outline-danger"
                        type="submit"
                        onClick={() => {
                          registerWithEmailAndPassword(name, email, password);
                        }}
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-col-2"></div>
      </div>
    </div>
  );
};

export default Register;

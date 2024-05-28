import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { login } from "../apis/users.apis";
import { loginBuyer } from "../apis/buyers.apis";
import { useAuth } from "../context/AuthProvider";
import { useAuthBuyer } from "../context/AuthProviderBuyer";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState(""); // New state for user type
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { setAuth, isAuth } = useAuth();
	const { setAuthBuyer, isAuthBuyer } = useAuthBuyer();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const userData = {
                email: email.trim(),
                password: password.trim()
            };
            if(userType==="buyer")
                 {
                const response = await loginBuyer(userData);
				setAuthBuyer({...response.user ,isAuthBuyer:true});
				toast.success("Login successful!");
				navigate("/buyerhome");
				}
			else {
				const response = await login(userData);
				setAuth({...response.user ,isAuth:true});
				toast.success("Login successful!");
				navigate("/");
				}
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error("Something went wrong!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isAuth) {
        return <Navigate to={"/"} />;
    }
	if (isAuthBuyer) {
        return <Navigate to={"/buyerhome"} />;
    }

    return (
        <section className="bg-dark">
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Row className="w-50 p-4 rounded-3 bg-light">
                    <Col>
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>User Type</Form.Label>
                                <Form.Control as="select" value={userType} onChange={(e) => setUserType(e.target.value)} required>
                                    <option value="">Select user type</option>
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                {isLoading ? "Loading..." : "Login"}
                            </Button>
                        </Form>
                        <div className="mt-3">
                            <span>If you don't have an account</span>{" "}
                            <span>
                                <Link to="/register">register here.</Link>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Login;

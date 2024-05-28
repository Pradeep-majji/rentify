import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../context/AuthProvider";
import { register } from "../apis/users.apis";
import { registerBuyer } from "../apis/buyers.apis";
import { useAuthBuyer } from "../context/AuthProviderBuyer";

function Registration() {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [type, settype] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { isAuth } = useAuth();
	const {isAuthBuyer}=useAuthBuyer();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            setIsLoading(true);
            event.preventDefault();

            // Perform validations
            if (
                !firstname.trim() ||
                !lastname.trim() ||
                !email.trim() ||
                !password.trim() ||
                !phone.trim() ||
                !type.trim()
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            // Validate email format (replace with more robust validation)
            if (!email.includes("@")) {
                toast.error("Please enter a valid email address.");
                return;
            }
            if(type==="seller"){
            await register({
                email: email.trim(),
                password: password.trim(),
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                phone: phone.trim()
            });
            toast.success("Registration successful!");
            navigate("/");
            }
            else{
                await registerBuyer({
                    email: email.trim(),
                    password: password.trim(),
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    phone: phone.trim()
                });
                toast.success("Registration successful!");
                navigate("/buyerhome");
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response?.data?.message);
                return;
            }
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    if (isAuth) {
        return <Navigate to={"/"} />;
    }
	if(isAuthBuyer){
        return <Navigate to={"/buyerhome"} />;
	}
    return (
        <section style={{ backgroundColor: "#343a40", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="p-4 rounded-3 bg-light">
                            <h2 className="text-center mb-4">Registration</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={5} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>User Type</Form.Label>
                                    <Form.Control as="select" value={type} onChange={(e) => settype(e.target.value)} required>
                                        <option value="">Select user type</option>
                                        <option value="seller">Seller</option>
                                        <option value="buyer">Buyer</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    {isLoading ? "Loading..." : "Register"}
                                </Button>
                            </Form>
                            <div className="mt-3 text-center">
                                <span>If you have an account</span>{" "}
                                <span>
                                    <Link to="/login">login here.</Link>
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Registration;

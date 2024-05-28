import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const HomePageHeader = () => {
    const { logOut, email } = useAuth();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [propertyData, setPropertyData] = useState({
        name: "",
        location: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        landmarks: "",
		sellerEmail:email
    });

    const handleLogOut = () => {
        logOut();
        navigate("/login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post("https://rentify-apis.onrender.com/properties/add-property", propertyData);

            // Close the modal and navigate to the home page
            setShowModal(false);
            navigate("/");
        } catch (error) {
            console.error("Error submitting property data:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <>
            <nav className="container navbar navbar-expand-lg navbar-light">
                <Link
                    className="navbar-brand"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                        fontWeight: 700,
                    }}
                    to="/">
                    Home
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        {/* You can add other navigation links here if needed */}
                    </ul>
                </div>
                <div className="navbar-nav ml-auto">
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-success mx-2 my-2 my-sm-0">
                        Add Property
                    </button>
                </div>
                <Link to="/buyersliked" className="btn btn-success mx-2 my-2 my-sm-0">
                    Buyers Liked
                </Link>
                <button onClick={handleLogOut} className="btn btn-danger my-2 my-sm-0">
                    Log Out
                </button>
            </nav>

            {/* Modal for adding property */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPropertyName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={propertyData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPropertyLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={propertyData.location}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPropertyArea">
                            <Form.Label>Area Occupied</Form.Label>
                            <Form.Control
                                type="text"
                                name="area"
                                value={propertyData.area}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPropertyBedrooms">
                            <Form.Label>Number of Bedrooms</Form.Label>
                            <Form.Control
                                type="number"
                                name="bedrooms"
                                value={propertyData.bedrooms}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPropertyBathrooms">
                            <Form.Label>Number of Bathrooms</Form.Label>
                            <Form.Control
                                type="number"
                                name="bathrooms"
                                value={propertyData.bathrooms}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPropertyLandmarks">
                            <Form.Label>Nearby Landmarks</Form.Label>
                            <Form.Control
                                type="text"
                                name="landmarks"
                                value={propertyData.landmarks}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Property
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HomePageHeader;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Form } from "react-bootstrap";
import HomePageHeader from "../components/HomePageHeader";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const { email } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [currentProperty, setCurrentProperty] = useState({
    id: "",
    name: "",
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    landmarks: "",
    sellerEmail: email,
  });

  useEffect(() => {
    // Fetch property data from the API
    //const email="s1@gmail.com"
    console.log(email)
    axios.get(`https://rentify-apis.onrender.com/properties/seller-properties/${email}`)
      .then(response => {
        setProperties(response.data.properties); 
        console.log(properties)// Here you set properties to response.data
      })
      .catch(error => {
        console.error("Error fetching property data:", error);
      });
  }, [email]);
  

  const handleUpdate = (property) => {
    setCurrentProperty(property);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProperty({ ...currentProperty, [name]: value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitUpdate = async () => {
    try {
      await axios.put(`https://rentify-apis.onrender.com/properties/update-property/${currentProperty.id}`, currentProperty);
      setShowModal(false);
      // Refresh properties list
      const response = await axios.get(`https://rentify-apis.onrender.com/properties/seller-properties/${email}`);
      setProperties(response.data);
    } catch (error) {
      console.error("Error updating property data:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <HomePageHeader />
      <section
        style={{ minHeight: "100vh", width: "100%" }}
        className="p-5 container-fluid d-flex flex-column align-items-center text-white bg-dark min"
      >
        <div className="properties-container" style={{width:"80%"}}>
          {properties.length > 0 ? (
            properties.map(property => (
              <Card key={property.id} className="property-card" style={{ width: "100%", margin: "20px", border: "1px solid #ccc", borderRadius: "10px", transition: "box-shadow 0.3s ease" }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "20px", marginBottom: "10px" }}>{property.name}</Card.Title>
                  <Card.Text style={{ fontSize: "16px" }}>
                    Location: {property.location}<br />
                    Area Occupied: {property.area}<br />
                    No. of Bedrooms: {property.bedrooms}<br />
                    No. of Bathrooms: {property.bathrooms}<br />
                    Nearby Landmarks: {property.landmarks}<br />
                  </Card.Text>
                  <Button variant="primary" style={{ marginTop: "10px" }} onClick={() => handleUpdate(property)}>Update</Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No properties to display</p>
          )}
        </div>

        {/* Modal for updating property data */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formPropertyId">
                <Form.Label>Property ID</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={currentProperty.id}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formPropertyName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentProperty.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPropertyLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={currentProperty.location}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPropertyArea">
                <Form.Label>Area</Form.Label>
                <Form.Control
                  type="text"
                  name="area"
                  value={currentProperty.area}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPropertyBedrooms">
                <Form.Label>Number of Bedrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bedrooms"
                  value={currentProperty.bedrooms}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPropertyBathrooms">
                <Form.Label>Number of Bathrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bathrooms"
                  value={currentProperty.bathrooms}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPropertyLandmarks">
                <Form.Label>Nearby Landmarks</Form.Label>
                <Form.Control
                  type="text"
                  name="landmarks"
                  value={currentProperty.landmarks}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={handleSubmitUpdate}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';
import HomePageHeaderBuyer from '../components/HomePageHeaderBuyer';

const BuyerFilter = () => {
    const [filterData, setFilterData] = useState({
        name: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        landmarks: ''
    });
    const [properties, setProperties] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterData({ ...filterData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://rentify-apis.onrender.com/properties/filter-properties', { params: filterData });
            setProperties(response.data.properties);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    return (
        <div>
            <HomePageHeaderBuyer />
            <section
                style={{ minHeight: "100vh", width: "100%" }}
                className="p-5 container-fluid d-flex flex-column align-items-center text-white bg-dark min"
            >
                <Form onSubmit={handleSubmit} className="mb-4 w-75">
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={filterData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" name="location" value={filterData.location} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>No. of Bedrooms</Form.Label>
                        <Form.Control type="text" name="bedrooms" value={filterData.bedrooms} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>No. of Bathrooms</Form.Label>
                        <Form.Control type="text" name="bathrooms" value={filterData.bathrooms} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nearby Landmarks</Form.Label>
                        <Form.Control type="text" name="landmarks" value={filterData.landmarks} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
                <div className="properties-container d-flex flex-wrap justify-content-center">
                    {properties.map(property => (
                        <Card key={property.id} className="property-card m-2" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{property.name}</Card.Title>
                                <Card.Text>
                                    Location: {property.location}<br />
                                    Area: {property.area}<br />
                                    No. of Bedrooms: {property.bedrooms}<br />
                                    No. of Bathrooms: {property.bathrooms}<br />
                                    Nearby Landmarks: {property.landmarks}<br />
                                    Likes: {property.likes}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BuyerFilter;

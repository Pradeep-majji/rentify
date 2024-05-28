import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import HomePageHeaderBuyer from '../components/HomePageHeaderBuyer';
import { useAuthBuyer } from '../context/AuthProviderBuyer';

const BuyerHome = () => {
    const [properties, setProperties] = useState([]);
    const { email } = useAuthBuyer();

    useEffect(() => {
        // Fetch properties data from the API
        axios.get("https://rentify-apis.onrender.com/properties/all-properties")
            .then(async response => {
                const propertiesWithLikes = await Promise.all(response.data.properties.map(async property => {
                    const likes = await fetchLikes(property.id);
                    return { ...property, likes: likes };
                }));
                setProperties(propertiesWithLikes);
                console.log(properties)
            })
            .catch(error => {
                console.error("Error fetching properties:", error);
            });
    }, []);

    const fetchLikes = async (propertyId) => {
        try {
            const response = await axios.get(`https://rentify-apis.onrender.com/favourites/count-favourites/${propertyId}`);
            return response.data.count;
        } catch (error) {
            console.error("Error fetching likes for property:", error);
            return 0; // Return 0 in case of error
        }
    };

    const handleLike = async (propertyId) => {
        try {
            await axios.post(`https://rentify-apis.onrender.com/favourites/add`, { buyerEmail: email, propertyId: propertyId });
            const likes = await fetchLikes(propertyId);
            setProperties(prevProperties =>
                prevProperties.map(property =>
                    property.id === propertyId ? { ...property, likes: likes } : property
                )
            );
            alert("like accepted")
        } catch (error) {
            console.error("Error liking property:", error);
            alert("Already liked");
        }
    };

    return (
        <div>
            <HomePageHeaderBuyer />
            <section
                style={{ minHeight: "100vh", width: "100%" }}
                className="p-5 container-fluid d-flex flex-column align-items-center text-white bg-dark min"
            >
                <div className="properties-container" style={{width:"100%"}}>
                    {properties.map(property => (
                        <Card key={property.id} className="property-card" style={{ width: "100%", margin: "20px", border: "1px solid #ccc", borderRadius: "10px", transition: "box-shadow 0.3s ease" }}>
                        <Card.Body>
                          <Card.Title style={{ fontSize: "20px", marginBottom: "10px" }}>{property.name}</Card.Title>
                          <Card.Text style={{ fontSize: "16px" }}>
                                    Location: {property.location}<br />
                                    Area: {property.area}<br />
                                    No. of Bedrooms: {property.bedrooms}<br />
                                    No. of Bathrooms: {property.bathrooms}<br />
                                    Nearby Landmarks: {property.landmarks}<br />
                                    Likes: {property.likes}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleLike(property.id)}>Like</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BuyerHome;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import HomePageHeaderBuyer from '../components/HomePageHeaderBuyer';
import { useAuthBuyer } from '../context/AuthProviderBuyer';

const BuyerFavourite = () => {
    const [properties, setProperties] = useState([]);
    const { email } = useAuthBuyer();

    useEffect(() => {
        // Fetch favourite property IDs for the buyer
        axios.get(`https://rentify-apis.onrender.com/favourites/buyer-favourites/${email}`)
            .then(response => {
                const propertyIds = response.data.favourites;
                setProperties(propertyIds);
               /* console.log(propertyIds)
                // Fetch details of each property including seller details
                const propertyDetailsPromises = propertyIds.map(id => 
                    axios.get(`https://rentify-apis.onrender.com/properties/property-seller/${id}`)
                );

                // Wait for all promises to resolve
                Promise.all(propertyDetailsPromises)
                    .then(results => {
                        const propertiesWithSellers = results.map(res => res.data.seller);
                        setProperties(propertiesWithSellers);
                    })
                    .catch(error => {
                        console.error('Error fetching property data:', error);
                    });
            })*/
          }).catch(error => {
                console.error('Error fetching favourite property IDs:', error);
            });
    }, [email]);

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
                                    <strong>Seller Details:</strong><br />
                                    Email: {property.sellerEmail}<br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BuyerFavourite;

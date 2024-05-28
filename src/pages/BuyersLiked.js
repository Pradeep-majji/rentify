import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import HomePageHeader from '../components/HomePageHeader';
import { useAuth } from '../context/AuthProvider';

const BuyersLiked = () => {
  const [buyersLiked, setBuyersLiked] = useState([]);
  const {email} =useAuth();

  useEffect(() => {
    // Fetch data from Axios and update state
    axios.get(`https://rentify-apis.onrender.com/favourites/favourite-properties/${email}`)
      .then(response => {
        setBuyersLiked(response.data.buyers);
        console.log(buyersLiked)
      })
      .catch(error => {
        console.error('Error fetching buyers liked data:', error);
      });
  }, []);

  return (
    <div>
      <HomePageHeader />
      <section
        style={{ minHeight: "100vh", width: "100%" }}
        className="p-5 container-fluid d-flex flex-column align-items-center text-white bg-dark min"
      >
    <div className="buyers-liked-container">
      <h2>Buyers Who Liked Your Properties</h2>
      <div className="buyers-liked-grid">
        {buyersLiked.map(buyer => (
          <Card key={buyer.propertyId} className="buyer-liked-card">
            <Card.Body>
              <Card.Title>{buyer.firstname} {buyer.lastname}</Card.Title>
              <Card.Text>
                Email: {buyer.email}<br />
                Phone: {buyer.phone}<br />
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
    </section>
    </div>
  );
};

export default BuyersLiked;

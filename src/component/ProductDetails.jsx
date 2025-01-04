import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../style.css';

function ProductDetails({cartItems, setCartItems}) {
    const { productId } = useParams(); 
    const [product, setProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
  
    // Product discription
    const getProductDetails = async () => {
      const url = `https://dummyjson.com/products/${productId}`;
      try {
        const response = await axios.get(url);
        setProduct(response.data); 
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      }
    };
  
    useEffect(() => {
      getProductDetails();
    }, [productId]); 
    
    // cart
    const handleAddToCart = (products) => {
        setCartItems([...cartItems, products]); 
  
        setSuccessMessage(`${products.title} successfully added to cart!`);
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 500);
      };

    if (!product) return <p>Loading product details...</p>;
    return (
      <div>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <div className='product-details d-flex'>
            <div className='d-flex flex-column '>
                <div className='m-2' style={{border: '1px solid #e4e2e2', borderRadius: '20px'}}><img src={product.thumbnail} alt={product.title} style={{ height: '300px', objectFit: 'contain' }} /></div>
                <div className='d-flex justify-content-between p-3'>
                    <button className='btn btn-success'>BUY NOW</button>
                    <button className='btn btn-warning' onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                </div>
            </div>
            <div className='cardDetails'>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p><strong>Price: ${product.price}</strong></p>
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
                <p>Rating: {product.reviews[0].rating}</p>
            </div>
        </div>
        <div className='m-3'><h3>REVIEWS:</h3></div>
        <div className='d-flex flex-column m-3 reviews'>
            {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                <div key={index} className="review-card">
                    <p><strong>{review.reviewerName}</strong> </p>
                    <p><strong>({review.reviewerEmail})</strong></p>
                    <p>Rating: {review.rating}/5</p>
                    <p>Comment: {review.comment}</p>
                    <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                    <hr />
                </div>
                ))
            ) : (
                <p>No reviews available for this product.</p>
            )}
        </div>
      </div>
    );
}

export default ProductDetails

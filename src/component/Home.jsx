import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../style.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';


function Home({ cartItems, setCartItems, productData, setProductData, filteredProducts }) {
  const navigate = useNavigate();
  
  const [successMessage, setSuccessMessage] = useState('');
  const [quentity, setQuentity] = useState(0);
  const { productId } = useParams();

  const quentityIncrease = () => {
    if(quentity >= 0){
      setQuentity(prevQuentity => prevQuentity + 1)
    }
  }
  const quentityDecrese = () => {
    if(quentity > 0){
      setQuentity(quentity - 1)
    }
  }
  console.log(quentity)

    // API Data calling
    const getData = async() =>{
      const url =`https://dummyjson.com/products`;
      try{
        const response = await axios.get(url);
        const json = response.data;
        console.log(json)
  
        if(json.products){
          setProductData(json.products)
        }
      }catch(error){
        console.error(error.massage);
      }
    }
  
    useEffect(()=>{
      getData()
    },[])
    

    const handleAddToCart = (product) => {
      const existingProduct = cartItems.find(item => item.id === product.id);
      
      if (existingProduct) {
        setSuccessMessage(`${product.title} is already in your cart!`);
      } else {
        setCartItems([...cartItems, product]); 
        setSuccessMessage(`${product.title} successfully added to cart!`);
      }
      
      setTimeout(() => {
        setSuccessMessage('');
      },50000);
    };

    const handleProductDetails = (productId) => {
      navigate(`/products/${productId}`)
    }

  return (
    <div>
      {/* <h1>Product List</h1> */}
      {successMessage && <div className=" alert alert-success cart-alert">{successMessage}</div>}
      <div className='container d-grid'>
        <div className='row p-container'>
        {(filteredProducts.length > 0 ? filteredProducts : productData).map(product => (
            <div key={product.id} className="product-card my-3 product d-grid">
              <img
                src={product.thumbnail}
                alt={product.title}
                onClick={() => handleProductDetails(product.id)}
                className="product-image card-img-top"
                style={{ height: '200px', objectFit: 'contain', cursor:"pointer" }}
              />
              <div style={{padding: '10px', background: '#e9e6e6'}}>
                <div className='border-top'>
                  <h2 className='card-title' style={{fontSize: "1.5rem" }} >{product.title}</h2>
                  <p><strong>Price: ${product.price}</strong></p>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center' style={{gap: "5px"}}>
                  {/* <div><button onClick={quentityDecrese}>-</button>{quentity}<button onClick={quentityIncrease}>+</button></div> */}
                  <button className='btn btn-warning' onClick={() => handleAddToCart(product)}>Add to cart</button>
                </div>
                <button className='btn btn-success'>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home


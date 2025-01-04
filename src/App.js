import { Route, Link, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Navbaar from './component/Navbaar';
import Cart from './component/Cart';
import { useState, useEffect } from 'react';
import ProductDetails from './component/ProductDetails';

function App() {
  const [cartItems, setCartItems] =useState([])
  const [productData, setProductData] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);

      // save cart item in local storage
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <Navbaar productData={productData} setFilteredProducts={setFilteredProducts} />
      <Routes>
        <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} productData={productData} setProductData={setProductData} filteredProducts={filteredProducts} />}/>
        <Route path="/Cart" element= {<Cart cartItems={cartItems} setCartItems={setCartItems}  />} />
        <Route path="/products/:productId" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;

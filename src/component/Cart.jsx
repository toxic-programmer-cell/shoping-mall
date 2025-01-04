import React from 'react'

const Cart = ({ cartItems, setCartItems }) => {
  const handleRemoveCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId); // Filter out the product
    setCartItems(updatedCart);
  }

  return (
    <div>
      <div className='cart'>
        { cartItems.length === 0? (
          <p>No Items in cart</p>
        ) : (
          <ul style={{listStyle: 'none'}}>
            {cartItems.map((item, index) => (
              <li key={index}>
                <img src={item.thumbnail} alt={item.title} style={{ height: '50px' }} />
                <p>{item.title}</p>
                <p>${item.price}</p>
                <button onClick={() => handleRemoveCart(item.id)} >Remove</button>
              </li>
            ))}
          </ul>
        ) }
      </div>
    </div>
  )
}

export default Cart

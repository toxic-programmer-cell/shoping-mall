import React, { useState } from 'react'
import Modal from './Modal';
import '../style.css';
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { RxModulzLogo } from "react-icons/rx";

function Navbaar( { productData, setFilteredProducts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    const value =e.target.value
    setSearch(value)

    const filtered = productData.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered)
  }
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark position-sticky align-items-center" style={{padding: '10px 20px'}}>
        <div>
          <Link to="/">
            <div className='text-light' style={{fontSize: '3rem'}}>
              <RxModulzLogo />
            </div>
          </Link>
        </div>
        <div><input type="text"value={search} onChange={handleSearch} placeholder='Search product...' className="form-control mb-4" /></div>
        <div className='d-flex'>
          <div className='text-light p-2' style={{cursor: "pointer"}}>
          <button className='log-in' onClick={() => setIsOpen(true)}>
            Log-in
          </button>
          {isOpen && <Modal setIsOpen={setIsOpen} />}
          </div>
          <Link to="/Cart" ><div className='text-light p-2'><FaCartShopping /></div></Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbaar

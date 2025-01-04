import React, { useEffect, useState } from 'react'
import { RiCloseLine } from "react-icons/ri";
import '../style.css';
import SingUp from './SingUp';
import LogIn from './LogIn';

const Modal = ({ setIsOpen }) => {
  
  const [showSignUp, setShowSignUp] = useState(true);
  const [logIn, setLogIn] = useState(false)

  const handleClose = () => {
    setIsOpen(false);
    setShowSignUp(false);
    setLogIn(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowSignUp(false)
    setLogIn(false);
  }

  const handleSignUpClick = () => {
    setShowSignUp(true); 
    setLogIn(false);
  };

  const handleLogInClick = () => {
    console.log("login")
    setShowSignUp(false);
    setLogIn(true); 
  };

  // stop scrool when modal open
  useEffect(() => {
      if (setIsOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }

      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [setIsOpen]);

    if (!setIsOpen) return null;
    // End
  return (
    <>
      <div onClick={handleClose} style={{position:"fixed", right: 0, left: 0, top:0, bottom: 0, background:"#c0bdbdd4"}} />
      <div>
        <div className='m-1 profile-container'>
          <button className='crossBtn' onClick={handleClose}>
            <RiCloseLine />
          </button>
          {showSignUp ? (
            <>
              <SingUp handleClose={handleClose} handleLogInClick={handleLogInClick} />
            </>
          ) : (
            <>
              <LogIn handleOpen={handleOpen} handleLogInClick={handleLogInClick} handleClose={handleClose} />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Modal

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function LogIn({ handleLogInClick, handleClose }) {
  const [input, setInput] = useState({ email: '', password: '' }); 
  const navigate = useNavigate(); 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const users = JSON.parse(localStorage.getItem("signUpData")) || [];
    console.log(users)

    const user = users.find((e) => e?.email === input?.email && e?.password === input?.password);

    console.log(user,"user-----------")
    
    if (user) {
      const index =  users.findIndex(e=>e?.email === input?.email);
      localStorage.setItem("userData", JSON.stringify(users[index]));

      handleLogInClick(users); 
      handleClose(true)
    } else {
      setInput({ email: "", password: "" });
      alert("Incorrect Email or Password");
    }
  };

  return (
    <div>
      <div className='d-flex aling-item-center justify-content-center ' style={{gap:"1rem"}}>
        <div className='border p-2 d-flex flex-column' style={{gap:"1rem"}}>
          <form onSubmit={handleSubmit} className='d-flex justify-content-center flex-column p-3 form-style' style={{gap:"1rem"}}>
            <div className='text-center'><h2>Log-In</h2></div>
            <div className="input-div">
              <div>Email</div>
              <input type="text" name="email" id="" value={input.email} onChange={handleChange} />
              <div>Password</div>
              <input type="password" name="password" id="" value={input.password} onChange={handleChange} />
            </div>
            <button className="submit" type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn

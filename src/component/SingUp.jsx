import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validationRegx } from "../Validation";
import '../style.css';

function SingUp({ handleClose, handleLogInClick }) {
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
    })

    // SIgnUp
    useEffect(() =>{
        const savedFormData = localStorage.getItem("signUpData");
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    },[]);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value})
    }
    
    const handleSubmit = (e) => {
    
        let validationError = {};
        // Email validation
        const existingData = getStoredData("signUpData");
        const emailExists = existingData.some((user) => user.email === formData.email);

        if(!validationRegx.username.test(formData.username)){
          validationError.username = "username is not valid";
        }
    
        if(!validationRegx.email.test(formData.email)){
          validationError.email = "Email is not valid";
        }
        else if(emailExists){
          validationError.email = "Email Alrady Exist"
        }
    
        if(!validationRegx.password.test(formData.password)){
          validationError.password = "Password must be at least 8 char";
        }
    
        if(formData.confirmpassword !== formData.password){
          validationError.confirmpassword = "password not matched"
        }
    
        setErrors(validationError)
        return Object.keys(validationError).length === 0;
    }
    
    const getStoredData = (key) => {
        try {
          const storedData = JSON.parse(localStorage.getItem(key));
          if (Array.isArray(storedData)) {
            return storedData;
          }
          return [];
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
          return [];
        }
    };
    
    const handleFromSubmit = (e) => {
        e.preventDefault()
    
        if(handleSubmit()){
          const existingData = getStoredData("signUpData");
          const updatedData = [...existingData, formData];
          localStorage.setItem("signUpData", JSON.stringify(updatedData));
          setFormData({
            username: "",
            email: "",
            password: "",
            confirmpassword: ""
          });
          // localStorage.setItem("signUpData", JSON.stringify(formData))
          handleSubmit(formData)
    

          console.log(formData)
          alert("Succesfully singup")
        }
    }

    return (
        <div>
            <div className='d-flex justify-content-center align-items-center mt-2'>
                <form className='d-flex justify-content-center flex-column p-3 form-style' onSubmit={handleFromSubmit}>
                    <div className='text-center'>
                        <h2>Sing-up</h2>
                    </div>
                    <div className="input-div">
                        <h5>username</h5>
                        <input className='w-100' type="text" name='username' autoComplete='off' placeholder='enter username' value={formData.username} onChange={handleChange} required/>
                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                    </div>
                    <div className="input-div">
                        <h5>Email</h5>
                        <input className='w-100' type="email" name="email" placeholder='email' value={formData.email} onChange={handleChange} required/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className="input-div">
                        <h5>password</h5>
                        <input className='w-100' type="password" name="password" placeholder='******' value={formData.password} onChange={handleChange} required/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className="input-div">
                        <h5>confirm password</h5>
                        <input className='w-100' type="password" name="confirmpassword" placeholder='******' value={formData.confirmpassword} onChange={handleChange} required/>
                        {errors.confirmpassword && <span className='text-danger'>{errors.confirmpassword}</span>}
                    </div>
                    <div className="d-flex " style={{gap: "1rem"}}>
                        <button className="cancle" onClick={handleClose} >cancel</button>
                        <button className="submit"  type="submit" >Submit</button>
                    </div>
                    <p>Alrady have account ? <span style={{color: "blue"}} onClick={handleLogInClick}>Log-in</span></p>
                </form>
            </div>
        </div>
    )
}

export default SingUp

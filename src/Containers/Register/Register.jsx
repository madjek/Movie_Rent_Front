import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Register = () => {

    const history = useNavigate();

    //Hooks
    const [msgError, setmsgError] = useState("");
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        address: '',
        cp: 0,
        dni: ''
    });

    //NEW USER REGISTER
    const sendDataRegister = async (props) => {

        let body = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user?.phone,
            password: user?.password,
            city: user?.city,
            address: user?.address,
            cp: user?.cp,
            dni: user?.dni
        };

        //INPUT VALIDATION
        if (! /^([a-zA-Z]{3,30})$/.test(user.name) ) {
            setmsgError("Name should be at least 3 characters long and contain only letters");
            setTimeout(()=>{
                setmsgError("");
            },2000);
            return;
        } else if (! /^([a-zA-Z]{3,30})$/.test(user.surname) ) {
           setmsgError("Surname should be at least 3 characters long and contain only letters");
           setTimeout(()=>{
            setmsgError("");
        },2000);
           return;
        } else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email) ) {
           setmsgError("Wrong email");
           setTimeout(()=>{
            setmsgError("");
        },2000);
           return;
        } else if (user.password.length < 8) {
            setmsgError("Password should be at least 8 characters long");
            setTimeout(()=>{
                setmsgError("");
            },2000);
            return;
        } else if (! /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/.test(user.phone) ) {
            setmsgError("Wrong phone");
            setTimeout(()=>{
                setmsgError("");
            },2000);
            return;
        };

        try {
            let res = await axios.post("https://dvd-rent.herokuapp.com/auth/register", body);
            setmsgError(`Welcome ${res.data.name}`);

            setTimeout(()=>{
                history("/");
            },2000);

        //CATCH ERRORS FROM BACKEND
        } catch (error) {
            console.log(error?.response?.data?.message?.keyPattern)
            // if (error?.response?.data?.message?.keyPattern?.email = 1) {
            //     setmsgError("This email already registered");
            //     setTimeout(()=>{
            //         setmsgError("");
            //     },2000);
            //     return;
            // }
            // if (error?.response?.data?.message?.keyPattern?.phone = 1) {
            //     setmsgError("This phone already registered");
            //     setTimeout(()=>{
            //         setmsgError("");
            //     },2000);
            //     return;
            // }
            console.log(error)
        };
    };

    //HANDLER
    const userHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    //REGISTER FORM
    return (
        <div className="designRegister back b_col">
            <input type='text' name='name' title='name' onChange={userHandler} placeholder='Name' minLength='3' lenght='30' required/>
            <input type='text' name='surname' title='surname' onChange={userHandler} placeholder='Surname' minLength='3' lenght='30' required/>
            <input className="lower" type='email' name='email' title='email' onChange={userHandler} placeholder='Email' lenght='30' required/>
            <input type='password' name='password' title='password' onChange={userHandler} placeholder='Password' minLength='8' lenght='30' required/>
            <input type='phone' name='phone' title='phone' onChange={userHandler} placeholder='Phone' lenght='20' required/>
            <input type='text' name='city' title='city' onChange={userHandler} placeholder='City' lenght='30' />
            <input type='text' name='address' title='address' onChange={userHandler} placeholder='Address' lenght='30' />
            <input type='number' name='cp' title='cp' onChange={userHandler} placeholder='Post code' lenght='5' />
            <input type='text' name='dni' title='dni' onChange={userHandler} placeholder='DNI' lenght='10' />
            <div className="btn b_row" onClick={() => sendDataRegister()}>Register</div>
            <div className="error">{msgError}</div>
        </div>
    );
};

export default connect()(Register);
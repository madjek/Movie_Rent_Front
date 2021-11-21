import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';


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
        // password2: '',
        city: '',
        address: '',
        cp: 0,
        dni: ''
    });

    //Funcriones

    const sendDataRegister = async (props) => {
        //Comprobación de errores en los datos

        //body generation
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
        }

        try {
            let res = await axios.post("https://dvd-rent.herokuapp.com/auth/register", body);
            setmsgError(`Welcome ${res.data.name}`);

            // let login = {
            //     email: res.data.email,
            //     password: res.data.password
            // };
    
            // try {
            // let log = await axios.post("https://dvd-rent.herokuapp.com/auth/sign_in", login);
            //     // setmsgError(`Welcome back ${res.data.user.name}`);
    
            //     let data = log.data;
                
            //     props.dispatch({type:LOGIN,payload:data});
    
            //     setTimeout(() => {
            //         history("/profile");
            //     }, 2000);
            // } catch (error) {
            //     setmsgError("Wrong email or password");
            // }


            setTimeout(()=>{
                history("/");
            },2000);

        } catch (error) {
            console.log(error?.response?.data?.message?.keyPattern)
            // if (error.response.data.message.keyPattern.email = 1) {
            //     setmsgError("This email already registered");
            //     setTimeout(()=>{
            //         setmsgError("");
            //     },2000);
            //     return;
            // }
            // if (error.response.data.message.keyPattern.phone = 1) {
            //     setmsgError("This phone already registered");
            //     setTimeout(()=>{
            //         setmsgError("");
            //     },2000);
            //     return;
            // }
            console.log(error)
        };
    };

    //Handler o manejador

    const userHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

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


//         <div className="back c_col">
// 	    	<form className="registration">
// 	    		<h1>Registration Form</h1>

// 	    		<label for="usename">
//                     <input type='text' name='name' title='name' onChange={userHandler} placeholder='Name' minlength="3" lenght='20' required/>
//                     <input type='text' name='surname' title='surname' onChange={userHandler} placeholder='Surname' minlength="3" lenght='20' required/>
// 	    			{/* <ul className="input-requirements">
// 	    				<li>At least 3 characters long</li>
// 	    				<li>Must only contain letters (no special characters)</li>
// 	    			</ul> */}
// 	    		</label>

// 	    		<label for="email">
//                     <input type='email' name='email' title='email' onChange={userHandler} placeholder='Email' lenght='60' required/>
// 	    		</label>

// 	    		{/* <label for="phone">
//                     <input type='phone' name='phone' title='phone' onChange={userHandler} placeholder='Phone' lenght='30' required/>
// 	    		</label> */}

// 	    		<label for="password">
//                     <input type='password' name='password' title='password' onChange={userHandler} placeholder='Password' minlength="8" length="30" required/>
// {/* 
// 	    			<ul className="input-requirements">
// 	    				<li>At least 8 characters long</li>
// 	    				<li>Contains at least 1 number</li>
// 	    				<li>Contains at least 1 lowercase letter</li>
// 	    				<li>Contains at least 1 uppercase letter</li>
// 	    				<li>Contains a special character (e.g. @ !)</li>
// 	    			</ul> */}
// 	    		</label>

// 	    		{/* <label for="city">
//                     <input type='text' name='city' title='city' onChange={userHandler} placeholder='City' lenght='30' required/>
// 	    		</label>
// 	    		<label for="address">
//                     <input type='text' name='address' title='address' onChange={userHandler} placeholder='Address' lenght='60' />	    	</label>
// 	    		<label for="cp">
//                     <input type='number' name='cp' title='cp' onChange={userHandler} placeholder='Post code' lenght='5' required/>	    	</label>
// 	    		<label for="dni">
//                     <input type='text' name='dni' title='dni' onChange={userHandler} placeholder='DNI' lenght='10' />	    		
//                 </label> */}

// 	    		<div className="btn b_row" onClick={() => sendDataRegister()}>Register</div>	

// 	    	</form>
// 	    </div>

    )
};

export default connect()(Register);
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

const Login = (props) => {

    const history = useNavigate();

    //Hooks
    const [msgError, setmsgError] = useState("");
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    //Handler
    const checkInputs = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const login = async () => {

        let body = {
            email: credentials.email,
            password: credentials.password
        };

        try {
            let res = await axios.post("https://dvd-rent.herokuapp.com/auth/sign_in", body);
            setmsgError(`Welcome back ${res.data.user.name}`);

            let data = res.data;
            
            props.dispatch({type:LOGIN,payload:data});

            setTimeout(() => {
                history("/profile");
            }, 2000);

        } catch (error) {
            setmsgError("Wrong email or password");
        };
    };

    return (
        <div className="designLogin back b_col">
            <input type='email' name='email' title='email' onChange={checkInputs} placeholder='Email' lenght='30' />
            <input type='password' name='password' title='password' onChange={checkInputs} placeholder='Password' lenght='30' />
            <div className="btn b_row" onClick={() => login()}>Login</div>
            <div className="error">{msgError}</div>
        </div>
    );
};

export default connect()(Login);
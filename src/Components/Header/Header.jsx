import React from 'react';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import logo from '../../assets/img/logo.svg';
import Button from '../Button/Button';

const Header = (props) => {

    //LOGOUT
    const logOut = () => {        
        props.dispatch({type:LOGOUT});
        window.location.href = '/';
    };

    if (props.credentials?.token === '') {
        return(
            <div className="designHeader b_row">
                <div className="logo b_row">
                    <img className="logoImg" alt="logo" src={logo}/>
                </div>
                <div className="nav b_row">
                    <Button destination="Home" url=""/>
                    <Button destination="Login" url="/login"/>
                    <Button destination="Register" url="/register"/>
                </div>
            </div>
        );
    } else {
        return(
            <div className="designHeader b_row">
            <div className="logo b_row">
                <img className="logoImg" alt="logo" src={logo}/>
            </div>
            <div className="nav b_row">
                <Button destination="Home" url=""/>
                <Button destination="Profile" url="/profile"/>
                <div className="logoutButton btn b_row" onClick={() => logOut()}>Logout</div>
            </div>
        </div>
        );
    };
};

export default connect((state)=>({credentials: state.credentials}))(Header);
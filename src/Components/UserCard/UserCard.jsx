import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { LOGOUT, UPDATE_USER } from '../../redux/types';

import userImg from '../../assets/img/user.svg';

const UserCard = (props) => {

    const [toggle, setToggle] = useState(true);
    const toggleChecked = () => setToggle(toggle => !toggle);
    const [userData, setUserData] = useState(props.credentials.user);

    useEffect(() => {
        
        setUserData(props.credentials.user);

    }, [props.credentials]);

    const goUpdate = async () => {     

        const key = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        const userId = props.credentials.user._id;


            try {
                let res = await axios.put(`https://dvd-rent.herokuapp.com/users/${userId}`, userData, key);
                if(res){                  
                    props.dispatch({type: UPDATE_USER, payload:userData});
                }
            } catch (error) {
                console.log(error)
            }

            window.location.href = '/profile';
    }

    const User = () => {

        const name = props.credentials.user.name;
        const surname = props.credentials.user.surname;
        const email = props.credentials.user.email;
        const phone = props.credentials.user.phone;
        const city = props.credentials.user.city;
        const address = props.credentials.user.address;
        const cp = props.credentials.user.cp;
        const dni = props.credentials.user.dni;

        const data = (d) => {
            const style = {};
            if (d === "" || d === 0) {
                style.display = 'none'
            }
            return(style)
        }

        const style = {};
        if (phone || city || address || cp || dni === "") {
            style.display = 'none'
        }

        return (
            <div className="b_col">
                <div><img className="userImg" alt="user" src={userImg}/></div>
                    <table className="userInfo">
                        <tr>
                            <td className="tabName"><b>Full Name:</b></td>{name} {surname}<td></td>
                        </tr>
                        <tr>
                            <td><b>Email:</b></td><td className="overfl">{email}</td>
                        </tr>
                        <tr style={data(phone)}>
                            <td><b>Phone:</b></td><td>{phone}</td>
                        </tr>
                        <tr style={data(city)}>
                            <td><b>City:</b></td><td>{city}</td>
                        </tr>
                        <tr style={data(address)}>
                            <td><b>Address:</b></td><td>{address}</td>
                        </tr>
                        <tr style={data(cp)}>
                            <td><b>Post Code:</b></td><td>{cp}</td>
                        </tr>
                        <tr style={data(dni)}>
                            <td><b>DNI:</b></td><td>{dni}</td>
                        </tr>
                    </table>
                    <div className="logoutButton btn b_row" onClick={() => toggleChecked()}>Update</div>

            </div>
        )
    }

    const Update = () => {
        const checkInputs = (e) => {
            //Función encargada de bindear el hook con los inputs.
            setUserData({ ...userData, [e.target.name]: e.target.value });
        } 
        return(
            <div className="b_col">
                <table>
                    <tr>
                        <td><b>Name:</b></td><input value={userData?.name} name="name" onChange={checkInputs} /><td></td>
                    </tr>
                    <tr>
                        <td><b>Surname:</b></td><input value={userData?.surname} name="surname" onChange={checkInputs} /><td></td>
                    </tr>
                    <tr>
                        <td><b>Email:</b></td><td><input value={userData?.email} name="email" onChange={checkInputs} /></td>
                    </tr>
                    <tr>
                        <td><b>Phone:</b></td><td><input value={userData?.phone} name="phone" onChange={checkInputs} /></td>
                    </tr>
                    <tr>
                        <td><b>City:</b></td><td><input value={userData?.city} name="city" onChange={checkInputs} /></td>
                    </tr>
                    <tr>
                        <td><b>Address:</b></td><td><input value={userData?.address} name="address" onChange={checkInputs} /></td>
                    </tr>
                    <tr>
                        <td><b>Post Code:</b></td><td><input value={userData?.cp || ""} name="cp" onChange={checkInputs} /></td>
                    </tr>
                    <tr>
                        <td><b>DNI:</b></td><td><input value={userData?.dni} name="dni" onChange={checkInputs} /></td>
                    </tr>
                </table>
                <div className="logoutButton btn b_row" onClick={() => goUpdate()}>Update</div>
            </div>
        )
    }

    return (
       <div className="userCard b_col">
            {toggle &&  User() }
            {!toggle && Update() }
       </div>
    );
}

export default connect((state)=>({
    credentials: state.credentials
}))(UserCard)

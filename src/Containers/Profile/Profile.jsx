import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import UserCard from '../../Components/UserCard/UserCard';

const Profile = (props) => {

    const [msgError, setmsgError] = useState("");
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    const key = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    const userId = props.credentials.user._id;
    const role = props.credentials.user.role;

    useEffect(()=>{
        setTimeout(()=>{        
            ShowOrders();
            ShowUsers();
        },100);
    },[]);

    const DaysCount = (expiry_date, orderId)=>{
        let daysLeft = moment(expiry_date).format('DD') - moment(Date()).format('DD');

        if (daysLeft >= 2) {
            return(
                <div>{daysLeft} days left until autoreturn</div>
            ) 
        } else if (daysLeft === 1) {
            return(
                <div>{daysLeft} day left until autoreturn</div>
            )
        } else if (daysLeft === 0) {
            return(
                <div>Last day until autoreturn</div>
            )
        } else {
            axios.delete(`https://dvd-rent.herokuapp.com/orders/${orderId}`, key);
        };
    };

    const ShowOrders = async ()=>{
        if (role === "admin") {
            let res = await axios.get(`https://dvd-rent.herokuapp.com/orders`, key);      
            setOrders(res.data);             
        } else {
            let res = await axios.get(`https://dvd-rent.herokuapp.com/orders/user/${userId}`, key);
            setOrders(res.data);
        };
    };

    const DeleteOrder = async (orderId)=>{
        let con = window.confirm("Are you sure to return the movie");
        if (con === true) {
            let res = await axios.get(`https://dvd-rent.herokuapp.com/orders/${orderId}`, key);
            await axios.delete(`https://dvd-rent.herokuapp.com/orders/${orderId}`, key);
            await axios.put(`https://dvd-rent.herokuapp.com/movies/${res.data.movie_id}`,{"available": true}, key);
            setmsgError(`Order deleted`);
        };
        ShowOrders();
    };

    const ShowUsers = async ()=>{
        if (role === "admin") {
            let res = await axios.get(`https://dvd-rent.herokuapp.com/users`, key);      
            setUsers(res.data);             
        } else {
            let res = await axios.get(`https://dvd-rent.herokuapp.com/orders/user/${userId}`, key);
            setUsers(res.data);
        };
    };

    if (props.credentials?.token !== '' && role !== "admin") {
        return (
            <div className="designProfile b_row back">
                <div>
                    <div className="b_row"><h3>My Orders</h3></div>
                    <div className="orders b_row">{orders.map((order) => (
                        <div className="order b_col" key={order._id}>
                            <div className="b_row order poster">
                                <img alt={order.movie_id} className="orderImg" src={`${order.poster_path}`} />
                                <div className="delBtn btn b_row" onClick={() => DeleteOrder(order._id)}>Return the movie</div>
                                <div className="daysLeft b_row">{DaysCount(order.expiry_date, order._id)}</div>
                            </div>
                            <div><b>{order.title}</b></div>
                            <div><b>Odrer date: </b>{moment(order.order_date).format('MMMM DD YYYY')}</div>
                            <div><b>Expiry date: </b>{moment(order.expiry_date).format('MMMM DD YYYY')}</div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="userProfile b_col">
                    {<UserCard/>}
                </div>
            </div>
        );

    } else {
        return (
            <div className="designProfile back b_col">
                <div className="searchBar b_row">
                <input className="b_row" placeholder="Search..." onChange={e => setQuery(e.target.value)} />
                </div>
                <div className=" b_col back">
                    <div className="b_row"><h3>Users Orders</h3></div>
                    <div className="admOrders b_row">
                    {
                        orders.filter(user => {
                            if (query === '') {
                                return user;
                            } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            } else if (user.surname.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            } else if (user.email.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            } else if (user.phone.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            }
                        }).map((order) => (
                            <div className="orderList b_col" key={order._id}>
                                <table>
                                <tr>
                                    <td><b>Title:</b></td><td>{order.title}</td>
                                </tr>
                                <tr>
                                    <td><b>Full Name: </b></td>{order.name} {order.surname}<td></td>
                                </tr>
                                <tr>
                                    <td><b>Odrer date:</b></td><td>{moment(order.order_date).format('MMMM DD    YYYY')}</td>
                                </tr>
                                <tr>
                                    <td><b>Expiry date:</b></td><td>{moment(order.expiry_date).format('MMMM DD  YYYY')}</td>
                                </tr>
                                </table>
                                <div className="aDelBtn btn b_row" onClick={() => DeleteOrder(order._id)}>Return the movie</div>
                            </div>
                        ))
                    };
                    </div>
                </div>
                <div className="b_col back">
                    <div className="b_row"><h3>Users List</h3></div>
                    <div className="admOrders b_row">
                    {
                        users.filter(user => {
                            if (query === '') {
                                return user;
                            } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            } else if (user.surname.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            } else if (user.email.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            } else if (user.phone.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            }
                        }).map((user) => (
                            <div className="orderList b_col" key={user._id}>
                                <table>
                                <tr>
                                    <td><b>Full Name: </b></td>{user.name} {user.surname}<td></td>
                                </tr>
                                <tr>
                                    <td><b>Email:</b></td><td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td><b>Phone:</b></td><td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <td><b>City:</b></td><td>{user.city}</td>
                                </tr>
                                <tr>
                                    <td><b>Address:</b></td><td>{user.address}</td>
                                </tr>
                                <tr>
                                    <td><b>Post Code:</b></td><td>{user.cp}</td>
                                </tr>
                                <tr>
                                    <td><b>DNI:</b></td><td>{user.dni}</td>
                                </tr>
                                </table>
                            </div>
                        ))
                    };
                    </div>
                </div>
            </div>   
        );
    };
};

export default connect((state)=>({credentials: state.credentials}))(Profile);
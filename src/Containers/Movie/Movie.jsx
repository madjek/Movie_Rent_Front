import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

const Movie = (props) => {

    const history = useNavigate();

    const [movie, setMovie] = useState(JSON.parse(localStorage.getItem("chosenMovie")));
    const [msgError, setmsgError] = useState("");

    const key = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    const Order = async () => {

        let body = {
            user_id: props.credentials.user._id,
            name: props.credentials.user.name,
            surname: props.credentials.user.surname,
            phone: props.credentials.user.phone,
            email: props.credentials.user.email,
            movie_id: movie._id,
            title: movie.title,
            poster_path: movie.poster_path,
            available: movie.available
        };

        if (props.credentials?.token === '') {
            setmsgError("You should register or login to rent a movie");
        };

        let res = await axios.get(`https://dvd-rent.herokuapp.com/orders/user/${props.credentials.user._id}`, key);

        if (res.data.length<3) {
            if (movie.available === true) {
                try {
                    await axios.post("https://dvd-rent.herokuapp.com/orders", body, key); 
                    // await axios.put(`https://dvd-rent.herokuapp.com/movies/${body.movie_id}`,{"available": false}, key);
    
                    setmsgError(`Order created`);
        
                    setTimeout(() => {
                        history("/profile");
                    }, 2000);

                } catch (error) {
                    setmsgError("Error create order");
                };
            } else {
                setmsgError("Movie isn't available");
            };
    
        } else {
            setmsgError("You can have a maximum three movies at the same time");
        };

    };

    return (
        <div className="designMovie b_col back">
            <div className="profileMovie b_col">
                <div className="movie b_col">
                    <img alt={movie.id} className="movie_img"src={`${movie.backdrop_path}`}/>
                        <div className="title">{movie.title}</div>
                    <div className="movieInfo">
                        <table className="movTable">
                            <tr>
                                <td className="lenght"><b>Vote average:</b></td>{movie.vote_average}<td></td>
                            </tr>
                            <tr>
                                <td><b>Release date:</b></td><td>{moment(movie.release_date).format('MMMM DD YYYY')}</td>
                            </tr>
                            <tr>
                                <td><b>Genres:</b></td><td>{movie.genres.join(', ')}</td>
                            </tr>
                            <tr>
                                <td><b>Overview:</b></td><td>{movie.overview}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="confirm b_col">
                    <table>
                        <tr className="b_row">
                            <div className="rent btn b_row" onClick={()=> Order()}>Rent the movie</div>
                        </tr>
                        <tr className="b_row">
                            <div className="error">{msgError} </div>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default connect((state)=>({credentials: state.credentials}))(Movie);
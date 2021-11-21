import React, {useState, useEffect} from 'react';
import axios from 'axios';
import loader from '../../assets/img/loader.svg';
import {useNavigate} from 'react-router-dom';

const Home = () => {

    let navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(()=>{
        setTimeout(()=>{
            showMovies();
        },500);
    },[]);

    const showMovies = async () => {
        let res = await axios.get("https://dvd-rent.herokuapp.com/movies");
        setMovies(res.data);
    };

    const chosenMovie = (chosenMovie) => {
        localStorage.setItem("chosenMovie", JSON.stringify(chosenMovie));

        navigate("/movie");
    };

    if(movies[1]?.title){

        return (
            <div className="back b_col">
                <div className="searchBar b_row">
                    <input placeholder="Enter Movie Title" onChange={e => setQuery(e.target.value)} />
                </div>
                <div className="displayMovies b_row">
                {
                    movies.filter(mov => {
                        if (query === '') {
                            return mov;
                        } else if (mov.title.toLowerCase().includes(query.toLowerCase())) {
                            return mov;
                        }
                    }).map((movie) => {
                        return (
                            <div className="movieList" key={movie._id}>
                                <img alt={movie.id} className="poster" onClick={()=>chosenMovie(movie)} src={`${movie.poster_path}`}/>
                            </div>
                        );
                    })
                };
                 </div>
            </div>
        );

    } else {
        return (
            <div className="load back b_row">
                <img className="loader" alt="loader" src={loader}/>
            </div>
        );
    };
};

export default Home;
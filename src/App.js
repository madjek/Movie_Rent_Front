import './App.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Movie from './Containers/Movie/Movie';
import Header from './Components/Header/Header';
import Profile from './Containers/Profile/Profile';
import Register from './Containers/Register/Register';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

      <Header/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/movie" element={<Movie/>}/>

        </Routes>
      
      </BrowserRouter>
      
    </div>
  );
};

export default App;
import React, {Component} from 'react';
import {Route, Routes, Navigate, Link} from 'react-router-dom';
import Users from './Users';
import Planets from './Planets';
import Starships from './Starships';
    
class Home extends Component {
    
    render() {
        return (
           <div>
               <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                   <Link className={"navbar-brand"} to={"/"}> Symfony React Project </Link>
                   <div className="collapse navbar-collapse" id="navbarText">
                       <ul className="navbar-nav mr-auto">
                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/users"}> ListUsers </Link>
                           </li>
                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/planets"}> Planets </Link>
                           </li>
                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/starships"}> Starships </Link>
                           </li>  
                       </ul>
                   </div>
               </nav>
               <Routes>
                   <Route path="/" element={<Navigate to={"/users"}/>} />
                   <Route path="/users" element={<Users />} />
                   <Route path="/planets" element={<Planets />} />
                   <Route path="/starships" element={<Starships />} />
               </Routes>
           </div>
        )
    }
}
export default Home;
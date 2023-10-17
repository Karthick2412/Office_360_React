import { NavLink } from 'react-router-dom';
import './HomePageStyle.css'
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
function HomePage() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const LogoutHandler=()=>{
        dispatch(LogoutAction());
        navigate('/');     
    }


    const [isHovered, setIsHovered] = useState(false);

        const handleHover = () => {
            setIsHovered(true);
        };

        const handleLeave = () => {
            setIsHovered(false);
        };


    return <>
        <div className="header">
            {/* <img src="../../assets/report.png" alt="unknown" /> */}
            <span className='logoText'>Office 360</span>
        <ul>
            <li><NavLink to="/home">Home</NavLink></li>
            <li onMouseEnter={handleHover} onMouseLeave={handleLeave} className='dropdown'>
            <NavLink to="/home/tasks">Tasks</NavLink>
            {isHovered && (
                <ul className="dropdown-content">
                <li><NavLink to="/home/tasks">New</NavLink></li>
                <li><NavLink to="/home/tasks">Tasks</NavLink></li>
                </ul>
                )}
            </li>
            <li><NavLink to="/home">Contact</NavLink></li>
            <li><NavLink to="/home">Profile</NavLink></li>
        </ul>
            <button className='Header_RightSide' onClick={LogoutHandler}>Logout</button>
        </div>
    </>
}

export default HomePage;
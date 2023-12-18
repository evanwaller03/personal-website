import React from 'react';
import ChatInterface from '../components/ChatInterface';
import { BrowserRouter as Router, Route, Routes, useNavigate, NavLink } from 'react-router-dom';
import NavBar from '../components/NavBar';

const YouTube = () => {
    return (
        <div className='under-div' style={{ position: 'relative'}}>
            <div className='navbar-div'>
                <NavBar title="Anding Analytics"/>
            </div>
        </div>
    )
}

export default YouTube;
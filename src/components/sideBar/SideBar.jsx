import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './sideBar.scss'
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assests/icon2.png'
import TextsmsIcon from '@mui/icons-material/Textsms';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_CLEAR, THEME_DARK, THEME_LIGHT } from '../../constants/chatConstants';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useAuth0 } from "@auth0/auth0-react";




const SideBar = () => {


    //////////////////////////////////////////// Auth0 ///////////////////////
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const logoutUser = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        toast.success("SUCCESS: Logout successfully !", { position: "top-center", theme: "dark", autoClose: 2000 });
    }

    const loginUser = () => {
        loginWithRedirect();
    }

    //////////////////////////////////////////// Auth0 ///////////////////////


    ////////////////// theme ////////////////////////////////////////////////
    const { theme } = useSelector(state => state.themeReducer);
    const { chatArray } = useSelector(state => state.chatReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);


    const switchMode = () => {
        if (theme == "dark-theme") {
            dispatch({ type: THEME_LIGHT });
            toast.success("SUCCESS: Light mode on", { theme: "dark", autoClose: 2000 });
        } else {
            dispatch({ type: THEME_DARK });
            toast.success("SUCCESS: Dark mode on", { theme: "dark", autoClose: 2000 });
        }
    }
    ////////////////// theme ////////////////////////////////////////////////



    const clearChat = () => {
        if (chatArray.length > 0) {
            dispatch({ type: CHAT_CLEAR });
            toast.success("SUCCESS: Clear conversation successfully !", { autoClose: 2000 });
        } else {
            toast.error("ERROR: No conversation present !", { autoClose: 2000 });
        }
    }


    const closeMenu = () => {
        document.getElementById("sideBar").style.left = "-280px";
    }




    return (
        <>

            {/* //////////////////////////////////////////////////// */}
            <ToastContainer />
            {/* //////////////////////////////////////////////////// */}


            <div id='sideBar'>
                <Button onClick={closeMenu} className='close' variant='outlined'><CloseIcon /></Button>

                <div className='logo'>{isAuthenticated ? <img src={user?.picture} alt="" /> : <img src={logo} alt="" />} </div>
                <h1> {isAuthenticated ? user?.name : "ChatAI 2.0"} </h1>
                <p className='company'>{isAuthenticated ? user?.email : "openAI"}</p>


                <div className='middleSection'>

                    <Link to="/" className='navBtn'>
                        <div className='navIcon'><DashboardIcon fontSize='small' /></div>
                        <div className='txt'>Dashboard</div>
                    </Link>

                    <Link to="/chat" className='navBtn'>
                        <div className='navIcon'><TextsmsIcon fontSize='small' /></div>
                        <div className='txt'>Chat</div>
                    </Link>

                    <Link to="/image_generation" className='navBtn'>
                        <div className='navIcon'><PermMediaIcon fontSize='small' /></div>
                        <div className='txt'>Image Generator</div>
                    </Link>

                    <Link to="/gallery" className='navBtn'>
                        <div className='navIcon'><ViewCarouselIcon fontSize='small' /></div>
                        <div className='txt'>Gallery</div>
                    </Link>
                </div>


                <div className='bottomSection'>

                    <div className='navBtn' onClick={clearChat}>
                        <div className='navIcon'><DeleteOutlineIcon fontSize='small' /></div>
                        <div className='txt'>Clear conversation</div>
                    </div>


                    <div className='navBtn' onClick={switchMode}>
                        <div className='navIcon'>{theme == "light-theme" ? <NightsStayIcon fontSize='small' /> : <LightModeIcon fontSize='small' />}</div>
                        <div className='txt'> {theme == "light-theme" ? "Dark mode" : "Light mode"}</div>
                    </div>


                    {isAuthenticated ?
                        <div className='navBtn'>
                            <div className='navIcon'><LogoutIcon fontSize='small' /></div>
                            <div className='txt' onClick={logoutUser}>Logout</div>
                        </div>
                        :
                        <div className='navBtn'>
                            <div className='navIcon'><LogoutIcon fontSize='small' /></div>
                            <div className='txt' onClick={loginUser}>Login</div>
                        </div>
                    }

                </div>



            </div>
        </>
    )
}

export default SideBar
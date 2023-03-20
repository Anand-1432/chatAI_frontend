import React from 'react'
import './header.scss'
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {

    const openMenu = () => {
        document.getElementById("sideBar").style.left = "0px";
    }

    return (
        <div className='header'>
            <div onClick={openMenu}>
                <MenuIcon className='menu' style={{ fontSize: "30px" }} />
            </div>
        </div>
    )
}

export default Header
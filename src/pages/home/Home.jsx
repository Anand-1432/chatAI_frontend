import React from 'react'
import Header from '../../components/header/Header'
import SideBar from '../../components/sideBar/SideBar'
import './home.scss'

import img1 from '../../assests/img1.gif'
import img2 from '../../assests/img2.gif'
import img3 from '../../assests/img3.png'
import icon from '../../assests/icon2.png'

const Home = () => {


    return (
        <>
            <div className='home'>
                <Header />

                <div className='homeLeft'>
                    <SideBar />
                </div>

                <div className='homeRight'>

                    <div className='inner'>
                        <h1>ChatAI <span>Clone 2.0</span></h1>

                        <div className='gptLogo'>
                            <img src={icon} alt="" />
                        </div>

                        <div className='gif container'>
                            <div className='row'>
                                <div className='col-lg-6 col-xl-6 col-md-6 box1'>
                                    <img src={img1} alt="" />
                                </div>
                                <div className='col-lg-6 col-xl-6 col-md-6 box2'>
                                    <img src={img2} alt="" />
                                </div>
                            </div>
                        </div>

                        <div className='endText'>
                            <span>AI</span> is the simulation of human intelligence processes by machines. <br />
                            <img src={img3} alt="" />
                        </div>

                    </div>


                </div>

            </div>
        </>
    )
}

export default Home
import React, { useEffect, useRef, useState } from 'react'
import ChatBox from '../../components/chatBox/ChatBox'
import Header from '../../components/header/Header'
import SideBar from '../../components/sideBar/SideBar'
import TelegramIcon from '@mui/icons-material/Telegram';
import './chat.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getResponse } from '../../actions/chatActions';
import { ThreeDots } from 'react-loader-spinner'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import LightModeIcon from '@mui/icons-material/LightMode';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {


    const { chatArray, loading } = useSelector(state => state.chatReducer);
    const dispatch = useDispatch();

    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats(chatArray);
    }, [chatArray]);


    ////////////////////////////////////////////////////////
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    ///////////////////////////////////////////////////////////////////

    const { isAuthenticated } = useAuth0();
    const submit = () => {
        if (isAuthenticated) {
            if (message) {
                dispatch(getResponse(message));
                setMessage("");
            } else {
                toast.error("Error: Please fill the input field !", { theme: "colored", autoClose: 2000 });
            }
        } else {
            toast.error("Error: Please login !", { theme: "colored", autoClose: 2000 });
        }
    }

    /////////////////////////////// auto scroll /////////////////////////
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);






    return (
        <>

            {/* //////////////////////////////////////////////////// */}
            <ToastContainer />
            {/* //////////////////////////////////////////////////// */}


            <div className='chat'>
                <Header />

                <div className='chatLeft'>
                    <SideBar />
                </div>

                <div className='chatRight'>

                    <div className='inner'>

                        {chats.length === 0 ? <div className='welcome'>
                            <h1>ChatAI <span>Clone 2.0</span></h1>
                            <div className='gridBox'>
                                <div className='row'>
                                    <div className='col-lg-4 col-xl-4 col-md-4 boxCon'>
                                        <section><LightModeIcon /> <br /> Example</section>
                                        <div style={{ cursor: "pointer" }} onClick={() => setMessage("Explain quantum computing in simple terms")}>Explain quantum computing in simple terms <ArrowRightAltIcon fontSize='small' /></div>
                                        <div style={{ cursor: "pointer" }} onClick={() => setMessage("Got any creative ideas for a 10 year old’s birthday?")}>Got any creative ideas for a 10 year old’s birthday? <ArrowRightAltIcon fontSize='small' /></div>
                                        <div style={{ cursor: "pointer" }} onClick={() => setMessage("How do I make an HTTP request in Javascript?")}>How do I make an HTTP request in Javascript? <ArrowRightAltIcon fontSize='small' /></div>
                                    </div>
                                    <div className='col-lg-4 col-xl-4 col-md-4 boxCon'>
                                        <section><ElectricBoltIcon /> <br /> Capabilities</section>
                                        <div>Remembers what user said earlier in the conversation</div>
                                        <div>Allows user to provide follow-up corrections</div>
                                        <div>Trained to decline inappropriate requests</div>
                                    </div>
                                    <div className='col-lg-4 col-xl-4 col-md-4 boxCon'>
                                        <section><WarningAmberIcon /> <br /> Limitations</section>
                                        <div>May occasionally generate incorrect information</div>
                                        <div>May occasionally produce harmful instructions or biased content</div>
                                        <div>Limited knowledge of world and events after 2021</div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}


                        <div>
                            {chats.map((val, index) => {
                                return (
                                    <ChatBox key={index} data={val} />
                                )
                            })}
                            {chats.length !== 0 ? <div ref={bottomRef} style={{ height: "px" }}></div> : null}
                        </div>

                    </div>


                    <div className='footer'>
                        <div className='textBox'>
                            <input type="text" name="" id="" value={message} onChange={handleChange} />
                            <span onClick={submit} className='sendIcon'><TelegramIcon /></span>
                            {loading ? <div className='loading'>
                                <ThreeDots
                                    height="30"
                                    width="40"
                                    radius="3"
                                    color={`var(--color2)`}
                                    ariaLabel="three-dots-loading"
                                    wrapperClassName=""
                                    visible={true}
                                />
                            </div> : null}
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Chat
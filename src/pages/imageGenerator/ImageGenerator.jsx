import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import SideBar from '../../components/sideBar/SideBar'
import './imageGenerator.scss'
import FilterIcon from '@mui/icons-material/Filter';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { generateImage } from '../../actions/imageAction';
import { CirclesWithBar, BallTriangle } from 'react-loader-spinner'
import { addCommunity } from '../../actions/galleryAction';
import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ImageGenerator = () => {

    const { isAuthenticated, user } = useAuth0();
    ///////////////////////////// auth0 ///////////////////////////////////////


    const { image, imageLoading } = useSelector(state => state.imageReducer);
    const { addLoading } = useSelector(state => state.galleryReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [photo, setPhoto] = useState("");

    useEffect(() => {
        if (image) {
            setPhoto(image);
        }
    }, [image]);

    const [request, setRequest] = useState(false);

    const [state, setState] = useState({
        name: isAuthenticated ? user?.name : "",
        prompt: "",
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });

    }

    const generate = () => {
        if (isAuthenticated) {
            if (state.prompt && state.name) {
                setRequest(true);
                dispatch(generateImage(state));
            } else {
                toast.error("Error: Please fill all required field !", { theme: "colored", autoClose: 2000 });
            }
        } else {
            toast.error("Error: Please login !", { theme: "colored", autoClose: 2000 });
        }
    }

    const afterAdding = () => {
        navigate("/gallery");
    }

    const addToCommunity = () => {
        if (isAuthenticated) {
            if (state.name && state.prompt && photo) {
                dispatch(addCommunity({ user: state.name, title: state.prompt, url: photo }, afterAdding));
            } else {
                toast.error("Error: Generate image to share !", { theme: "colored", autoClose: 2000 });
            }
        }
        else {
            toast.error("Error: Please login !", { theme: "colored", autoClose: 2000 });
        }
    }


    return (
        <>

            {/* //////////////////////////////////////////////////// */}
            <ToastContainer />
            {/* //////////////////////////////////////////////////// */}


            <div className='ImageGeneration'>
                <Header />

                <div className='ImageGenerationLeft'>
                    <SideBar />
                </div>

                <div className='ImageGenerationRight'>

                    <div className='inner'>

                        {addLoading ? <div className='communityLoader'>
                            <BallTriangle
                                height={80}
                                width={80}
                                radius={5}
                                color={`var(--color2)`}
                                ariaLabel="ball-triangle-loading"
                                wrapperClass={{}}
                                wrapperStyle=""
                                visible={true}
                            />
                        </div> : null}

                        <div className='innerAiImage'>
                            <h3>Create</h3>
                            <div className='intro'>Create imaginative and visually stunning images through DALL-E AI and share them with the community.</div>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" name='name' value={state.name} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Prompt</label>
                                <input type="text" className="form-control" placeholder="Write about the image to generate !" name='prompt' value={state.prompt} onChange={handleChange} />
                            </div>

                            <div className='imageContainer'>
                                {!request ? <FilterIcon style={{ fontSize: "80px" }} />
                                    :
                                    <CirclesWithBar
                                        height="100"
                                        width="100"
                                        color={`var(--color2)`}
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        outerCircleColor=""
                                        innerCircleColor=""
                                        barColor=""
                                        ariaLabel='circles-with-bar-loading'
                                    />
                                }
                                {!imageLoading && request ? <img src={photo} alt="" /> : null}
                            </div>

                            <Button variant='contained' className='bt1' onClick={generate}>Generate</Button>
                            <section className='text1'>Once you created the image you want, you can share it with others in the community.</section>
                            <Button variant='contained' className='bt2' onClick={addToCommunity}>Share with community</Button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default ImageGenerator
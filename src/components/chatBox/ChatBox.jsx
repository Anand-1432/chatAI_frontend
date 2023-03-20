import React from 'react'
import './chatBox.scss'
import icon from "../../assests/icon.png"
import person from "../../assests/person.png"

const ChatBox = (props) => {
    return (
        <>
            <div className='chatBox' id={props.data.role !== "user" ? "gpt" : ""}>
                <div className='chatInner'>
                    <div className='imgBox'> <img src={props.data.role === "user" ? person : icon} alt="" /></div>
                    <div> {props.data.message} </div>
                </div>
            </div>
        </>
    )
}

export default ChatBox
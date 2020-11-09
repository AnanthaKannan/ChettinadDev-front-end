import React from 'react'
import { AiOutlineQuestionCircle, AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import profileLogo from "../assets/Ellipse 30.png"
import SearchIcon from "../assets/Group 2840.png"
import QuestmarkIcon from "../assets/Icon feather-help-circle.png"
import BellIcon from "../assets/Icon feather-bell.png"

function profile({ name, designation }) {
    return (
        <div className="profile d-flex align-items-stretch h-100 justify-content-end">

            <div className='d-flex align-items-stretch icon-border'>
                <div className='d-flex align-items-center'>
                    <img src={SearchIcon} alt="profileLogo" />
                </div>
                <div className='d-flex align-items-center'>
                    <img src={QuestmarkIcon} alt="profileLogo vl" />
                </div>
                <div className='d-flex align-items-center'>
                    <img src={BellIcon} alt="profileLogo" />
                </div>
            </div>
            <div className='d-flex align-items-center mx-3'>
                <div className='d-flex flex-column'>
                    <label className="mb-0 profile-text">{name}</label>
                    <label className="mb-0 profile-text-desg">{designation}</label>
                </div>
            </div>
            <div className='d-flex align-items-center'>
            <img src={profileLogo} alt="profileLogo" />
            </div>
        </div>
    )
}


export default profile
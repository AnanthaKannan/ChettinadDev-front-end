import React from 'react'
import LoginBox from '../components/LoginBox'
import LoginCarousel from '../components/LoginCarousel'

export default function Login() {
    return (
        <div className='container-fluid p-0'>
            <div className="row no-gutters">
                <div className="col-md-6">
                     <LoginCarousel />
                </div>
                <div className="col-md-6">
                    <LoginBox />
                </div>
            </div>
        </div>
    )
}

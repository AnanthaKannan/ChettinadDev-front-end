import React from 'react'
import Agent from '../components/Agent'
import Category from '../components/Category'
import MyNavbar from '../reusable/MyNavbar'

export default function AddAgentCategory() {
    return (
        <div>
            <MyNavbar />
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-md-4">
                <Category />
                </div>
                <div className="col-md-4">
                <Agent />
                </div>
            </div>
        </div>
        </div>
    )
}

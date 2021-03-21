import React from 'react'
import Agent from '../components/Agent'
import Category from '../components/Category'

export default function AddAgentCategory() {
    return (
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
    )
}

import React from 'react'
import AddProducts from '../components/AddProducts'
import MyNavbar from '../reusable/MyNavbar'

export default function AddProduct() {
    return (
        <div>
            <MyNavbar />
            <div className="container-fluid">
                <AddProducts />
            </div>
        </div>
    )
}

import React from 'react'
import ProductDetail from '../components/ProductDetail'
import MyNavbar from '../reusable/MyNavbar'

export default function ProductDetails() {
    return (
        <div>
            <MyNavbar />
        <div className='container-fluid'>
            <ProductDetail />
        </div>
        </div>
    )
}

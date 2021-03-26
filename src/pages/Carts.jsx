import React from 'react'
import Cart from '../components/Cart'
import MyNavbar from '../reusable/MyNavbar'

export default function Carts() {
    return (
        <div>
             <MyNavbar />
        <div className='container-fluid'>
           <Cart />
        </div>
        </div>
    )
}

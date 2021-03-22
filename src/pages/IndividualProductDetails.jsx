import React, { useEffect, useState } from 'react'
import IndividualProductChart from '../components/IndividualProductChart';
import IndividualProductDetail from '../components/IndividualProductDetail'
import StockHistory from '../components/StockHistory'
import MyNavbar from '../reusable/Navbar';


export default function IndividualProductDetails() {

    const [productId, setProductId] = useState('');

    return (
        <div>
             <MyNavbar />
        <div className='container-fluid'>
           
            <div className='row'>
                <div className='col-md-6'>
                    <IndividualProductDetail setProductId={setProductId} />

                </div>
                <div className='col-md-6'>
                    <StockHistory productId={productId} />
                </div>
            </div>
            <div>
                <IndividualProductChart productId={productId} />
            </div>
        </div>
        
        </div>
    )
}

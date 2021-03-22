import React, {useState, useEffect} from 'react';
import AgGirdReact from '../reusable/AgGirdReact';
import generalService from '../service/general.service'
import { stockColDef } from './stockColDef';

export default function StockHistory({productId}) {
    const [rowData, setRowData] = useState([]);

    useEffect(() =>{
        console.log('productId', productId)
        if(productId){
         getStockDetailsByProductId();
        }
    },[productId])

    const getStockDetailsByProductId = async() => {
        const result = await generalService.getStockDetailsByProductId({_id: productId});
        if(result.status == 200){
            const data = result.data.data;
            console.log('getStockDetailsByProductId', data);
            setRowData([...data]);
        }
    }

    return (
        <div>
             {/* <p className='txt-lg mb-2'>Stock History</p> */}
             <span className='txt-sm'>Stock History</span>
             <AgGirdReact columnDefs={stockColDef} rowData={rowData} pagination={false}/>
        </div>
    )
}

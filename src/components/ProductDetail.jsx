import React, {useEffect, useState} from 'react'
import AgGirdReact from '../reusable/AgGirdReact'
import {productColDef} from './productColDef'
import generalService from '../service/general.service'

export default function ProductDetail() {

    const [rowData, setRowData] = useState([]);

    useEffect(() =>{
        getProduct();
    },[]);

    const getProduct = async() => {
        const result = await generalService.getProduct();
        if(result.status == 200){
            const data = result.data.data;
            console.log('data', data);
            setRowData([...data]);
        }
    }

    return (
        <div>
            <AgGirdReact columnDefs={productColDef} rowData={rowData} />
        </div>
    )
}

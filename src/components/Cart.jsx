import React, {useEffect, useState} from 'react'
import AgGirdReact from '../reusable/AgGirdReact'
import {cartColDef} from './cartColDef'
import generalService from '../service/general.service'
import RsButton from '../reusable/RsButton';

export default function Cart() {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        getCartDetails();
    },[]);

    const getCartDetails = async() =>{
        const result = await generalService.getCartDetails();
        if(result.status == 200){
            const data = result.data.data;
            console.log('data', data);
            setRowData([...data]);
        }
    }

    const updateCart = () => {

    }

    const onHandleExportExcel= () => {

    }

    return (
        <div>
             <div className='text-right mb-2'>
                <RsButton text='Export CSV' onClick={onHandleExportExcel} />
                <RsButton text='Update' className='ml-2' onClick={updateCart} />
            </div>
             <AgGirdReact columnDefs={cartColDef} rowData={rowData} height='80vh' />
        </div>
    )
}

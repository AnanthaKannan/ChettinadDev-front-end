import React, {useEffect, useState} from 'react'
import AgGirdReact from '../reusable/AgGirdReact'
import {productColDef} from './productColDef'
import generalService from '../service/general.service'
import RsButton from '../reusable/RsButton';
import { toast } from 'react-toastify';

export default function ProductDetail() {

    const [rowData, setRowData] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() =>{
        getProduct();
    },[]);

    const getProduct = async() => {
        const result = await generalService.getProduct();
        if(result.status == 200){
            const data = result.data.data;
            console.log('data', data);
            const updatedData = dataConversion(data);
            setRowData([...updatedData]);
        }
    }

    const dataConversion = (data) => {
        const updatedData = data.map((obj) => {
            obj.alert = false;
            if(!obj.currentStock){
                obj.currentStock = 0;
            }
            if(obj.reserved >= obj.currentStock){
                obj.alert = true;
            }
            return obj;
        });
        console.log('updatedData', updatedData)
        return updatedData;
    }

    const onHandleImportExcel = () => {

    }

    const onHandleExportExcel = () => {

    }

    const addToCart = async() => {
       const sendData = selectedRow.map((obj) =>{
           return {
               _productId: obj._id,
               status: 'addCart'
           }
       });
       console.log('sendData', sendData);
       const result = await generalService.addCart({data: sendData});
       if(result.status == 200){
           toast.success('Successfully added')
       }
       else{
           toast.error('Failed to add');
       }

    }

    const onSelectionChanged= (row) => {
        const selectedRows_ = row.api.getSelectedRows();
        setSelectedRow(selectedRows_)
        console.log('row', selectedRows_);
    }

    return (
        <div>
            <div className='text-right mb-2'>
                <RsButton text='Export CSV' onClick={onHandleExportExcel} />
                <RsButton text='Import EXCEL' className='ml-2' onClick={onHandleExportExcel} />
                <RsButton text='Add Cart' className='ml-2' onClick={addToCart} />
            </div>
            <AgGirdReact columnDefs={productColDef} rowData={rowData} height='80vh' onSelectionChanged={onSelectionChanged} />
        </div>
    )
}

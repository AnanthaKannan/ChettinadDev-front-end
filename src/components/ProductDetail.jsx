import React, {useEffect, useState} from 'react'
import AgGirdReact from '../reusable/AgGirdReact'
import {productColDef} from './productColDef'
import generalService from '../service/general.service'
import RsButton from '../reusable/RsButton';
import { toast } from 'react-toastify';
import CheckBoxCellRenderer from '../reusable/CheckBoxCellRenderer ';
import _ from 'lodash'

export default function ProductDetail() {

    const [rowData, setRowData] = useState([]);
    // const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() =>{
        getProduct();
    },[]);

    const getProduct = async() => {
        const result = await generalService.getProduct();
        console.log('result', result)
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
        console.log('dataConversion', updatedData)
        return updatedData;
    }

    const onHandleImportExcel = () => {

    }

    const onHandleExportExcel = () => {

    }

    const addToCart = async() => {
        const selectedRow = rowData.filter(obj => obj.isSelected === true);
        const isQuantityAdded = selectedRow.every(obj => obj.quantityToOrder);
        console.log('selectedRow', selectedRow, 'isQuantityAdded', isQuantityAdded)
        if(!isQuantityAdded){
            toast.error('Please add the quantity');
        }
        if(selectedRow.length < 1){
            toast.error('Please select any product');
            return;
        }
       const sendData = selectedRow.map((obj) =>{
           return {
               _productId: obj._id,
               quantity: obj.quantityToOrder,
               status: 'addCart'
           }
       });
       console.log('sendData', sendData);
       const result = await generalService.addCart({data: sendData});
       if(result.status == 200){
           toast.success('Successfully added');
           getProduct();
           getProduct();
           getProduct();
       }
       else{
           toast.error('Failed to add');
       }

    }

    // const onSelectionChanged= (row) => {
    //     const selectedRows_ = row.api.getSelectedRows();
    //     setSelectedRow(selectedRows_)
    //     console.log('row', selectedRows_);
    // }

    const onEnableCheckBox = (data) =>{
        const rowData_ = _.cloneDeep(rowData);
        let IsQuantityToOrder = false;
        let IsAlreadyInCart = false;
        const updatedData = rowData_.map((obj) => {
            if(obj._id === data._id && obj.cart){
                IsAlreadyInCart(true)
            }
            else if(obj._id === data._id && obj.quantityToOrder){
                obj.isSelected = !obj.isSelected;
                IsQuantityToOrder = true;
            }
            return obj;
        });
        if(IsAlreadyInCart){
            toast.error('It is already in cart');
            return
        }
        if(!IsQuantityToOrder){
            toast.error('Enter the quantity of the product');
        }
        else{
            setRowData(updatedData);
        }
    }

    const onCellClicked= (e) => {
        console.log('element', e);
        const column = e.colDef.field;
        if(column === 'cart'){
            onEnableCheckBox(e.data)
        }
    }

    return (
        <div>
            <div className='text-right mb-2'>
                <RsButton text='Export CSV' onClick={onHandleExportExcel} />
                <RsButton text='Import EXCEL' className='ml-2' onClick={onHandleExportExcel} />
                <RsButton text='Add Cart' className='ml-2' onClick={addToCart} />
            </div>
            <AgGirdReact columnDefs={productColDef}
            onCellClicked={onCellClicked}
             rowData={rowData} height='80vh' 
            frameworkComponents={{
                CheckBoxCellRenderer: CheckBoxCellRenderer
            }}/>
        </div>
    )
}

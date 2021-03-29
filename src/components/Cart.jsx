import React, {useEffect, useState} from 'react'
import AgGirdReact from '../reusable/AgGirdReact'
// import {cartColDef} from './cartColDef'
import generalService from '../service/general.service'
import RsButton from '../reusable/RsButton';
import {AgGirdButtonUrl, AgGirdButtonEmail, AgGirdTextBoxNumber} from '../reusable/AgGirdButton';
import _ from 'lodash';

export default function Cart() {
    const [rowData, setRowData] = useState([]);
    const [noOfProductList, setNoOfProductList] = useState([])
    const [cartColDef, setCartColDef] = useState([
    
        {
            headerName: "Vendor",
            field: "vendorName",
            sortable: true,
            filter: true
        },
        {
            headerName: "Product",
            field: "name",
            sortable: true,
            filter: true
        },
        {
            headerName: "No of Product",
            field: "cartQuantity",
            sortable: true,
            filter: true
        },
        {
            headerName: "Picked/Delivery",
            field: "cartPicked",
            sortable: true,
            filter: true,
            cellRenderer: 'AgGirdTextBoxNumber',
            cellRendererParams: {
                type: 'number',
                onChange: function(value, _id) {
                    onAddText(value, _id);
                },
              },
        },
        {
            headerName: "Pending",
            field: "cartPending",
            sortable: true,
            filter: true
        },
        {
            headerName: "Current Stock",
            field: "currentStock",
            sortable: true,
            filter: true
        },
        {
            headerName: "URL",
            field: "vendorUrl",
            sortable: true,
            filter: true,
            cellRenderer: 'AgGirdButtonUrl',
            cellRendererParams: {
                text: 'Open URL',
                onClick: function(url) {
                window.open(`https://${url}`);
                },
              },
        },
        {
            headerName: "Email",
            field: "vendorEmail",
            sortable: true,
            filter: true,
            cellRenderer: 'AgGirdButtonEmail',
            cellRendererParams: {
                text: 'Send Email',
                onClick: function(field) {
                  alert(`${field} was clicked`);
                },
              },
        }
    ])

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
        console.log('rowData', rowData);
        console.log('setNoOfProductList', noOfProductList)
    }

    const onAddText = (text, _id) => {
        console.log('text', text, _id);
        console.log('rowData', rowData);

        // onHandleExportExcel();
        // const rowData_ = _.cloneDeep(rowData);
        // const updatedData = rowData_.map((obj) => {
        //     if(obj._id === _id){
        //        obj.cartPicked = text;
        //     }
        //     return obj;
        // });
        // console.log('updatedData', updatedData);
        // setRowData([...updatedData]);
    }

    const onCellClicked= (e) => {
        console.log('e', e)
    }

    const onCellValueChanged = (e) => {
        console.log('e')
    }

    useEffect(() => {
        console.log('data')
    },[rowData])

    return (
        <div>
             <div className='text-right mb-2'>
                <RsButton text='Export CSV' onClick={onHandleExportExcel} />
                <RsButton text='Update' className='ml-2' onClick={updateCart} />
            </div>
             <AgGirdReact columnDefs={cartColDef} 
             onCellValueChanged={onCellValueChanged}
             onCellClicked={onCellClicked}
              frameworkComponents={{
                AgGirdButtonEmail: AgGirdButtonEmail,
                AgGirdButtonUrl: AgGirdButtonUrl,
                AgGirdTextBoxNumber: AgGirdTextBoxNumber
            }}
             rowData={rowData} height='80vh' />
        </div>
    )
}

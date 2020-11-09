import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import info from "../assets/Icon-info.png"
import Swal from 'sweetalert2';
import Popup from "../components/Popup";
import service from '../service/tilt.service';
import { Modal } from 'reactstrap';

export default function CloseCharge({stepper, potDetail, smallCurcible, createChargeDetails}) {

    const [allDetails, setAllDetails] = useState({ rowData:smallCurcible.rowData,  crucibleNO: createChargeDetails.SelectedCurcible, 
        station:createChargeDetails.Station[0], largeCrucibleLine: createChargeDetails.LargeCrucible[0], 
    chargeNo:createChargeDetails.ChargeNO, weight: smallCurcible.totalWeight, status: createChargeDetails.Status});
    const [isOpen, setIsOpen] = useState(false);
    const [popUpRowData, setPopUpRowData] = useState([]);
    const [popUpChargeNO, setPopUpChargeNO] = useState(0);
    const [popUpWeight, setPopUpWeight] = useState(0);
    const [successStatus, setSuccessStatus] = useState(false);
    const [successHtml, setSuccessHtml] = useState(<p></p>);

    /************* 
    * Purpose: Back to navigate smallCurcible page
    *  *************/
    const onBack = () =>{
        stepper(2)
    }

    /************* 
    * Purpose: Call the function once initialize the page
    *  *************/
    useEffect((obj) => {
        console.log('potDetail', potDetail);
        console.log('smallCurcible', smallCurcible);
        console.log('createChargeDetails', createChargeDetails);
    }, [])

    /************* 
    * Purpose: Initialize the column definition for the ag gird
    *  *************/
    const columnDefs = [
        { headerName: "Charge No.", field: "charges" },
        {
            headerName: "Crucible No.", field: "crucibleNo",
            cellRenderer: (params) => `<span class='cell-color'>${params.value}</span>`
        },
        {
            headerName: "Weight", field: "weight",
            cellRenderer: (params) => `<span class='cell-color'>${params.value}</span>`
        },
        {
            headerName: "", field: "info",
            maxWidth: 60,
            resizable: false,
            filter: false,
            sortable: false,
            cellRenderer: () => '<div> <img class="ag-gird-icon" src="' + info + '" /> </div>'
        }
    ]
    // const rowData = [
    //     {
    //         chargeNO: "1901901",
    //         crucibleNO: "25",
    //         weight: 4500,
    //     },
    //     {
    //         chargeNO: "1901901",
    //         crucibleNO: "25",
    //         weight: 4500,
    //     },
    //     {
    //         chargeNO: "1901901",
    //         crucibleNO: "25",
    //         weight: 4500,
    //     },
    //     {
    //         chargeNO: "1901901",
    //         crucibleNO: "25",
    //         weight: 4500,
    //     }
    // ]

    /************* 
    * Purpose: Make enable option for the ag gird
    *  *************/
    const gridOptions = {
        defaultColDef: {
            // resizable: true,
            filter: true,
            sortable: true
        },
        columnDefs: columnDefs,
        rowData: allDetails.rowData,
        domLayout: 'autoHeight',
        animateRows: true,
        onCellClicked: function (e) { 
            const field = e.colDef.field;
            if(field === "info"){
                console.log('info');
                const data = e.data;
                const chargeNo = data.charges;
                console.log("chargeNo", chargeNo);
                popUp(chargeNo);
            }
         },
        // onRowClicked: function(event) { console.log('A row was clicked', event); },
        onColumnResized: function (event) { console.log('A column was resized', event); },
        onGridReady: function (event) { console.log('The grid is now ready', event); },
        onFirstDataRendered: (params) => params.api.sizeColumnsToFit(),
    };

    /************* 
    * Purpose: Final submit and show the popup
    *  *************/
    const onSubmit = () => {
        stepper(4)
        const html =<span> Charge No. <strong> {allDetails.chargeNo} </strong> for crucible <strong> {allDetails.crucibleNO} </strong></span>
        setSuccessHtml(html);
        setSuccessStatus(!successStatus);
    }

    /************* 
    * Purpose: Show the popup when user click info icon
    *  *************/
    const popUp = async (ChargeNO) => {
        console.log("popUp init")
        setIsOpen(!isOpen);
        const result = await service.GetPotDetailsByChargeNo({ChargeNO});
        if(!result || result.status !== 200){
           return;
        }

        const data = result.data;
        console.log("result", result);
        let weight = 0;
        const rowData_ = [1,2,3].map((val, i) => {
            weight = weight + parseInt(data.weight);
            return { Pot_No: data[`pot${i+1}`],
                weight: data.weight,
            Pot_name: data.potName,
             SI:data.si, 
             FE: data.fe }
           });
           setPopUpRowData(rowData_);
           setPopUpChargeNO(data.charges);
           setPopUpWeight(weight);
    }; 

    /************* 
    * Purpose: Final ok of the process, back to navigate charge
    *  *************/
    const onHandleOkey = () => {
        setSuccessStatus(!successStatus);
        stepper(0, 'closeCharge', null);
    }

    return (
        <div>
             <Popup columnDefs={columnDefs} 
                            chargeNo={popUpChargeNO}
                            popUpWeight={popUpWeight}
                            rowData={popUpRowData} onClick={()=> popUp()} isOpen={isOpen}/>
            <p className='step-3'>Step 4</p>
            <p className='charge-to-small-crucibles'>Confirm all the details before closing the charge</p>
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Crucible No.</label>
                    <input type="text" readOnly={true} value={allDetails.crucibleNO} className='form-control text-box-text' />
                </div>
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Station</label>
                    <input type="text" readOnly={true} value={allDetails.station} className='form-control text-box-text' />
                </div>
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Large Crucible Line</label>
                    <input type="text" readOnly={true} value={allDetails.largeCrucibleLine} className='form-control text-box-text' />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Charge No.</label>
                    <input type="text" readOnly={true} value={allDetails.chargeNo} className='form-control text-box-text' />
                </div>
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Total Weight</label>
                    <input type="text" readOnly={true} value={allDetails.weight} className='form-control text-box-text' />
                </div>
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Status</label>
                    <input type="text" readOnly={true} value={allDetails.status} className='form-control text-box-text' />
                </div>
            </div>

            <hr />

            <div className="ag-theme-alpine">
                <AgGridReact
                    gridOptions={gridOptions}
                >
                </AgGridReact>
            </div>
            <br />
            <div className='text-right'>
            <Button variant="outlined" className='mx-2' onClick={onBack} >Back</Button>
            <Button color="secondary" variant="contained" className='get-weight' onClick={onSubmit} >Submit</Button>
            </div>
            <br />

            <Modal isOpen={successStatus} toggle={() => setSuccessStatus(!successStatus)}  centered>
            <div className='alert-success text-center bg-white pb-5 rounded'>
                <br/> <br/>
                <img src={require('../assets/success.png')} alt="success" />
                <p className='success-text'>Success!</p>
                <p className='success-msg'>{ successHtml }<br/> has been successfully created</p>
                <div className="text-center">
                    <Button color="secondary" variant="contained" className='get-weight' onClick={() =>onHandleOkey() } >Okay</Button>
                </div>
            </div>
            </Modal>
        </div>
    )
}

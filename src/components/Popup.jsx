import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import AggridData from '../components/Aggrid'
import { BsX } from 'react-icons/bs';

const columnDefs = [
        
    {
        headerName: "Pot No.",
        maxWidth: 80,
        field: "Pot_No"
    },
    {
        headerName: "Weight",
        maxWidth: 80,
        field: "weight"
    },
    {
        headerName: "Pot Name",
        maxWidth: 150,
        field: "Pot_name"
    },
    {
        headerName: "SI",
        maxWidth: 80,
        field: "SI"
    },
    {
        headerName: "FE",
        maxWidth: 60,
        field: 'FE' 
  },
]

const ModalExample = ({ className, isOpen, onClick, rowData, chargeNo, popUpWeight }) => {
    // const [totalWeight, setTotalWeight] = useState(0);

    return (
        <div>
            {/* <Button color="danger" onClick={onClick}>buttonLabel</Button> */}
            <Modal isOpen={isOpen} toggle={onClick} className={className} centered>
                <div className="ml-3 mt-3 mb-0">
                    <div className=" d-md-flex justify-content-between getHeader">
                        <label>Charge Details</label>
                        <BsX className="mr-3 " onClick={onClick} />
                    </div>
                    <div className="d-md-flex flex-wrap ">
                        <div>
                            <label className="Charge-No-">ChargeNo:</label>
                            <label className="charge_No mx-2">{ chargeNo}</label>
                        </div>
                        <div className="mx-4">
                            <label className="Charge-No-">Total Weight :</label>
                            <label className="charge_No mx-2"> { popUpWeight } </label>
                        </div>
                    </div>
                <AggridData rowData={rowData}/>
                <div className="pop_btn text-right mr-3 my-2">
                <Button  className='pop_btn' onClick={onClick}>Okay</Button>
                </div>
               
                </div>
            </Modal>
        </div>
    );
}

export default ModalExample;
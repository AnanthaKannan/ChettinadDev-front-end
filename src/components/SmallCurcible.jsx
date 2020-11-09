import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@material-ui/core/Button';
import info from "../assets/Icon-info.png";
import edit from "../assets/Icon-edit.png";
import trash from "../assets/Icon-trash.png";
import Swal from 'sweetalert2'
import { FiPlusSquare } from "react-icons/fi";
import { toast } from 'react-toastify';
import Popup from "../components/Popup";
import service from '../service/tilt.service';

export default function SmallCurcible({ stepper, potDetail, smallCurcible, createChargeDetails }) {

    const [rowData, setRowData] = useState(smallCurcible.rowData.length < 1 ? potDetail.selectedRow : smallCurcible.rowData);
    const [totalWeight, setTotalWeight] = useState(potDetail.totalWeight);
    const [smallCrucibleNo, setSmallCrucibleNo] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [popUpRowData, setPopUpRowData] = useState([]);
    const [popUpChargeNO, setPopUpChargeNO] = useState(0);
    const [popUpWeight, setPopUpWeight] = useState(0);

    /************* 
    * Purpose: Use to call the function when rowData changed
    *  *************/
    useEffect(() => {
        let weight = 0;
        rowData.forEach((obj) => {
            weight = weight + parseInt(obj.weight);
        });
        setTotalWeight(weight);
    }, [rowData]);

    /************* 
    * Purpose: To enable and disable readonly in text box
    *  *************/
    const onEdit = (index) => {
        let updatedRow = rowData.map((row, i) => {
            if(i === index)
                row.readOnly = !row.readOnly;
            else
            row.readOnly = false;
            return row;
        });
        console.log("updatedRow", updatedRow)
        setRowData([...updatedRow])
    }

    const onInfo = (chargeNo) => {
        console.log('onInfo', chargeNo)
    }

    /************* 
    * Purpose: Get the small crucible No List
    *  *************/
    const getSmallCrucibleNo = async() => {
        const result = await service.getSmallCrucibleNo();
        console.log("result", result);
        if(!result || result.status !== 200){
            return;
        }

        const data = result.data;
        console.log("data", data.map(obj => obj.crucibleNo));
        setSmallCrucibleNo([...data]);
    };

    /************* 
    * Purpose: Use to call the function when rowData changed
    *  *************/
    useEffect(() => {
        getSmallCrucibleNo();
    }, []);

    /************* 
    * Purpose: Remove the data from the table when click delete icon
    *  *************/
    const onDelete = (chargeNo) => {
        console.log('onDelete', chargeNo);
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
            const updatedRows = rowData.filter(obj => obj.charges !== chargeNo);
            setRowData([...updatedRows]);
            }
          });
    }

    /************* 
    * Purpose: update the rowData when selection or textbox value change
    *  *************/
    const updateRow = (index, value, key) => {
        let row = rowData[index];
        row[key] = value;
        let updatedRow = rowData;
        updatedRow[index] = row
        setRowData([...updatedRow])
    }

    /************* 
    * Purpose: Get the Crucible no, when user select change the drop down value
    *  *************/
    const onSelectChange = (e, index) => {
        const value = e.target.value;
        console.log('value', value);
        updateRow(index, value, 'crucibleNo');
    }

    /************* 
    * Purpose: Use to get the text box value, when weight update
    *  *************/
    const textChange = (e, index) => {
        const value = e.target.value;
        const number = value.replace(/[A-Z a-z]/g, '');
        updateRow(index, number, 'weight')
    }

    /************* 
    * Purpose: Get updated values and navigate to close charge
    *  *************/
    const onSave = () => {
        console.log('init onSave', rowData);
        if(rowData.length < 1){
            toast.info('Please ADD CHARGE');
            return;
        }
        let status = true;
        rowData.forEach((obj) => {
            if(!obj.crucibleNo)
            status = false
        });

        if(!status){
            toast.error('Please select Crucible No for all Charge No');
            return;
        }
        const data = {rowData, totalWeight};
        console.log('rowData', rowData);
        stepper(3, 'smallCurcible', data);
    }

    /************* 
    * Purpose: Back to navigate Pot details page
    *  *************/
    const onBack = () => {
        const data = { rowData: [], totalWeight };
        console.log('rowData', rowData);
        stepper(1, 'smallCurcible', data);
    }

    /************* 
    * Purpose: Initialize the definition of the column for the table
    *  *************/
    const columnDefs = [
        { headerName: "Charge No.", field: "charges" },
        {
            headerName: "Crucible No.",
            field: "crucibleNO",
        },
        {
            headerName: "Weight (Kg)", field: "weight",
            cellRenderer: (params) => `<span class='cell-color'>${params.value}</span>`
        },
        {
            headerName: "", field: "delete",
            maxWidth: 60,
            resizable: false,
            filter: false,
            sortable: false,
            cellRenderer: () => '<div  class="text-center"> <img class="ag-gird-icon" src="' + trash + '" /> </div>'
        },
        {
            headerName: "",
            maxWidth: 60,
            field: "info",
            resizable: false,
            filter: false,
            sortable: false,
            cellRenderer: () => '<div  class="text-center"> <img class="ag-gird-icon" src="' + info + '" /> </div>',
        },
        {
            headerName: "",
            maxWidth: 60,
            field: 'edit',
            resizable: false,
            filter: false,
            sortable: false,
            cellRenderer: () => '<div  class="text-center"> <img class="ag-gird-icon" src="' + edit + '" /> </div>',
        },
    ]

    /************* 
    * Purpose: To enable pop up and fetch the pot details from the charge no
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


    return (
        <div>
             <Popup columnDefs={columnDefs} 
                            chargeNo={popUpChargeNO}
                            popUpWeight={popUpWeight}
                            rowData={popUpRowData} onClick={()=> popUp()} isOpen={isOpen}/>

            <p className='step-3'>Step 3</p>
            <p className='charge-to-small-crucibles'>Allocate charge to small crucibles</p>

            <div className='row'>
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Total Weight</label>
                    <input type="text"
                        id="weight"
                        name="weight"
                        readOnly={true}
                        className='form-control text-box-text'
                        value={totalWeight} />
                </div>
            </div>
            <br />
               

            <div className="table-responsive">
                <table className="table border tbl-font">
                    <thead className="tbl-bg small-curicble-tbl">
                        <tr>
                            {
                                columnDefs.map((obj) => <th scope="col">{obj.headerName}</th>)
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {
                           smallCrucibleNo.length > 0 &&   rowData.map((obj, index) => {
                                return <tr>
                                    <th scope="row">{obj.charges}</th>
                                    <td>
                                        <select onChange={(e) => onSelectChange(e, index)} className='sm-curicble-select form-control'>
                                        <option hidden>Select</option>
                                        {
                               smallCrucibleNo.map(cruObj =>  <option selected={ obj.crucibleNo === cruObj.crucibleNo ? true : false }
                                 value={cruObj.crucibleNo}>{cruObj.crucibleNo}</option>)
                              
                              }
                                        </select>
                                    </td>
                                    <td> 
                                    <input type="text" class="form-control sm-curicble-input" value={obj.weight} readOnly={!obj.readOnly}
                                     onChange={(e) => textChange(e, index)} />
                                    </td>
                                    <td onClick={() => onDelete(obj.charges)}><img class="ag-gird-icon" src={trash} /> </td>
                                    <td onClick={() => popUp(obj.charges)}><img class="ag-gird-icon" src={info} /></td>
                                    <td onClick={() => onEdit(index)}><img class="ag-gird-icon" src={edit} /></td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>
            
            <Button color="secondary" onClick={onBack} className='get-weight'> <FiPlusSquare className='mr-2' /> ADD Charge</Button>

            <div className='text-right'>
                <Button variant="outlined" className='mx-2' onClick={onBack}>Back</Button>
                <Button color="secondary" variant="contained" className='get-weight' onClick={onSave}>Save & Continue</Button>
            </div>
            <br /><br />
        </div>
    )
}

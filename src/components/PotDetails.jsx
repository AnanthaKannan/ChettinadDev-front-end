import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import profileLogo from "../assets/Ellipse 30.png"
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import service from '../service/tilt.service';
import { toast } from 'react-toastify';

export default function PotDetails({stepper, potDetail}) {

    const [gridApi, setGridApi] = useState(null);
    const [rowData, setRowData] = useState(potDetail.rowData);
    const [PotRoomList, setPotRoomList] = useState([]);
    const [PotDetailsData, setPotDetailsData] = useState([]);
    const [PotLine, setPotLine] = useState(potDetail.PotLine);
    const [SelectedText, setSelectedText] = useState(potDetail.SelectedText);
    const [selectedRow, setSelectedRow] = useState([]);
    
    /************* 
    * Purpose: get the charge list using the pot room
    *  *************/
    const getChargeListByPotRoom = async(potRoom) => {
        const result = await service.getChargeListByPotRoom(potRoom);
        console.log('result', result);
        if(!result || result.status !== 200){
            return
        }
        const data = result.data;
        setRowData(data);
    }

    /************* 
    * Purpose: Get all the potRoom list
    *  *************/
    const getPotRoomList = async() => {
        const result = await service.getPotRooms();
        console.log('getPotRoomList', result);

        if(!result || result.status !== 200){
            console.error('api response', result)
            return
        }
        const list = result.data;
        console.log('list', list);
        // console.log('list', list)
        setPotRoomList(list.map(obj => obj.potRoom));
        setPotDetailsData(list);
    }

    /************* 
    * Purpose: call the function when initial render happen
    *  *************/
    useEffect(() => {
        getPotRoomList();
    }, [])
    
    /************* 
    * Purpose: Receive selected charge and navigate to small crucible 
    *  *************/
    const onSave =() =>{
        console.log('init onSave');
        if(selectedRow.length < 1){
            toast.error('Please select the Charges');
            return;
        }
       const updatedRow = [];
       selectedRow.forEach((obj) => {
           const find = rowData.find((findObj) => findObj.charges == obj.charges);
           updatedRow.push(find);
       })
        const data = { SelectedText, PotLine, rowData, selectedRow: updatedRow };
        console.log(data);
        stepper(2, 'potDetails', data);
    }

    /************* 
    * Purpose: Back to navigate pot details 
    *  *************/
    const onBack = () =>{
        console.log('init onBack');
        stepper(0);
    }

    /************* 
    * Purpose: Receive the the value form checked the check box 
    *  *************/
    const onSelectionChanged = () => {
        const selectedRows = gridApi.getSelectedRows();
        console.log('selectedRows', selectedRows);
        setSelectedRow(selectedRows)
      };

    /************* 
    * Purpose: Initialized the column definition for the table
    *  *************/
    const columnDefs = [
        {
            headerName: '',
            field: 'checkbox',
            minWidth: 10,
            maxWidth:50,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
          },
        { headerName: "Charges", field: "charges" },
        { headerName: "Pot 1", field: "pot1" },
        { headerName: "Pot 2", field: "pot2" },
        { headerName: "Pot 3", field: "pot3" }
    ]
   
       /************* 
    * Purpose: Get the PotRoom details when user select the drop down and set the pot line values. 
    *  *************/
    const onSelectPotRoom = (e) => {
        const value = e.target.value;
        console.log(value, PotDetailsData);
        const obj = PotDetailsData.find(obj => `${obj.potRoom}` === `${value}`);
        const potLine = obj.potLine;
        setPotLine(potLine);
        setSelectedText(value);
        getChargeListByPotRoom(value);
    }

    const onCellClicked = (e) => {
        console.log('element', e);
    }
   /************* 
    * Purpose: Use to call the function when ag gird initialize 
    *  *************/
    const onGridReady = (params) => {
        setGridApi(params.api);
    }

    return (
        <div>
            <p className='step-3'>Step 2</p>
            <p className='charge-to-small-crucibles'>Add pots to the charge</p>

            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Pot Room</label>
                    <select onChange={onSelectPotRoom} className="form-control text-box-text">
                    <option hidden>Select</option>
                    {
                        PotRoomList.map((no) => <option selected={ SelectedText === no ? true : false } key={no} value={no}>{no}</option>)
                    }
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="" className='total-weight' >Pot Line</label>
                    <input type="text" readOnly={true} value={PotLine} className='form-control text-box-text' />
                </div>
            </div>
            <br />

    {
        rowData.length > 0 && 
        <div className="ag-theme-alpine">
        <AgGridReact
            onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            defaultColDef={{filter: true, sortable: true}}
            rowSelection ='multiple'
            domLayout= 'autoHeight'
            columnDefs = {columnDefs}
            onFirstDataRendered= {(params) => params.api.sizeColumnsToFit()}
            rowData={rowData}>
               
        </AgGridReact>
    </div>
    }


            <br />
            <div className='text-right'>
            <Button variant="outlined" className='mx-2' onClick={onBack}>Back</Button>
            <Button color="secondary" variant="contained" className='get-weight' onClick={onSave} >Save & Continue</Button>
            </div>
                    <br />
        </div>
    )
}

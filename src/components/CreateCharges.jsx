import React, { useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import service from '../service/tilt.service';
import { toast } from 'react-toastify';
import Popup from "../components/Popup";


export default function CreateCharges({stepper, chargeDetail}) {

    const [isFirstShow, setIsFirstShow] = useState(chargeDetail.isFirstShow);
    const [ChargeDetails, setChargeDetails] = useState({})
    const [CurcibleNo, setCurcibleNo] = useState(chargeDetail.CurcibleNo);
    const [SelectedCurcible, setSelectedCurcible] = useState(chargeDetail.SelectedCurcible)
    const [Station, setStation] = useState(chargeDetail.Station);
    const [LargeCrucible, setLargeCrucible] = useState(chargeDetail.LargeCrucible);
    const [ChargeNO, setChargeNO] = useState(chargeDetail.ChargeNO);
    const [Status, setStatus] = useState(chargeDetail.Status);
    const [isOpen, setIsOpen] = useState(false);
    const [popUpRowData, setPopUpRowData] = useState([]);
    const [popUpChargeNO, setPopUpChargeNO] = useState(0);
    const [popUpWeight, setPopUpWeight] = useState(0);


    /************* 
    * Purpose: Get the details of charge
    *  *************/
    const chargeDetails = async () => {
        const details = await service.chargeDetails();
        console.log('details', details);
        if(!details || details.status !== 200)
        return;
    
        const chargeData = details.data;
        setChargeDetails(chargeData);
        const curcibleNo = chargeData.map((obj) => obj.crucible);
        console.log('curcibleNo', chargeData, curcibleNo);
        setCurcibleNo(curcibleNo);
    }

    /************* 
    * Purpose: call the function when page rendering
    *  *************/
    useEffect(() => {
        chargeDetails();
        return () => { console.log('clear') }
    }, [])

    /************* 
    * Purpose: Use to create the charge
    *  *************/
    const createCharge = async () => {
        console.log('init createCharge');
        if(Station.length < 1 || LargeCrucible.length < 1){
            toast('Please Select Crucible No !')
            return;
        }

        const sendData = {CrucibleNo:SelectedCurcible, Station:Station[0], LargeCrucibleLine:LargeCrucible[0], Status:"TILT_CRUSE"};
        const response = await service.createCharge(sendData);
        console.log('response', response);
        if(!response || response.status !== 200)
        return;

        // const details = data.data;
        const {chargeNo,  chargeStatus} = response.data;
        setChargeNO(`000${chargeNo}`);
        setStatus(chargeStatus);
        // console.log(details)
        setIsFirstShow(!isFirstShow);
    }

    /************* 
    * Purpose: navigate to pot details
    *  *************/
    const onSave =() =>{
        console.log('init onSave');
        const data = { SelectedCurcible, CurcibleNo, Station, LargeCrucible, ChargeNO, Status, isFirstShow:false };
        stepper(1, 'createCharge', data);
    }

    const onBack = () =>{
        setIsFirstShow(!isFirstShow);
    }

    /************* 
    * Purpose: Get the Crucible No. from the selection and set the Station and Large Crucible Line
    *  *************/
    const handleCurcibleNOChange = (e) => {
        const value = e.target.value;
        console.log('value', value);
       const details = ChargeDetails.find((obj) => obj.crucible === value);
       console.log('details', details);
       const { station, largeCrucibleNo } = details;
       setStation([station]);
       setLargeCrucible([largeCrucibleNo]);
       setSelectedCurcible(value);
    }

    /************* 
    * Purpose: declared Column details for the popup model
    *  *************/
    const columnDefs = [
        {
            headerName: "Pot No.",
            maxWidth: 80,
            field: "Pot_No",
            resizable: false,
            filter: false,
            sortable: false
            },
        {
            headerName: "Weight",
            maxWidth: 80,
            field: "weight",
            resizable: false,
            filter: false,
            sortable: false        },
        {
            headerName: "Pot Name",
            maxWidth: 150,
            field: "Pot_name",
            resizable: false,
            filter: false,
            sortable: false        },
        {
            headerName: "SI",
            maxWidth: 80,
            field: "SI",
            resizable: false,
            filter: false,
            sortable: false
        },
        {
            headerName: "FE",
            maxWidth: 60,
            field: 'FE',
            resizable: false,
            filter: false,
            sortable: false
        }
    ]

    /************* 
    * Purpose: Show the popup when user click info icon
    *  *************/
    const popUp = async () => {
        console.log("popUp init")
        setIsOpen(!isOpen);
        const result = await service.GetPotDetailsByChargeNo({ChargeNO:"1901902"});
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
            <p className='step-3'>Step 1</p>
            <p className='charge-to-small-crucibles'>Create charge for Large Crucible</p>

            {/* PART A */}
            { isFirstShow && 
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="" className='total-weight' >Crucible No.</label>
                        <select  onChange={handleCurcibleNOChange} className="form-control text-box-text">
                            <option hidden> Select </option>
                            { 
                                CurcibleNo.map((no) => {
                                    return <option selected={ SelectedCurcible === no ? true : false } value={no}>{no}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="" className='total-weight' >Station</label>
                        <select disabled={Station.length < 1 ? true : false} className="form-control text-box-text">
                        {
                            Station.map((no) => <option value={no}>{no}</option>)
                        }
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="" className='total-weight' >Large Crucible Line</label>
                        <select disabled={LargeCrucible.length < 1 ? true : false} className="form-control text-box-text">
                        {
                            LargeCrucible.map((no) => <option value={no}>{no}</option>)
                        }
                        </select>
                    </div>
                    <div className='col-md-5'>
                        <label htmlFor="" className='total-weight' ></label>
                            <div className='d-flex'>
                            <Button color="secondary" variant="contained" onClick={createCharge}
                            className='get-weight mr-2' >Create Charge</Button>
                            {/* <Button variant="outlined"  >Cancel</Button> */}
                            <Popup columnDefs={columnDefs} 
                            chargeNo={popUpChargeNO}
                            popUpWeight={popUpWeight}
                            rowData={popUpRowData} onClick={()=> popUp()} isOpen={isOpen}/>
                           

                        </div>
                      
                    </div>
                </div>
            </div>
}

            {/* PART B */}
            { !isFirstShow && 
            <div >
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="" className='total-weight' >Crucible No.</label>
                        <input type="text" readOnly={true} value={ SelectedCurcible } className='form-control text-box-text' />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="" className='total-weight' >Station</label>
                        <input type="text" readOnly={true} value={Station} className='form-control text-box-text' />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="" className='total-weight' >Large Crucible Line</label>
                        <input type="text" readOnly={true} value={LargeCrucible} className='form-control text-box-text' />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4">
                        <label htmlFor="" className='total-weight' >Charge No.</label>
                        <input type="text" readOnly={true} value={ChargeNO} className='form-control text-box-text' />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="" className='total-weight' >Status</label>
                        <input type="text" readOnly={true} value={ Status} className='form-control text-box-text' />
                    </div>
                </div>
                <br />
                <div className='text-right'>
                    <Button variant="outlined" className='mx-2' onClick={onBack}>Back</Button>
                    <Button color="secondary" variant="contained" className='get-weight' onClick={onSave} >Save & Continue</Button>
               
               
                </div>
              
            </div>
}




        </div>
    )
}

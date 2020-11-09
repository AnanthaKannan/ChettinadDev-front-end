import React, { useState } from 'react'
import Navbar from "../components/Navbar"
import Stepper from '../components/VerticalLinearStepper'
import TopNavbar from '../components/TopNavbar'
import CreateCharges from "../components/CreateCharges";
import SmallCurcible from '../components/SmallCurcible'
import CloseCharge from '../components/CloseCharge';
import PotDetails from '../components/PotDetails';

// initialize all the states
const initialState = {
    activeStep: 0,
    CreateChargeDetails:{
        SelectedCurcible: '',
        CurcibleNo: [],
        Station: [], LargeCrucible: [], ChargeNO: '', Status: '', isFirstShow: true
    },
    PotDetail:{ SelectedText: '', PotLine: '', rowData: [], selectedRow: [] },
    smallCurcible: { rowData: [], totalWeight:0 },
}

export default function TiltStation() {
    const [activeStep, setActiveStep] = useState(initialState.activeStep);
    const [CreateChargeDetails, setCreateChargeDetails] = useState(initialState.CreateChargeDetails);
    const [PotDetail, setPotDetail] = useState(initialState.PotDetail);
    const [smallCurcible, setsmallCurcible] = useState(initialState.smallCurcible);

    /************* 
    * Purpose: Use to navigate the component depens on pages
    *  *************/
    const stepper = (index, pageName, data) => {
        setActiveStep(index);
        if (pageName === 'createCharge')
            setCreateChargeDetails(data);
        else if (pageName === 'potDetails')
            setPotDetail(data);
        else if (pageName === 'smallCurcible')
            setsmallCurcible(data);
        else if(pageName === 'closeCharge'){
            setActiveStep(initialState.activeStep);
            setCreateChargeDetails(initialState.CreateChargeDetails);
            setPotDetail(initialState.PotDetail);
            setsmallCurcible(initialState.smallCurcible);
        }
            console.log('data', data)
    }

    return (
        <div>
            <TopNavbar />
            <Navbar active='tilt-station' />

            <div className='mx-5'>
                <label className="mt-3 crucibleText">CREATE CHARGE</label>
                <br /> <br />
                <div className="row">
                    <div className="col-md-2">
                        <Stepper
                            steps={['Create Charge', 'Pot Details', 'Small Crucible', 'Close Charge']}
                            activeStep={activeStep}
                        />
                    </div>
                    <div className="col-md-7">
                        {activeStep === 0 && <CreateCharges stepper={stepper} chargeDetail={CreateChargeDetails} />}
                        {activeStep === 1 && <PotDetails stepper={stepper} potDetail={PotDetail} />}
                        {activeStep === 2 && <SmallCurcible stepper={stepper}
                            potDetail={PotDetail}
                            smallCurcible={smallCurcible}
                            createChargeDetails={CreateChargeDetails}
                        />}
                        {activeStep >= 3 && <CloseCharge stepper={stepper}
                            potDetail={PotDetail}
                            smallCurcible={smallCurcible}
                            createChargeDetails={CreateChargeDetails}
                            />}
                    </div>
                </div>
            </div>

        </div>
    )
}

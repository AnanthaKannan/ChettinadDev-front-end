import React from 'react'
import TestComp from '../components/TestComp'
import AgGirdReact from '../reusable/AgGirdReact'
import H1 from '../reusable/H1'
import H2 from '../reusable/H2'
import MiniDrawer from '../reusable/MiniDrawer';
import Typography from '@material-ui/core/Typography';
import IndividualProductChart from '../components/IndividualProductChart'

export default function Dummy() {
    return (
        <div className='container'>
           {/* <MiniDrawer> */}
<IndividualProductChart />
           {/* <Typography variant="h6" className='mb-2'> Product List</Typography>
            <AgGirdReact /> */}
            {/* </MiniDrawer> */}
        </div>
    )
}

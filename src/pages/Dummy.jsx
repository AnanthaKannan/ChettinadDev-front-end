import React from 'react'
import TestComp from '../components/TestComp'
import H1 from '../reusable/H1'
import H2 from '../reusable/H2'
import NavBar from '../reusable/NavBar'


export default function Dummy() {
    return (
        <div>
            <TestComp />
            <H1 text='some data here' />
            <H2 text='h2 data is here' />
            {/* <NavBar/> */}
        </div>
    )
}

import React, { createContext, useReducer } from 'react'
import Dummy from './pages/Dummy'

export const routes = [
    {
        COMPONENT: <Dummy />,
        PATH: '/dummy'
    },
    {
        COMPONENT: <Dummy />,
        PATH: '/'
    }

]
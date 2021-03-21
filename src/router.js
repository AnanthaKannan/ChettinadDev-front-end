import React, { createContext, useReducer } from 'react'
import AddAgentCategory from './pages/AddAgentCategory'
import Dummy from './pages/Dummy'

export const routes = [
    {
        COMPONENT: <Dummy />,
        PATH: '/dummy'
    },
    {
        COMPONENT: <AddAgentCategory />,
        PATH: '/agent-category'
    },
    {
        COMPONENT: <Dummy />,
        PATH: '/'
    }

]
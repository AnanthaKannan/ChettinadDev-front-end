import React, { createContext, useReducer } from 'react'
import AddAgentCategory from './pages/AddAgentCategory'
import Dummy from './pages/Dummy'
import Login from './pages/Login'

export const routes = [
    {
        COMPONENT: <Dummy />,
        PATH: '/dummy'
    },
    {
<<<<<<< HEAD
        COMPONENT: <Login />,
        PATH: '/login'
=======
        COMPONENT: <AddAgentCategory />,
        PATH: '/agent-category'
>>>>>>> 06351d6e8027a12e02a0c00ade0b01ea89ddc502
    },
    {
        COMPONENT: <Dummy />,
        PATH: '/'
    }

]
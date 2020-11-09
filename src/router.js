import React, { createContext, useReducer } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TiltStation from './pages/TiltStation';

export const routes = [
    {
        COMPONENT: <TiltStation />,
        PATH: '/tilt-station'
    },
    {
        COMPONENT: <Dashboard />,
        PATH: '/dashboard'
    },
    {
        COMPONENT: <Login />,
        PATH: '/login'
    }, {
        COMPONENT: <Login />,
        PATH: '/'
    },

]
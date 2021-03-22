import React, { createContext, useReducer } from 'react'
import AddAgentCategory from './pages/AddAgentCategory'
import Dummy from './pages/Dummy'
import IndividualProductDetails from './pages/IndividualProductDetails'
import ProductDetails from './pages/ProductDetails'

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
        COMPONENT: <ProductDetails />,
        PATH: '/product-details'
    },
    {
        COMPONENT: <IndividualProductDetails />,
        PATH: '/individual-product-details'
    },
    {
        COMPONENT: <Dummy />,
        PATH: '/'
    }

]
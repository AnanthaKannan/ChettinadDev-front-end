import React, { createContext, useReducer } from 'react'
import AddAgentCategory from './pages/AddAgentCategory'
import AddProduct from './pages/AddProduct'
import Dummy from './pages/Dummy'
import IndividualProductDetails from './pages/IndividualProductDetails'
import ProductDetails from './pages/ProductDetails'
// import Login from './pages/Login'

export const routes = [
    {
        COMPONENT: <Dummy />,
        PATH: '/dummy'
    },
    {
        COMPONENT: <AddAgentCategory />,
        PATH: '/add-agent-category'
        
    },
    {
        COMPONENT: <AddProduct />,
        PATH: '/add-product'
        
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
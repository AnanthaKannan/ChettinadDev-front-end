import React, { createContext, useReducer } from 'react'
import AddAgentCategory from './pages/AddAgentCategory'
import AddProduct from './pages/AddProduct'
import Carts from './pages/Carts'
import Dummy from './pages/Dummy'
import IndividualProductDetails from './pages/IndividualProductDetails'
import ProductDetails from './pages/ProductDetails'


export const routes = [
    {
        COMPONENT: <Dummy />,
        PATH: '/dummy-page'
    },
    {
        COMPONENT: <Carts />,
        PATH: '/cart'
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
        COMPONENT: <ProductDetails />,
        PATH: '/'
    }

]
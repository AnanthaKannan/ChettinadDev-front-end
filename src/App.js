import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {routes} from './router'
// ag gird css
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-community/dist/styles/ag-theme-balham.css";
// tost css
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
       <ToastContainer />
        <Switch>
        {
          routes.map((route) => {
             return <Route key={route.PATH} path={route.PATH} >
                  { route.COMPONENT }
              </Route>
          })
        }
        </Switch>
    </Router>
  );
}

export default App;

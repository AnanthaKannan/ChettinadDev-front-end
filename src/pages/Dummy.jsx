import React, {useEffect} from 'react'
import { useHistory, useLocation } from "react-router-dom";

export default function Dummy() {
    const location = useLocation();
    const history = useHistory();

    useEffect(() =>{
        console.log('myLocation', location);
        const redirect = location.redirect;
        history.push(redirect);
    },[]);

    return (
        <div>
        </div>
    )
}

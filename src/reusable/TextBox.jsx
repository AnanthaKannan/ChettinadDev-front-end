import React from 'react'

export default function TextBox({onChange, value, className=''}) {

    // const _onChange = (value) =>{
    //     onChange(value);
    // }
    return (
            <input
             className={`form-control ${className}`} 
             value={value} 
             onChange={(e) => onChange(e.target.value)} />
    )
}

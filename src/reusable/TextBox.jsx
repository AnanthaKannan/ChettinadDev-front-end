import React from 'react'

export default function TextBox({onChange, value, className='', id='', name='', readOnly=false, type='text'}) {

    const _onChange = (value) =>{
        try{
        onChange(value);
        }
        catch(e){
            console.log('')
        }
    }
    return (
            <input
            type={type}
            id={id}
            name={name}
             className={`form-control ${className}`} 
             readOnly={readOnly}
             value={value} 
             onChange={(e) => _onChange(e.target.value)} />
    )
}

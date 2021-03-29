import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';



 export function AgGirdButtonUrl({text, onClick, data }) {
    return (
        <>
        { data.vendorUrl && <Button variant="contained" color="primary" onClick={() => {onClick(data.vendorUrl)}}>
        {text}
        </Button>
        }
        </>
    )
}

export function AgGirdButtonEmail({text, onClick, data }) {
    return (
        <>
        { data.vendorEmail && <Button variant="contained" color="primary" onClick={() => {onClick(data.vendorEmail)}}>
        {text}
        </Button>
        }
        </>
    )
}

export function AgGirdTextBoxNumber({onChange,  className='', id='', name='', readOnly=false, type='text', data}) {

    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(data.cartPicked)
    },[])

    const _onChange = (value, _id) =>{
        try{
        // onChange(value, _id);
        setValue(value);
        data.cartPicked = value;
        }
        catch(e){
            console.log('')
        }
    }
    return (
         
            // <h1>{data._id}</h1>
               <input
            type={type}
            id={id}
            value={value}
            name={name}
             className={`form-control ${className}`} 
             readOnly={readOnly}
             onChange={(e) => _onChange(e.target.value)} />
    )
}

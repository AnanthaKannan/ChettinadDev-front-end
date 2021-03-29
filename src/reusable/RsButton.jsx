import React from 'react'
import Button from '@material-ui/core/Button';


export default function RsButton({text, onClick, className='', disabled=false }) {
    return (
        <Button className={`${className}`} disabled={disabled} variant="contained" color="primary" onClick={() => {onClick()}}>
        {text}
        </Button>
    )
}

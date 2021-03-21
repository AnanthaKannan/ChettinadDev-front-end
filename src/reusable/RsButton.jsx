import React from 'react'
import Button from '@material-ui/core/Button';

export default function RsButton({text, onClick, className=''}) {
    return (
        <Button className={`${className}`} variant="contained" color="primary" onClick={() => {onClick()}}>
        {text}
        </Button>
    )
}

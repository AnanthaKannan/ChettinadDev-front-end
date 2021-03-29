import React, {useEffect} from 'react'
import Checkbox from '@material-ui/core/Checkbox'


export default function CheckBoxCellRenderer ({ data }) {
    
    return (

        <React.Fragment>
            <Checkbox
               checked={data.isSelected ? true : false}
               disabled={data.cart}
                color="primary"
            />
        </React.Fragment>

    )

}

 

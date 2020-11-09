import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from  '@material-ui/core/LinearProgress';

 


/** ***
 Purpose:
 The purpose of this function show the card inside the text and progress bar
 Parameter: {
     intiallMessage, color, percentage, text1, text2,
 }
 Return: string
 */
 function CardProgress({ intiallMessage, color, percentage, text1, text2, className}) {
    const BorderLinearProgress = withStyles((theme) => (
        console.log("theme==>", theme),
        {
            root: {
                height: 10,
                borderRadius: 15,
            },
            bar: {
                borderRadius: 5,
                // -webkit-filter: blur(10px),
                // filter: blur(10px);
                backgroundColor: color
            },
        }))(LinearProgress);
    return (
            <div className={`card col crucible-inspection ${className}`}>
                <div className="ml-2 mt-2 mb-2">
                    <label className="mb-0 textIntial" style={{color:color }}>{intiallMessage}</label>
                    <div className="d-flex justify-content-between">
                        <BorderLinearProgress className="col-md-9 mt-2 mb-0" variant="determinate" value={percentage} />
                        <label className="mb-0 mt-1 percent" >{`${percentage}%`}</label>
                    </div>
                    <label  className="mb-0 cardText">{text1}</label>
                    <br/>
                    <label className="mb-0 cardText">{text2}</label>
                </div>
            </div>
    );
}
export default CardProgress
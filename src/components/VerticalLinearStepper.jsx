import React from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {FaCheckCircle} from "react-icons/fa";
import { MdRadioButtonChecked } from "react-icons/md";

const QontoConnector = withStyles({
    alternativeLabel: {
    //   top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: 'red',
        borderWidth: 2,

      },
    },
    completed: {
      '& $line': {
        borderColor: 'red',
        borderWidth: 2
      },
    },
    line: {
      borderColor: '#dee0e9',
      borderTopWidth: 13,
      borderRadius: 1,
    },
  })(StepConnector);


function getSteps() {
  return ['STEP 1', 'STEP 2', 'STEP 3', 'STEP 4'];
}


const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    fontSize: 25,
  },
  active: {
    color: '#ee3b33',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#ee3b33',
    zIndex: 10,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;
  
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <FaCheckCircle className={classes.completed} /> : <MdRadioButtonChecked  />}
    </div>
  );
}

export default function VerticalLinearStepper({steps, activeStep}) {

  // const [activeStep, setActiveStep] = React.useState(2);
  // const steps = getSteps();

  return (
    <div className='vertical-stepper'>
      <Stepper  activeStep={activeStep} orientation="vertical" connector={<QontoConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon} >
              <span className={ activeStep >= index ? 'label-text-enable' : 'label-text' } > {label} </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
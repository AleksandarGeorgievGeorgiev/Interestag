import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#cccce6',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#cccce6',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

const QontoStepIcon = (props) => {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

function getSteps() {
  return ['Event Details', 'Add Interests', 'Create Event'];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepper: {
    backgroundColor: 'transparent',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const QontoStepper = ({ activeStep, stepClicked }) => {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper classes={{ root: classes.stepper }} alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label, index) => (
          <Step key={label} >
            <StepLabel 
              style={{ cursor: 'pointer' }}
              onClick={() => stepClicked(index)}
              StepIconComponent={QontoStepIcon}>
                {label}
              </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export { QontoStepper };

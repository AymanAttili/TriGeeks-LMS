import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Done } from '@mui/icons-material';
import { Grid2 as Grid } from '@mui/material';

const steps = ['User inforamtion', 'Contact information', 'Job information'];

export default function AddUserDialogStepper({ children, activeStep, setActiveStep, isValid, isEdit }) {

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <Grid container flexDirection={'column'} justifyContent={'space-between'} sx={{ minHeight: '70dvh' }} >
            <Grid>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel ></StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {children}
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length ? (
                    <Button key='submit' type='submit' variant='contained' endIcon={<Done />}>
                        {
                            isValid ?
                                isEdit ? 'Save'
                                    : 'Add'
                                : 'Validate'
                        }
                    </Button>
                ) : (
                    <Button key='next' onClick={handleNext} >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                )}
            </Box>
        </Grid>
    )
}
import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import ActionsMenu from '../../ui/ActionsMenu';
import { useDialogs } from '@toolpad/core';
import AddQuestionDialog from './AddQuestionDialog';
import { useQuestionsLocalStorage } from './useQuestionsLocalStorage';

function CreateQuizDialog({ payload, open, onClose }) {
    const [totalMarks, setTotalMarks] = useState(0);
    const { questionsDraft, refetch } = useQuestionsLocalStorage();

    const dialogs = useDialogs();

    useEffect(() => {
        setTotalMarks(() => questionsDraft?.reduce((sum, cur) => sum += cur.points, 0))
    }, [setTotalMarks, questionsDraft])

    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();

    const handleAddQuiz = async (data) => {
        console.log(data);

    }

    const handleAddQuestion = async () => {
        await dialogs.open(AddQuestionDialog);
    }

    const handleEditQuestion = async () => {

    }

    const handleDeleteQuestion = async (index) => {
        const confirm = await dialogs.confirm('Are you sure you want to delete this question?', {
            title: 'Delete question❌',
            okText: 'Yes',
            cancelText: 'No',
            severity: 'error'
        })

        if (confirm) {
            const newQuestions = questionsDraft.filter((item, ind) => ind !== index)
            localStorage.setItem('questionsDraft', JSON.stringify(newQuestions))
            refetch();
        }
    }

    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddQuiz)} fullWidth maxWidth={'lg'} open={open} >
            <Grid container justifyContent={'space-between'} borderBottom={2} borderColor={'primary.main'} marginBottom={2} padding={2}>
                <Button sx={{ visibility: 'hidden' }}>
                    Add questions
                </Button>
                <Typography variant='h4' color='primary.main' fontWeight={600}>
                    {payload.quiz ? 'EDIT ' : 'ADD NEW '}
                    QUIZ
                </Typography>

                <Button variant='contained' onClick={handleAddQuestion}>
                    Add question
                </Button>
            </Grid>
            <Grid container component={DialogContent} sx={{ minHeight: '70vh' }}>
                <Grid container size={3} flexDirection={'column'} flex={1} borderRight={1} borderColor={'primary.main'} paddingRight={3}>

                    <TextField label="Title" margin='normal'
                        // disabled={isLoading}
                        error={!!formErrors.title}
                        helperText={formErrors.title?.message}
                        {...register('title', { required: "Title is required", })}
                        defaultValue={payload.quiz?.title}
                    />
                    <TextField label="Duration" margin='dense'
                        type={'number'}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                            },
                        }}
                        defaultValue={payload.quiz?.durationMinutes || 30}
                        // disabled={isLoading || dispatchingCourse}
                        error={!!formErrors.durationMinutes}
                        helperText={formErrors.durationMinutes?.message}
                        {...register('durationMinutes', {
                            required: "Quiz duration in minutes is required",
                            min: { value: 1, message: "Number of minutes should be more than 0" }
                        })}
                    />

                    <TextField label="Pass mark" margin='dense'
                        type={'number'}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">Points</InputAdornment>,
                            },
                        }}
                        defaultValue={payload.quiz?.passThresholdPoints || 0}
                        // disabled={isLoading || dispatchingCourse}
                        error={!!formErrors.passThresholdPoints}
                        helperText={formErrors.passThresholdPoints?.message}
                        {...register('passThresholdPoints', {
                            required: "Pass mark is required",
                        })}
                    />
                    <TextField label="Total points" margin='dense'
                        type={'number'}
                        disabled
                        value={totalMarks}
                    />

                </Grid>
                <Grid container size={9} flexDirection={'column'} paddingLeft={3} >
                    <TableContainer sx={{ overflow: 'auto', maxHeight: 500 }}>
                        <Table stickyHeader>
                            <TableHead >
                                <TableRow>
                                    <TableCell width={'70%'} sx={{ bgcolor: 'primary.light' }}>
                                        Question
                                    </TableCell>
                                    <TableCell width={'20%'} sx={{ bgcolor: 'primary.light' }}>
                                        Type
                                    </TableCell>
                                    <TableCell sx={{ bgcolor: 'primary.light' }}>
                                        Points
                                    </TableCell>
                                    <TableCell sx={{ bgcolor: 'primary.light' }}>
                                        actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    questionsDraft?.map((question, ind) =>
                                        <TableRow key={ind}>
                                            <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {question.text}
                                            </TableCell>
                                            <TableCell >
                                                {question.type}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {question.points}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <ActionsMenu
                                                    items={[
                                                        {
                                                            title: 'Edit',
                                                            onClick: () => handleEditQuestion(ind)
                                                        },
                                                        {
                                                            title: 'Delete',
                                                            onClick: () => handleDeleteQuestion(ind)
                                                        }
                                                    ]}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <DialogActions>
                <Button color='error' variant='outlined'
                    // disabled={isLoading}
                    onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined'
                    // loading={isLoading} disabled={isLoading} 
                    loadingPosition='end' endIcon={<Add />} >
                    Add
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default CreateQuizDialog
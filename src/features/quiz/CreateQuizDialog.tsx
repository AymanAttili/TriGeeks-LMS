import { Add, Save } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import ActionsMenu from '../../ui/ActionsMenu';
import { useDialogs } from '@toolpad/core';
import AddQuestionDialog from './AddQuestionDialog';
import { useQuestionsDraft, } from './useQuestionsDraft';
import { useDispatchQuestions } from './useDispatchQuestions';
import { useDispatchCourse } from '../courses/useDispatchCourse';
import { toText } from '../../utils/helpers';

function CreateQuizDialog({ payload, open, onClose }) {
    const [totalMarks, setTotalMarks] = useState(0);
    const { questionsDraft } = useQuestionsDraft();
    const { questionsDispatch } = useDispatchQuestions();
    const { courseDispatch, isLoading: dispatchingCourse } = useDispatchCourse()

    const dialogs = useDialogs();

    useEffect(() => {
        setTotalMarks(() => questionsDraft?.reduce((sum, cur) => sum += cur.points, 0))
    }, [setTotalMarks, questionsDraft])

    const { register, handleSubmit, formState: { errors: formErrors, isLoading } } = useForm();

    const handleEditQuiz = async (data) => {
        const questions = questionsDraft?.map((question) => {
            return {
                text: question.text,
                points: question.points,
                file: question.file ? question.file[0] : null,
                choices: question.choices,
                id: question.id
            }
        })

        await courseDispatch({
            action: 'editQuiz', payload:
            {
                data: {
                    title: data.title,
                    materialType: "Exam",
                    exam: {
                        id: payload.data.id,
                        durationMinutes: data.durationMinutes,
                        passThresholdPoints: data.passThresholdPoints,
                        questions
                    }
                },
                sectionId: payload.sectionPart.sectionId,
                sectionPartId: payload.sectionPart.id
            }
        }).then(() => {
            questionsDispatch({ action: 'clear' })
            onClose();
        })
    }


    const handleAddQuiz = async (data) => {
        if (payload.data?.id)
            return handleEditQuiz(data)

        const questions = questionsDraft?.map((question) => {
            return {
                text: question.text,
                points: question.points,
                file: question.file ? question.file[0] : null,
                choices: question.choices
            }
        })

        await courseDispatch({
            action: 'addQuiz', payload:
            {
                data: {
                    title: data.title,
                    materialType: "Exam",
                    exam: {
                        durationMinutes: data.durationMinutes,
                        passThresholdPoints: data.passThresholdPoints,
                        questions
                    }
                },
                sectionId: payload.sectionId
            }
        }).then(() => {
            questionsDispatch({ action: 'clear' })
            onClose();
        })
    }

    const handleDiscard = async () => {
        const confirm = await dialogs.confirm('Are you sure you want to discard this quiz?\n All questions will be deleted permanently.', {
            title: 'Discard quiz❌',
            okText: 'Yes',
            cancelText: 'No',
            severity: 'error'
        })

        if (confirm) {
            questionsDispatch({ action: 'clear' })
            onClose();
        }
    }

    const handleAddQuestion = async () => {
        await dialogs.open(AddQuestionDialog);
    }

    const handleEditQuestion = async (question, index) => {
        await dialogs.open(AddQuestionDialog, { question, index });
    }

    const handleDeleteQuestion = async (index) => {
        const confirm = await dialogs.confirm('Are you sure you want to delete this question?', {
            title: 'Delete question❌',
            okText: 'Yes',
            cancelText: 'No',
            severity: 'error'
        })

        if (confirm) {
            questionsDispatch({ action: 'delete', payload: { index } })
        }
    }


    return (
        <Dialog component='form' onSubmit={handleSubmit(handleAddQuiz)} fullWidth maxWidth={'lg'} open={open} >
            <Grid container justifyContent={'space-between'} borderBottom={2} borderColor={'primary.main'} marginBottom={2} padding={2}>
                <Button sx={{ visibility: 'hidden' }}>
                    Add questions
                </Button>
                <Typography variant='h4' color='primary.main' fontWeight={600}>
                    {payload.sectionPart ? 'EDIT ' : 'ADD NEW '}
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
                        disabled={isLoading || dispatchingCourse}
                        {...register('title', { required: "Title is required", })}
                        defaultValue={payload.sectionPart?.title}
                    />
                    <TextField label="Duration" margin='dense'
                        type={'number'}
                        slotProps={{
                            input: {
                                endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                            },
                        }}
                        defaultValue={payload.data?.durationMinutes || 30}
                        // disabled={isLoading || dispatchingCourse}
                        error={!!formErrors.durationMinutes}
                        helperText={formErrors.durationMinutes?.message}
                        disabled={isLoading || dispatchingCourse}
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
                        defaultValue={payload.data?.passThresholdPoints || 0}
                        disabled={isLoading || dispatchingCourse}
                        error={!!formErrors.passThresholdPoints}
                        helperText={formErrors.passThresholdPoints?.message}
                        {...register('passThresholdPoints', {
                            required: "Pass mark is required",
                            min: { value: 1, message: "Pass mark should be greater than 0" },
                            max: { value: totalMarks, message: "Pass mark shouldn't be greater than Total Marks" }

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
                                                {question.preview || toText(question.text)}
                                            </TableCell>
                                            <TableCell >
                                                {question.choices[0].text === 'False' ? 'True or False' : 'Multiple Choices'}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {question.points}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <ActionsMenu
                                                    items={[
                                                        {
                                                            title: 'Edit',
                                                            onClick: () => handleEditQuestion(question, ind)
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
                    disabled={dispatchingCourse}
                    onClick={handleDiscard}>Discard</Button>
                <LoadingButton type='submit' variant='outlined'
                    loading={isLoading || dispatchingCourse} disabled={isLoading || dispatchingCourse}
                    loadingPosition='end' endIcon={<Save />} >
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default CreateQuizDialog
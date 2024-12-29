import { Add, AddOutlined, Check, CheckBox, CheckOutlined, Delete } from "@mui/icons-material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid2 as Grid, IconButton, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill"

function AddQuestionDialog({ payload, open, onClose }) {
    const [text, setText] = useState('');
    const [questionType, setQuestionType] = useState(0);

    const [answersCount, setAnswersCount] = useState(2)

    const [answers, setAnswers] = useState(['', ''] as any)

    const handleAddQuestion = () => {

    }

    const handleAnswerChange = (e, index) => {
        const val = e.target.value;

        setAnswers((ans) =>
            ans.map((item, ind) => {
                if (ind === index)
                    return val;
                return item;
            }
            ))
    }

    const handleAddAnswer = () => {
        setAnswersCount((c) => c + 1)
        setAnswers((ans) => [...ans, ''])
    }

    const handleDeleteAnswer = (index) => {
        setAnswersCount((c) => c - 1)
        setAnswers((ans) =>
            ans.filter((item, ind) => ind !== index))
    }

    useEffect(() => {
        console.log(answers);

    }, [answers])
    return (
        <Dialog fullWidth maxWidth={'lg'} open={open}
        // onClose={() => onClose()}
        >
            <Grid container justifyContent={'center'} borderBottom={2} borderColor={'primary.main'} padding={2}>
                <Typography variant='h5' color='primary.main' fontWeight={600}>
                    {payload?.question ? 'EDIT ' : 'ADD NEW '}
                    QUESTION
                </Typography>

            </Grid>
            <Grid container component={DialogContent} sx={{ minHeight: '70vh' }}>
                <Grid container size={2} flexDirection={'column'} spacing={2} paddingRight={3} borderRight={1} borderColor={'primary.main'} alignItems={'center'}>
                    <Typography variant="h6">
                        Question type:
                    </Typography>
                    <Button fullWidth variant={questionType === 0 ? 'outlined' : 'text'} onClick={() => setQuestionType(0)}>
                        True or False
                    </Button>
                    <Button fullWidth variant={questionType === 1 ? 'outlined' : 'text'} onClick={() => setQuestionType(1)}>
                        Multiple Choice
                    </Button>
                </Grid>
                <Grid container size={10} flexDirection={'column'} spacing={3} paddingLeft={3} >
                    <Grid container flexDirection={'column'} marginBottom={5} spacing={1} paddingX={2}>
                        <Typography variant="h5" fontWeight={600} color="primary.main">
                            Question text:
                        </Typography>
                        <Grid container minHeight={120} >
                            <ReactQuill theme="snow" value={text} onChange={setText} style={{ width: '100%' }} />
                        </Grid>
                    </Grid>
                    <Grid container flexDirection={'column'} spacing={1} borderTop={1} borderColor={'primary.main'} padding={2} >
                        <Grid container alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant="h5" fontWeight={600} color="primary.main">
                                Answers:
                            </Typography>
                            <Typography >
                                Correct
                            </Typography>
                        </Grid>
                        <RadioGroup defaultValue={0} sx={{ paddingX: 2 }}>
                            {
                                questionType === 1 && [...Array(answersCount)].map((_, index) =>
                                    <Grid container alignItems={''} justifyContent={'space-between'} spacing={0}>
                                        <Grid container alignItems={'center'} spacing={2} size={10}>
                                            <Typography variant="h6" width={24}>
                                                {+index + 1}.
                                            </Typography>
                                            <TextField multiline value={answers[index]} onChange={(e) => handleAnswerChange(e, index)} sx={{ width: '80%' }} />


                                            {
                                                index === 0 &&
                                                <IconButton color="primary" size="small" sx={{ border: 1 }} onClick={handleAddAnswer}>
                                                    <Add />
                                                </IconButton>
                                            }
                                            {
                                                index > 1 &&
                                                <IconButton color="error" size="small" onClick={() => handleDeleteAnswer(index)} >
                                                    <Delete />
                                                </IconButton>
                                            }
                                        </Grid>
                                        <FormControlLabel value={index} control={<Radio size="small" />} label='' />

                                    </Grid>
                                )
                            }
                            {
                                questionType === 0 &&
                                <Grid container flexDirection={'column'} spacing={2}>
                                    <Grid container alignItems={'center'} justifyContent={'space-between'} >
                                        <Typography variant="h6">
                                            True
                                        </Typography>
                                        <FormControlLabel value={1} control={<Radio size="small" />} label='' />
                                    </Grid>
                                    <Grid container alignItems={'center'} justifyContent={'space-between'} >
                                        <Typography variant="h6">
                                            False
                                        </Typography>
                                        <FormControlLabel value={0} control={<Radio size="small" />} label='' />
                                    </Grid>
                                </Grid>
                            }
                        </RadioGroup>
                    </Grid>
                </Grid>

            </Grid>
            <DialogActions>
                <Button color='error' variant='outlined'
                    // disabled={isLoading} 
                    onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined'
                    // loading={isLoading} disabled={isLoading} 
                    loadingPosition='end' endIcon={<Add />}
                    onClick={handleAddQuestion}
                >

                    {payload ? 'Edit' : 'Add'}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuestionDialog
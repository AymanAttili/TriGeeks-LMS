import { Add, Delete, Image, Save } from "@mui/icons-material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Button, Dialog, DialogActions, DialogContent, Divider, FormControlLabel, FormHelperText, Grid2 as Grid, IconButton, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import ReactQuill from "react-quill"
import VisuallyHiddenInput from "../../ui/VisuallyHiddenInput"
import { useDispatchQuestions } from "./useDispatchQuestions"

const extractCorrectAnswer = (choices) => {
    if (!choices)
        return 0;
    console.log(choices);

    let ans = 0;
    choices.map((c, index) => {
        if (c.isCorrect)
            ans = index;
    })

    return ans
}

const extractQuestionType = (choices) => {
    if (!choices)
        return 0;

    return choices[0].text === 'False' ? 0 : 1
}

const extractChoices = (choices) => {
    if (!choices)
        return ['', '']
    return choices.map((c) => c.text)
}

function AddQuestionDialog({ payload, open, onClose }) {//TODO: handle data when editing after the quiz created in DB
    const [errors, setErrors] = useState({});
    const [text, setText] = useState(payload?.question.text || '');
    const [preview, setPreview] = useState(payload?.question.preview || '');
    const [questionType, setQuestionType] = useState(() => extractQuestionType(payload?.question.choices))

    const [image, setImage] = useState(payload?.question?.file || null);

    const [currImage, setCurrImage] = useState(payload?.question?.currImage || payload?.question?.image?.path || '');
    const imagePreview = useRef(null);

    const [answersCount, setAnswersCount] = useState(payload?.question.choices.length || 2)

    const [answers, setAnswers] = useState(() => extractChoices(payload?.question.choices))
    const [correctAnswer, setCorrectAnswer] = useState(() => extractCorrectAnswer(payload?.question.choices));

    const [points, setPoints] = useState(payload?.question.points || 1);

    const { questionsDispatch, isError } = useDispatchQuestions();


    const checkAvailabilty = () => {
        let curErrors = {};
        if (points <= 0)
            curErrors.points = 'Points must be greater than 0.';

        if (text.length === 0)
            curErrors.text = 'Question Text is required.';

        if (correctAnswer > answersCount - 1)
            curErrors.correctAnswer = 'Correct Answer is required';

        if (questionType === 1 && !answers.reduce((pre, ans) => pre && (ans.length > 0), true))
            curErrors.answers = 'All answers must be written.';

        setErrors(curErrors);

        return Object.keys(curErrors).length === 0
    }

    const handleAddQuestion = () => {
        if (!checkAvailabilty())
            return;

        let question = {
            text,
            preview,
            points: Number(points),
            file: image,
            correctAnswer,
            answers,
            currImage,
            id: payload?.question.id || 0,
            choices: answers.map((ans, ind) => {
                return {
                    id: 0,
                    text: ans,
                    isCorrect: ind === correctAnswer
                }
            })
        }


        if (payload)
            questionsDispatch({ action: 'edit', payload: { data: question, index: payload.index } })

        else
            questionsDispatch({ action: 'add', payload: { data: [question] } })

        if (!isError)
            onClose();
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
        if (correctAnswer === index)
            setCorrectAnswer(0);

        setAnswersCount((c) => c - 1)
        setAnswers((ans) =>
            ans.filter((item, ind) => ind !== index))
    }

    const handleFileChange = (event) => {
        setImage(event.target.files)
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCurrImage(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(file); // Read file as Data URL
        }
    };

    useEffect(() => {
        if (questionType === 0) {
            setAnswers(['False', 'True'])
            setAnswersCount(2)
        }
        else {
            setAnswersCount(payload?.question.choices.length || 2)
            setAnswers(extractChoices(payload?.question.choices))
        }
    }, [questionType, payload, setAnswers])

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
                    <Grid container flexDirection={'column'} alignItems={'center'} paddingBottom={5} borderBottom={1} spacing={3} size={12}>
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
                    <TextField type="number" label='question Points' value={points} onChange={(e) => setPoints(e.target.value)} />
                    {
                        errors.points &&
                        <FormHelperText sx={{ color: 'red', margin: 0 }}>
                            {errors.points}
                        </FormHelperText>
                    }

                </Grid>
                <Grid container size={10} flexDirection={'column'} spacing={3} paddingLeft={3} >
                    <Grid container>
                        <Grid container flexDirection={'column'} size={9} spacing={1} paddingX={2}>
                            <Typography variant="h5" fontWeight={600} color="primary.main">
                                Question text:
                            </Typography>
                            <Grid container minHeight={120} marginBottom={5}>
                                <ReactQuill theme="snow" value={text} onChange={(value, delta, source, editor) => {
                                    setPreview(editor.getText())
                                    setText(editor.getHTML())
                                }} style={{ width: '100%' }} />
                            </Grid>
                            {
                                errors.text &&
                                <FormHelperText sx={{ color: 'red', margin: 0 }}>
                                    {errors.text}
                                </FormHelperText>
                            }
                        </Grid>

                        <Grid container flexDirection={'column'} size={2}>
                            <img width={200} ref={imagePreview} src={currImage} />
                            <Button
                                component="label"
                                variant="outlined"
                                tabIndex={-1}
                            >
                                Upload image
                                <VisuallyHiddenInput
                                    type="file"
                                    accept=".png, .jpg"
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container flexDirection={'column'} spacing={1} borderTop={1} borderColor={'primary.main'} padding={2} >
                        <Grid container alignItems={'center'} justifyContent={'space-between'}>
                            <Grid container flexDirection={'column'}>
                                <Typography variant="h5" fontWeight={600} color="primary.main">
                                    Answers:
                                </Typography>
                                {
                                    errors.answers &&
                                    <FormHelperText sx={{ color: 'red', margin: 0 }}>
                                        {errors.answers}
                                    </FormHelperText>
                                }
                            </Grid>
                            <Grid container flexDirection={'column'}>
                                <Typography >
                                    Correct
                                </Typography>
                                {
                                    errors.correctAnswer &&
                                    <FormHelperText sx={{ color: 'red', margin: 0 }}>
                                        {errors.correctAnswer}
                                    </FormHelperText>
                                }
                            </Grid>

                        </Grid>
                        <Grid container flexDirection={'column'} component={RadioGroup} defaultValue={0} size={12} spacing={2} sx={{ paddingX: 2 }}>
                            {
                                [...Array(answersCount)].map((_, index) =>
                                    <Grid container alignItems={''} justifyContent={'space-between'} spacing={0} key={index}>
                                        <Grid container alignItems={'center'} spacing={2} size={10}>
                                            <Typography variant="h6" width={24}>
                                                {+index + 1}.
                                            </Typography>
                                            <TextField multiline value={answers[index]} disabled={questionType === 0} onChange={(e) => handleAnswerChange(e, index)} sx={{ width: '80%' }} />


                                            {
                                                index === 0 &&
                                                <IconButton color="primary" size="small" sx={{ border: 1, visibility: questionType === 0 ? 'hidden' : 'unset' }} onClick={handleAddAnswer}>
                                                    <Add />
                                                </IconButton>
                                            }
                                            {
                                                (index > 1 || (index === 1 && answersCount > 2)) &&
                                                <IconButton color="error" size="small" onClick={() => handleDeleteAnswer(index)} >
                                                    <Delete />
                                                </IconButton>
                                            }

                                        </Grid>
                                        <FormControlLabel value={index} checked={correctAnswer === index} control={<Radio size="small" />} label='' onChange={() => setCorrectAnswer(index)} sx={{ width: 24 }} />

                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            <DialogActions>
                <Button color='error' variant='outlined'
                    // disabled={isLoading} 
                    onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined'
                    // loading={isLoading} disabled={isLoading} 
                    loadingPosition='end' endIcon={<Save />}
                    onClick={handleAddQuestion}
                >
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuestionDialog
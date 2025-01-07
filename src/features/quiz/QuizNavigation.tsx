import React, { useState } from "react";
import { Button, Grid2 } from "@mui/material";

interface QuizItem {
    id: number;
    completed: boolean;
}

const QuizNavigation: React.FC = ({ handleSubmit, questions, handleSelectQuestion, questionIndex }) => {
    const handleSelect = (index: number) => {
        handleSelectQuestion(index)
    };

    return (
        <Grid2
            container

            // padding={1}
            spacing={1}
            width={"fit-content"}
        // sx={{ border: "3px solid red" }} not that good
        >
            {questions?.map((item, index) => (
                <Grid2 size={2}>
                    <Button
                        key={item.id}
                        size="small"
                        variant={index === questionIndex || item.isAnswered ? "contained" : "outlined"}
                        color={item.isAnswered && index !== questionIndex ? 'success' : 'primary'}
                        sx={{
                            minWidth: 40
                        }}
                        onClick={() => handleSelect(index)}
                    >
                        {+index + 1}
                    </Button>
                </Grid2>
            ))}
            <Button
                sx={{
                    mt: 1
                }}
                variant="text"
                fullWidth
                onClick={handleSubmit}
            >
                Finish attempt ...
            </Button>
        </Grid2>
    );
};

export default QuizNavigation;
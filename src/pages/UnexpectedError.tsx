import React from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const UnexpectedError = ({
    error = {},
    resetErrorBoundary,
}) => {
    return (
        <Stack gap={2} sx={{
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Typography variant="h4" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <ErrorOutlineIcon fontSize={"large"} sx={{ m: 10 }} /> Unexpected
                Error
            </Typography>
            <Button
                onClick={resetErrorBoundary}
                variant="contained"
                color="warning"
            >
                Try again
            </Button>
        </Stack >
    );
};

export default UnexpectedError;
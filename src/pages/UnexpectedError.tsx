import React from 'react';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const UnexpectedError = ({
    error = {},
    resetErrorBoundary,
}) => {
    if (isProduction)
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

    return (
        <Stack gap={2} role="alert" sx={{
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Typography variant="h4" fontWeight={500}>
                Unexpected Error: {error?.message ?? JSON.stringify(error)}
            </Typography>
            <Typography sx={{
                fontSize: "1.2rem",
                overflow: "auto",
            }}>{error?.message}</Typography>
            <Typography sx={{
                fontSize: "1.2rem",
                overflow: "auto",
                padding: "15px",
                border: "2px solid lightgrey",
                borderRadius: "4px"
            }}>{error?.stack}</Typography>
            <Stack direction="row" sx={{ justifyContent: "center" }}>
                <Button
                    onClick={resetErrorBoundary}
                    fullWidth={false}
                    variant="contained"
                    color="warning"
                >
                    Try again
                </Button>
            </Stack>
        </Stack >
    );
};

export default UnexpectedError;
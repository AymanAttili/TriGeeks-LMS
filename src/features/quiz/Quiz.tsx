import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Grid2,
} from "@mui/material";
import { useParams } from "react-router-dom";

const Quiz: React.FC = () => {
  const { quizId } = useParams();
  const [timeLeft, setTimeLeft] = useState(300); // todo bring time from API

  useEffect(() => {
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer as ReturnType<typeof setInterval>);
  }, [timeLeft]);

  const handleSubmit = () => {
    // todo result page
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid2
        container
        spacing={2}
        direction="column"
        sx={{ boxShadow: 4, p: 5, borderRadius: 2 }}
      >
        <Grid2 container xs={12} justifyContent="flex-end">
          <Typography
            variant="body2"
            sx={{
              border: 1,
              borderColor: "primary.main",
              color: "primary.main",
              borderRadius: 1,
              p: 1,
              textAlign: "right",
              width: "fit-content",
            }}
          >
            Time left: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </Typography>
        </Grid2>
        <Grid2>
          <Typography variant="h5" gutterBottom>
            Question 1
          </Typography>
          <Typography variant="body1" gutterBottom>
            It is possible to get a Liberal Arts degree from Berkshire Community
            College in two years.
          </Typography>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Select one:</FormLabel>
            <RadioGroup
              aria-label="degree"
              defaultValue="true"
              name="radio-buttons-group"
            >
              <FormControlLabel value="true" control={<Radio />} label="True" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
        </Grid2>
        <Grid2 item xs={12} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Next page
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Quiz;

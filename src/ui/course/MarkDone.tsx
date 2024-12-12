import { Button } from "@mui/material";
import React from "react";

const MarkDone: React.FC = () => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "##3ba3a0d8",
        color: "primary",
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: 5,
        "&:hover": {
          backgroundColor: "#016c6cd2",
        },
      }}
    >
      Mark as done
    </Button>
  );
};

export default MarkDone;

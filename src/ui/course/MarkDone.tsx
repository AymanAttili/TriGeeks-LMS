import { Done } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
interface MarkDoneAttributes {
  done: boolean
}

const MarkDone: React.FC<MarkDoneAttributes> = ({ done = false }) => {
  // const { course } = useCourse();

  // const toggleSectionPartDone
  return (
    <Button
      variant={"outlined"}
      color={done ? 'primary' : 'inherit'}
      startIcon={done ? <Done /> : ''}
      size={'small'}
      sx={{
        borderRadius: 5,
        border: 2
      }}

    // onClick={toggleSectionPartDone}
    >
      {!done && 'Mark as '}
      Done
    </Button>
  );
};

export default MarkDone;

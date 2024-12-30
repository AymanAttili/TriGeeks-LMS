import { Done } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useDispatchCourse } from "../../features/courses/useDispatchCourse";
interface MarkDoneAttributes {
  done: boolean,
  sectionId: number,
  sectionPartId: number
}

const MarkDone: React.FC<MarkDoneAttributes> = ({ done = false, sectionId, sectionPartId }) => {
  const { courseDispatch, isLoading } = useDispatchCourse();

  const toggleDone = async () => {
    await courseDispatch({ action: 'toggleSectionPartStatus', payload: { sectionId, sectionPartId } })
  }

  return (
    <Button
      variant={"outlined"}
      disabled={isLoading}
      color={done ? 'primary' : 'inherit'}
      startIcon={done ? <Done /> : ''}
      size={'small'}
      sx={{
        borderRadius: 5,
        border: 2
      }}

      onClick={toggleDone}
    >
      {!done && 'Mark as '}
      Done
    </Button>
  );
};

export default MarkDone;

import { Done } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import React from "react";
import { useDispatchCourse } from "../../features/courses/useDispatchCourse";
interface MarkDoneAttributes {
  status: 1 | 2 | 3,
  sectionId: number,
  sectionPartId: number
}

const MarkDone: React.FC<MarkDoneAttributes> = ({ status = 1, sectionId, sectionPartId }) => {
  const { courseDispatch, isLoading } = useDispatchCourse();

  const toggleDone = async () => {
    await courseDispatch({ action: 'changeSectionPartStatus', payload: { sectionId, sectionPartId, status: status === 2 ? 3 : 2 } })
  }

  return (
    <Button
      variant={"outlined"}
      disabled={isLoading || status === 1}
      color={status === 3 ? 'primary' : 'inherit'}
      startIcon={status === 3 ? <Done /> : ''}
      size={'small'}
      sx={{
        borderRadius: 5,
        border: 2
      }}

      onClick={toggleDone}
    >
      {status !== 3 && 'Mark as '}
      Done
    </Button>
  );
};

export default MarkDone;

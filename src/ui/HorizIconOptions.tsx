import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState, MouseEvent } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface HorizIconOptions {
  // Define props here
}

const HorizIconOptions: React.FC<HorizIconOptions> = ({ }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleClick} aria-label="more options">
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        id="course-menu"
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "more-options-button",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: -1,
              ml: -1,
              "&::before": {
                content: "''",
                display: "block",
                position: "absolute",
                top: 0,
                right: 14, // Position arrow
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Start Learning</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Star this course</MenuItem>
      </Menu>
    </div>
  );
};

export default HorizIconOptions;

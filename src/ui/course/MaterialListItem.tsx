import React from "react";
import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import MarkDone from "./MarkDone";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";
interface MaterialListItemProps {
  isLink: boolean;
  isFile: boolean;
}

const MaterialListItem: React.FC<MaterialListItemProps> = ({
  isLink,
  isFile,
}) => {
  return (
    <ListItem
      divider
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ListItemIcon
          sx={{
            backgroundColor: `${isLink ? "#027e7b" : ""}`,
            minWidth: "fit-content",
            mr: 1,
            borderRadius: 1,
            padding: 0.2,
          }}
        >
          {isLink && <LinkIcon sx={{ color: "#ffffff" }} />}
          {isFile && <DescriptionIcon sx={{ color: "#FFA726" }} />}
        </ListItemIcon>
        {/* {use link here} */}
        <ListItemText primary="Link x bla bla bla" />
      </Box>
      <MarkDone />
    </ListItem>
  );
};
export default MaterialListItem;

import React from 'react';
import { SvgIcon } from "@mui/material";
const PalestineFlagIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 16">
      <rect width="24" height="16" fill="#007A33" />
      <rect width="24" height="10.67" fill="#ffffff" />
      <rect width="24" height="5.33" fill="#000000" />
      <polygon points="0,0 0,16 9.67,8" fill="#E4002B" />
    </SvgIcon>
  );
};
export default PalestineFlagIcon;

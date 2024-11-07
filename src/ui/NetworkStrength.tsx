import React from 'react';
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import PropTypes from "prop-types";

const NetworkStrength = ({ strength }) => {
  let SignalIcon;

  switch (strength) {
    case "Basic":
      SignalIcon = SignalCellular1BarIcon;
      break;
    case "Intermdiate":
      SignalIcon = SignalCellular2BarIcon;
      break;
    case "Advanced":
      SignalIcon = SignalCellular3BarIcon;
      break;
    default:
      SignalIcon = SignalCellular1BarIcon;
  }

  return <SignalIcon style={{ color: "primary.main", fontSize: 20 }} />;
};

export default NetworkStrength;
NetworkStrength.propTypes = {
  strength: PropTypes.shape("").isRequired,
};

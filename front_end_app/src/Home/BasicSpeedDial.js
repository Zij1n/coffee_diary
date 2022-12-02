import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useNavigate } from "react-router-dom";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import CreateIcon from "@mui/icons-material/Create";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GetAppIcon from "@mui/icons-material/GetApp";

export default function BasicSpeedDial() {
  const navigate = useNavigate();
  const actions = [
    { icon: <CreateIcon />, name: "Create",handleClick: () => navigate("/create")},
    { icon: <GetAppIcon />, name: "import" ,handleClick: () => navigate("/Import")},
  ];

  return (
    // <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      direction="up"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.handleClick}
        />
      ))}
    </SpeedDial>
    // </Box>
  );
}

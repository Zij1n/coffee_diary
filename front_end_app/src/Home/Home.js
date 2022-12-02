import React from "react";
import Recipes from "./Recipes";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import History from "./History";
import BasicSpeedDial from "./BasicSpeedDial";
export default function Home() {


  const navigate = useNavigate();
  return (
    <div>
       <Typography variant="h5" gutterBottom>
        Your Recipes:
      </Typography>
      <Recipes />
      <BasicSpeedDial />
      {/* <Fab color="primary" aria-label="add" onClick={() => navigate("/create")}>
        <AddIcon />
      </Fab> */}
      <Typography variant="h5" gutterBottom>
        Brew History:
      </Typography>
      <History />
    </div>
  );
}

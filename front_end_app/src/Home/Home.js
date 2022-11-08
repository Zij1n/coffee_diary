import React from "react";
import Recipes from "./Recipes";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();
  return (
    <div>
      <Recipes />
      <Fab color="primary" aria-label="add" onClick={()=>navigate("/create")}>
        <AddIcon />
      </Fab>
    </div>
  );
}

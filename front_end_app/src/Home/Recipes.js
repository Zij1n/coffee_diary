import React from "react";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Steps from "../Create/Steps";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

const RECIPE_URL = "/recipes";

export default  function Recipes() {
  const navigate = useNavigate()
 
  const [recipes, setrecipes] = useState([]);

  const loadRecipe = () => {
    fetch(RECIPE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setrecipes(data)).catch(err => console.log(err));
  };
  useEffect(loadRecipe, []);
  console.log(recipes);

  return recipes.map((recipe, i) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {i + 1}: {recipe.brewEquip} {recipe.bean}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Steps steps={recipe.tasks.tasks} />
          <Button variant="contained" onClick={() => navigate("/Brew",{ state: { recipe:recipe} })}>Brew</Button>
        </AccordionDetails>
      </Accordion>
    );
  });
}

import React from "react";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Steps from "../Create/Steps";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";

const RECIPE_URL = "/recipes";

export default function Recipes() {
  const navigate = useNavigate();

  const [recipes, setrecipes] = useState([]);

  const loadRecipe = () => {
    fetch(RECIPE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setrecipes(data))
      .catch((err) => console.log(err));
  };
  useEffect(loadRecipe, []);
  console.log(recipes);

  const handleExport = (recipe) => {
    let str=btoa(
      JSON.stringify({
        brewEquip: recipe.brewEquip,
        bean: recipe.bean,
        tasks: recipe.tasks.tasks.map((each) => {
          return { time: each.time, description: each.description };
        }),
      })
    );
    prompt("Exported text:", str);
    navigator.clipboard.writeText(
      btoa(
        JSON.stringify({
          brewEquip: recipe.brewEquip,
          bean: recipe.bean,
          tasks: recipe.tasks.tasks.map((each) => {
            return { time: each.time, description: each.description };
          }),
        })
      )
    );
    alert("Exported to clipboard!");
  };

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
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/Brew", { state: { recipe: recipe } })}
            >
              Brew Now!
            </Button>
            <Button variant="contained" onClick={() => handleExport(recipe)}>
              Export
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  });
}
// {"brewEquip":"123","bean":"123","tasks":[{"description":"123","time":"123"}]}

// {"_id":"637c5218403222c1facee48c","tasks":{"_id":"637c5218403222c1facee489","tasks":[{"time":123,"description":"123","_id":"637c5218403222c1facee48a"}],"__v":0},"bean":"123","brewEquip":"123","__v":0}

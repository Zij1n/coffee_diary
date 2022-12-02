import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import MyTimer from "./MyTimer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// {
//   "_id": "636a3f008b8fa1b1f3e69926",
//   "tasks": {
//     "_id": "636a3f008b8fa1b1f3e6991e",
//     "tasks": [
//       {
//         "time": 5,
//         "description": "Rinse the filter with hot water",
//         "_id": "636a3f008b8fa1b1f3e6991f"
//       },
//       {
//         "time": 0,
//         "description": "add 30g of coffee bean",
//         "_id": "636a3f008b8fa1b1f3e69920"
//       },
//       {
//         "time": 10,
//         "description": "add 100g of 95 Celsius hot water in the middle",
//         "_id": "636a3f008b8fa1b1f3e69921"
//       },
//       { "time": 20, "description": "wait", "_id": "636a3f008b8fa1b1f3e69922" },
//       {
//         "time": 20,
//         "description": "add 200g of 95 Celsius hot water ",
//         "_id": "636a3f008b8fa1b1f3e69923"
//       },
//       {
//         "time": 0,
//         "description": "add 50g of water into brewed coffee",
//         "_id": "636a3f008b8fa1b1f3e69924"
//       }
//     ],
//     "__v": 0
//   },
//   "bean": "Ethiopia Light Roasted",
//   "brewEquip": "Chemex",
//   "__v": 0
// }

export default function BrewIns({ recipe }) {
  const [disable, setdisable] = useState(false);
  const [i, seti] = useState(0);
  let tasks = [...recipe.tasks.tasks];
  const [curStep, setcurStep] = useState(tasks[0]);
  useEffect(() => {
    console.log(i);
    if (i < tasks.length) {
      setcurStep(tasks[i]);
      // console.log(i);
    } else {
      setcurStep({ time: 0, description: "Finished" });
      setdisable(true);
      // console.log(curStep);
    }
  }, [i]);

  const feedNextStep = () => {
    seti(i + 1);
  };
  let probs = {
    time: curStep.time,
    step: curStep.description,
    expirecb: feedNextStep,
  };
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <MyTimer probs={probs} />
        </CardContent>
        <CardActions>
          <Button
            variant="text"
            size="small"
            onClick={feedNextStep}
            disabled={disable}
          >
            Next Step
          </Button>
        </CardActions>
      </Card>

      {/* <Button
        variant="contained"
        onClick={() => navigate("/Brew", { state: { recipe: recipe } })}
      >
        Brew
      </Button> */}
    </div>
  );
}

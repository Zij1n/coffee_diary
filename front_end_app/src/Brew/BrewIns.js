import React from "react";
import { Button } from "@mui/material";

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
  return (
    <div>
      <h4>
        Here should play some animation for brewing coffee instructions, which
        is still working in progress. For now, just hit the finsh brewing button
        to submit your reflection/feed back of this brew using the text field
        below, and they will go into my backend db
      </h4>
      {/* <Button
        variant="contained"
        onClick={() => navigate("/Brew", { state: { recipe: recipe } })}
      >
        Brew
      </Button> */}
    </div>
  );
}

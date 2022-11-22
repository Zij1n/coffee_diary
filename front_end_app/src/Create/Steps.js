import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
export default function Steps({ steps }) {
  // console.log("steps:", steps);
  return steps.map((step, i) => {
    return (
      <Card sx={{ mt: 1 }}>
        <CardContent>
          Step{i + 1}: {step.description}, {step.time} seconds
        </CardContent>
      </Card>
    );
  });
}

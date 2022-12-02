import React, { useRef } from "react";
import { TextField,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const CREATE_URL = "/create";
export default function Import() {
  const ref = useRef();
  const navigate=useNavigate()
  const handleImport=async()=>{
    console.log("ref:",ref.current.value)
    const json_str=atob(ref.current.value)
    await fetch(CREATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json_str,
      }).catch((error) => {
        window.alert(error);
        return;
      });
    navigate("/")
  }
  return (
    <div>
      {" "}
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="paste the code here"
        multiline
        rows={4}
        inputRef={ref}
        defaultValue="eyJicmV3RXF1aXAiOiJBZXJvUHJlc3MiLCJiZWFuIjoiRXRoaW9waWEgRGFyayBSb2FzdGVkIiwidGFza3MiOlt7InRpbWUiOjAsImRlc2NyaXB0aW9uIjoiYWRkIDIwZyBvZiBncmluZGVkIGNvZmZlZSJ9LHsidGltZSI6MjAsImRlc2NyaXB0aW9uIjoiYWRkIDIwMGcgb2YgOTQgQ2VsaXVzIHdhdGVyIn0seyJ0aW1lIjoyNSwiZGVzY3JpcHRpb24iOiJ3YWl0In0seyJ0aW1lIjoyMCwiZGVzY3JpcHRpb24iOiJwcmVzcyAifV19"
      />
      <Button variant="contained" onClick={handleImport}>
        Import
      </Button>
    </div>
  );
}

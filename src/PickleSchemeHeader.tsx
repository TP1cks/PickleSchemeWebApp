import {Box, Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {InterpreterViewType} from "./InterpreterView";

export interface PickleSchemeHeaderProps {

}

export function PickleSchemeHeader(props: PickleSchemeHeaderProps) {
  return <Box sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center", maxHeight: "15%"}}>
    <Typography variant={"h2"}>Pickle's Scheme</Typography>
    <FormControl sx={{minWidth: "15vw"}} color={"secondary"}>
      <InputLabel id={"interpreter-view-mode-label"}>Interpreter View Mode</InputLabel>
      <Select
        label="Interpreter View Mode"
        labelId={"interpreter-view-mode-label"}
        defaultValue={InterpreterViewType.EDITOR}
      >
        <MenuItem value={InterpreterViewType.EDITOR}>Editor</MenuItem>
        <MenuItem value={InterpreterViewType.REPL}>Read Evaluate Print Loop (REPL)</MenuItem>
      </Select>
    </FormControl>
    <ButtonGroup variant={"contained"} color={"secondary"}>
      <Button>Snippets</Button>
      <Button>Reset</Button>
      <Button>Info</Button>
    </ButtonGroup>
  </Box>
}
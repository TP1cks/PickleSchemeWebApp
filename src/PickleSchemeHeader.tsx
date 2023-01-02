import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { InterpreterViewType } from "./InterpreterView";

export interface PickleSchemeHeaderProps {
  onInfoClicked: () => void;
  onResetClicked: () => void;
  onSnippetsClicked: () => void;
  onInterpreterViewTypeSelected: (type: InterpreterViewType) => void;
}

export function PickleSchemeHeader(props: PickleSchemeHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        maxHeight: "15%",
      }}
    >
      <Typography variant={"h2"}>Pickle's Scheme</Typography>
      <FormControl sx={{ minWidth: "15vw" }} color={"secondary"}>
        <InputLabel id={"interpreter-view-mode-label"}>
          Interpreter View Mode
        </InputLabel>
        <Select
          label="Interpreter View Mode"
          labelId={"interpreter-view-mode-label"}
          defaultValue={InterpreterViewType.EDITOR}
          onChange={(event) =>
            // @ts-ignore
            props.onInterpreterViewTypeSelected(event.target.value)
          }
        >
          <MenuItem value={InterpreterViewType.EDITOR}>Editor</MenuItem>
          <MenuItem value={InterpreterViewType.REPL}>
            Read Evaluate Print Loop (REPL)
          </MenuItem>
        </Select>
      </FormControl>
      <ButtonGroup variant={"contained"} color={"secondary"}>
        <Button onClick={props.onSnippetsClicked}>Snippets</Button>
        <Button onClick={props.onResetClicked}>Reset</Button>
        <Button onClick={props.onInfoClicked}>Info</Button>
      </ButtonGroup>
    </Box>
  );
}

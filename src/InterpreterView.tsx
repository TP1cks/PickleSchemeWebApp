import { Box } from "@mui/material";
import { InterpreterEditorView } from "./InterpreterEditorView";
import { InterpreterReplView } from "./InterpreterReplView";

export enum InterpreterViewType {
  EDITOR,
  REPL,
}

export interface PickleSchemeInterpreterViewProps {
  viewType: InterpreterViewType;
  reset: boolean;
}

export function InterpreterView(props: PickleSchemeInterpreterViewProps) {
  return (
    <Box sx={{ padding: "10px" }}>
      {props.viewType === InterpreterViewType.EDITOR ? (
        <InterpreterEditorView reset={props.reset} />
      ) : (
        <InterpreterReplView />
      )}
    </Box>
  );
}

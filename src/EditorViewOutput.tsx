import { Box, Typography } from "@mui/material";

export interface EditorViewOutputProps {
  outputValue?: string;
}

export function EditorViewOutput(props: EditorViewOutputProps) {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant={"h5"} sx={{ padding: "5px", textAlign: "center" }}>
        Output
      </Typography>
      <textarea
        style={{ backgroundColor: "#1e1e1e", color: "#fff", resize: "none" }}
        readOnly={true}
        value={props.outputValue}
        rows={15}
      ></textarea>
    </Box>
  );
}

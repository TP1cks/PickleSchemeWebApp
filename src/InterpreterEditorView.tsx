import Editor from "@monaco-editor/react";
import {Box, Button, Typography} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {EditorViewOutput} from "./EditorViewOutput";
import {PickleScheme} from "./interpreter/pickle-scheme";


export interface InterpreterViewEditorProps {
  reset: boolean;
}

export function InterpreterEditorView(props: InterpreterViewEditorProps) {
  const [editorViewOutputValue, setEditorViewOutputValue] = useState<string>("");
  const [pickleScheme, setPickleScheme] = useState<PickleScheme | undefined>(undefined);
  const [editorInput, setEditorInput] = useState<string | undefined>(undefined);

  const appendEditorViewOutputValue = useCallback((outputValue: any) => {
    const outputAsString = outputValue.toString();
    setEditorViewOutputValue((prevState) => {
      return prevState !== "" ? prevState.concat("\n").concat(outputAsString) : outputAsString;
    });
  }, []);

  useEffect(() => {
    if (props.reset) {
      setEditorInput(undefined);
      setEditorViewOutputValue("");
    }
    if (pickleScheme === undefined) {
      setPickleScheme(new PickleScheme(appendEditorViewOutputValue));
    }
  }, [appendEditorViewOutputValue, pickleScheme, props]);

  const onRunClicked = () => {
    setEditorViewOutputValue("");
    if (editorInput) {
      try {
        const result = pickleScheme?.run(editorInput);
        if (result) {
          appendEditorViewOutputValue(result);
        }
      } catch (e) {
       appendEditorViewOutputValue(e);
      }

    }
  };



  return (
    <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
      <Box display={"flex"}>
        <Editor
          theme={"vs-dark"}
          height={"50vh"}
          options={{fontSize: 14}}
          value={editorInput}
          onChange={(value) => setEditorInput(value)}
        />
        <Button color={"secondary"} variant={"contained"} onClick={onRunClicked}>Run</Button>
      </Box>
      <EditorViewOutput outputValue={editorViewOutputValue}/>
    </Box>

  )
}
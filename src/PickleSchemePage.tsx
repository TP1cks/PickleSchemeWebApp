import {PickleSchemeHeader} from './PickleSchemeHeader';
import {Divider, Drawer} from "@mui/material";
import React, {useEffect, useState} from 'react';
import {InterpreterView, InterpreterViewType} from "./InterpreterView";
import {PickleSchemeInfo} from "./PickleSchemeInfo";
import {PickleSchemeSnippets} from "./PickleSchemeSnippets";

export interface PickleSchemePageProps {

}

export function PickleSchemePage(props: PickleSchemePageProps) {
  const [interpreterViewType, setInterpreterViewType] = useState<InterpreterViewType>(InterpreterViewType.EDITOR);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState<boolean>(false);
  const [snippetsDrawerOpen, setSnippetsDrawerOpen] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const onInfoClicked = () => {
    setInfoDrawerOpen(true);
  };

  const onSnippetsClicked = () => {
    setSnippetsDrawerOpen(true);
  }

  const onResetClicked = () => {
    setReset(true);
  };

  const onInterpreterViewTypeSelect = (type: InterpreterViewType) => {
    setInterpreterViewType(type);
  }

  return (
    <React.Fragment>
      <PickleSchemeHeader
        onSnippetsClicked={onSnippetsClicked}
        onInfoClicked={onInfoClicked}
        onResetClicked={onResetClicked}
        onInterpreterViewTypeSelected={onInterpreterViewTypeSelect}
      />
      <Divider/>
      <InterpreterView viewType={interpreterViewType} reset={reset}/>
      <Drawer
        open={infoDrawerOpen}
        anchor={"right"}
        onClose={() => setInfoDrawerOpen(false)}
        PaperProps={{ sx: { maxWidth: "80%", minWidth: "80%" } }}
      >
        <PickleSchemeInfo></PickleSchemeInfo>
      </Drawer>
      <Drawer
        open={snippetsDrawerOpen}
        anchor={"bottom"}
        onClose={() => setSnippetsDrawerOpen(false)}
        PaperProps={{sx: {maxHeight: "60vh"}}}
      >
        <PickleSchemeSnippets/>
      </Drawer>
    </React.Fragment>

  )
}
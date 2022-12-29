import {PickleSchemeHeader} from './PickleSchemeHeader';
import {Divider} from "@mui/material";
import React from 'react';
import {InterpreterView, InterpreterViewType} from "./InterpreterView";

export interface PickleSchemePageProps {

}

export function PickleSchemePage(props: PickleSchemePageProps) {
  return (
    <React.Fragment>
      <PickleSchemeHeader/>
      <Divider/>
      <InterpreterView viewType={InterpreterViewType.EDITOR}/>
    </React.Fragment>

  )
}
export interface EditorViewOutputProps {
  outputValue?: string
}

export function EditorViewOutput(props: EditorViewOutputProps) {

  return (
    <textarea
      style={{backgroundColor: "#1e1e1e", color: "#fff", resize: "none"}}
      readOnly={true}
      value={props.outputValue}
      rows={15}
    >
    </textarea>
  )
}
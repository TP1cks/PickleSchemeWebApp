import {Box, Link, Typography} from "@mui/material";

export function PickleSchemeInfo() {
  return (
    <Box display={"flex"} flexDirection={"column"} sx={{padding: "10px"}}>
      <Typography variant={"h3"} sx={{ textAlign: "center"}}>Pickle's Scheme Info</Typography>
      <Typography variant={"h5"} sx={{ textAlign: "center"}}>Introduction</Typography>
      <p style={{textAlign: "center"}}>
        Pickle Scheme is a small subset of the &nbsp;
        <Link href={"https://en.wikipedia.org/wiki/Scheme_(programming_language)"}>Scheme Programming Language</Link>.
        Pickle Scheme is implemented as a interpreted functional language with tail call recursion optimization.
      </p>
      <Typography variant={"h5"} sx={{ textAlign: "center"}}>Usage</Typography>
      <Typography variant={"h5"} sx={{ textAlign: "center"}}>Credits</Typography>
      <p style={{textAlign: "center"}}>Pickle Scheme is based on <Link href={"https://github.com/chidiwilliams/jscheme"}>
        JScheme</Link> and <Link href={"https://schemers.org/Documents/Standards/R5RS/"}>R5RS</Link></p>
    </Box>

  )
}
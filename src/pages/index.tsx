import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function Index() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ fontSize: { xs: "1.25rem", sm: "2rem" } }}>
            Index
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

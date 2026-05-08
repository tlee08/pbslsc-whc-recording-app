import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { NavDrawer, DRAWER_WIDTH } from "./components/shared/NavDrawer";
import { DrawerContext } from "./contexts/DrawerContext";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2",
        },
      },
    },
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DrawerContext.Provider value={{ mobileOpen, setMobileOpen }}>
            <NavDrawer />
          </DrawerContext.Provider>
          <Box
            component="main"
            sx={{
              width: { xs: "100%", sm: `calc(100% - ${DRAWER_WIDTH}px)` },
              ml: { xs: 0, sm: `${DRAWER_WIDTH}px` },
            }}
          >
            {children}
          </Box>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <div>Error</div>;
}

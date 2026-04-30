import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { DrawerContext } from "../../contexts/DrawerContext";
import CatDropdownSet from "./CatDropdownSet";

export const DRAWER_WIDTH = 240;

export const NavDrawer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mobileOpen, setMobileOpen } = React.useContext(DrawerContext);

  const drawerContent = (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <CatDropdownSet />
      <Divider />
      <List>
        {["Preregister", "Results", "Admin"].map((e) => (
          <ListItem key={`${e}_list`} disablePadding>
            <ListItemButton
              href={`/${e}`}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <ListItemText primary={e} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              WHC Race Scorer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          {drawerContent}
        </Drawer>
        <Toolbar />
      </>
    );
  }

  return (
    <Drawer variant="permanent" sx={{ width: DRAWER_WIDTH }}>
      {drawerContent}
    </Drawer>
  );
};

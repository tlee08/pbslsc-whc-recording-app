import React from "react";

export const DrawerContext = React.createContext<{
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  mobileOpen: false,
  setMobileOpen: () => {},
});

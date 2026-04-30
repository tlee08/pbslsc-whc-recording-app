import React from "react";
import { PreregisterContext } from "../contexts/PreregisterContext";

export function usePreregisterContext() {
  return React.useContext(PreregisterContext);
}

import React from "react";
import { CatContext } from "../contexts/CatContext";

export function useCatContext() {
  const { date, event, gender, setDate, setEvent, setGender } =
    React.useContext(CatContext);
  return {
    date: date,
    event: event,
    gender: gender,
    setDate: setDate,
    setEvent: setEvent,
    setGender: setGender,
  };
}

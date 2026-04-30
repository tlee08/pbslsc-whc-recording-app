import React from "react";

type CatState = {
  date: string;
  event: string;
  gender: string;
};

type CatContextInterface = CatState & {
  setDate: (value: string) => void;
  setEvent: (value: string) => void;
  setGender: (value: string) => void;
};

const CatContext = React.createContext<CatContextInterface>({
  date: "",
  event: "",
  gender: "",
  setDate: () => {},
  setEvent: () => {},
  setGender: () => {},
});

const STORAGE_KEY = "cat";

function CatProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CatState>(() => {
    if (typeof window === "undefined")
      return { date: "", event: "", gender: "" };
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { date: "", event: "", gender: "" };
  });

  React.useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setDate = (value: string) =>
    setState((s) => ({ ...s, date: value, event: "", gender: "" }));
  const setEvent = (value: string) =>
    setState((s) => ({ ...s, event: value, gender: "" }));
  const setGender = (value: string) =>
    setState((s) => ({ ...s, gender: value }));

  return (
    <CatContext.Provider value={{ ...state, setDate, setEvent, setGender }}>
      {children}
    </CatContext.Provider>
  );
}

export { CatContext, CatProvider };

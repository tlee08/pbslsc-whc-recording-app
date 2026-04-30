import React from "react";
import type Member from "../models/Member";

type PreregisterContextInterface = {
  preregisterState: Member[];
  setPreregisterState: React.Dispatch<React.SetStateAction<Member[]>>;
  addPreregisterItem: (item: Member | null) => void;
  removePreregisterItem: (index: number) => void;
  bulkAddPreregisterItems: (items: (Member | null)[]) => void;
};

const PreregisterContext = React.createContext<PreregisterContextInterface>({
  preregisterState: [],
  setPreregisterState: () => {},
  addPreregisterItem: () => {},
  removePreregisterItem: () => {},
  bulkAddPreregisterItems: () => {},
});

interface PreregisterProviderProps {
  children: React.ReactNode;
}

function PreregisterContextProvider({ children }: PreregisterProviderProps) {
  const [preregisterState, setPreregisterState] = React.useState<Member[]>(
    () => {
      if (typeof window === "undefined") return;
      const preregister = sessionStorage.getItem("preregister");
      return preregister ? JSON.parse(preregister) : [];
    },
  );

  // Write data to storage when items change
  React.useEffect(() => {
    // for items
    sessionStorage.setItem("preregister", JSON.stringify(preregisterState));
  }, [preregisterState]);

  // on-action: adding item
  const addPreregisterItem = (item: Member | null): void => {
    // if item is undefined, don't add
    if (!item) return;
    // otherwise, add item
    const items = [...preregisterState, item]
      .filter((i, idx, self) => idx === self.findIndex((j) => j.id === i.id))
      .sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));
    setPreregisterState(items);
  };
  // on-action: removing item
  const removePreregisterItem = (index: number): void => {
    const items = [...preregisterState];
    items.splice(index, 1);
    setPreregisterState(items);
  };
  // on-action: bulk add current items to preregisterState
  const bulkAddPreregisterItems = (items: (Member | null)[]) => {
    setPreregisterState(
      [...preregisterState, ...items]
        .filter((i) => i != null)
        .filter((i, idx, self) => idx === self.findIndex((j) => j.id === i.id))
        .sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase())),
    );
  };

  return (
    <PreregisterContext.Provider
      value={{
        preregisterState,
        setPreregisterState,
        addPreregisterItem,
        removePreregisterItem,
        bulkAddPreregisterItems,
      }}
    >
      {children}
    </PreregisterContext.Provider>
  );
}

export { PreregisterContext, PreregisterContextProvider };

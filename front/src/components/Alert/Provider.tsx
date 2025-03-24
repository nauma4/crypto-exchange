import React from "react";

import { Alert } from "./Alert";

export type AlertContextTypes = {
  isOpen: boolean;
  title: string | null;
  description: string | null;
  showAlert?: (title: string | null, description: string | null) => void;
  onClose: () => void;
};

type AlertContextDataTypes = {
  title: string | null;
  description: string | null;
};

type AlertProviderTypes = {
  children: React.ReactNode;
};

export const AlertContext = React.createContext<AlertContextTypes>({
  isOpen: false,
  title: null,
  description: null,
  showAlert: () => {},
  onClose: () => {},
});

export const useAlert = () => React.useContext(AlertContext);

export const AlertProvider: React.FC<AlertProviderTypes> = ({
  children,
}): React.ReactNode => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<AlertContextDataTypes>({
    title: "",
    description: "",
  });

  const showAlert = (title: string | null, description: string | null) => {
    setData({ title, description });
    setOpen(true);
  };

  const onClose = () => setOpen(false);

  return (
    <AlertContext.Provider
      value={{
        isOpen,
        title: data.title,
        description: data.description,
        showAlert,
        onClose,
      }}
    >
      {children}
      <Alert
        isOpen={isOpen}
        title={data.title}
        description={data.description}
        onClose={onClose}
      />
    </AlertContext.Provider>
  );
};

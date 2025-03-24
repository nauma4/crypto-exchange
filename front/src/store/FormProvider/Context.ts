import { createContext, useContext } from "react";
//
// VALUTE types
//
export type ValuteItemType = {
  id: string;
  name: string;
  key: string;
  image: string;
  min_give: number;
  max_get: number;
  reserve: number;
  course: number;
  percent_get: number;
  percent_give: number;
};

export type ValuteFormItemType = {
  name: string;
  title: string;
  regexp: string;
  required: boolean;
  length: number | null;
  max_length: number | null;
};

//
// CONTEXT TYPE
//
type FormContextType = {
  valuteList: FormValuteListType;
  setValuteList: React.Dispatch<React.SetStateAction<FormValuteListType>>;
  give: FormValuteGive;
  get: FormValuteGet;
  isValid: boolean;
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormValuteListType = {
  give: ValuteItemType[] | null;
  get: ValuteItemType[] | null;
};

interface FormValuteBase {
  count: string;
  setCount: React.Dispatch<React.SetStateAction<string>>;
  valute: ValuteItemType | null;
  setValute: React.Dispatch<React.SetStateAction<ValuteItemType | null>>;
}

interface FormValuteGive extends FormValuteBase {
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface FormValuteGet extends FormValuteBase {
  forms: ValuteFormItemType[];
  setForms: React.Dispatch<React.SetStateAction<ValuteFormItemType[]>>;
  data: Record<string, string>;
  onChangeData: (name: string) => (value: string) => void;
}

export const FormContext = createContext<FormContextType>({
  valuteList: { give: [], get: [] },
  setValuteList: () => {},

  give: {
    count: "",
    setCount: () => {},
    valute: null,
    setValute: () => {},
    email: null,
    setEmail: () => {},
  },
  get: {
    count: "",
    setCount: () => {},
    valute: null,
    setValute: () => {},
    forms: [],
    setForms: () => {},
    data: {},
    onChangeData: () => () => {},
  },
  isValid: true,
  setValid: () => {},
});

export const useForms = () => useContext(FormContext);

import { useState, useEffect } from "react";
import {
  FormContext,
  ValuteItemType,
  ValuteFormItemType,
  FormValuteListType,
} from "./Context";

type FormProviderPropTypes = {
  children: React.ReactNode;
};

export const FormProvider: React.FC<FormProviderPropTypes> = ({ children }) => {
  const [isValid, setValid] = useState<boolean>(true);

  const [valuteList, setValuteList] = useState<FormValuteListType>({
    get: [],
    give: [],
  });
  const [giveValute, setGiveValute] = useState<ValuteItemType | null>(null);
  const [giveCount, setGiveCount] = useState<string>("1");
  const [email, setEmail] = useState<string>("");

  const [getValute, setGetValute] = useState<ValuteItemType | null>(null);
  const [getCount, setGetCount] = useState<string>("");
  const [getValuteForms, setGetValuteForms] = useState<ValuteFormItemType[]>(
    []
  );
  const [getValuteData, setGetValuteData] = useState<Record<string, string>>(
    {}
  );

  const onChangeData = (name: string) => {
    return (value: string) => {
      return setGetValuteData((data) => {
        return {
          ...data,
          [name]: value,
        };
      });
    };
  };

  const calculateCount = (
    count: string,
    giveValute: ValuteItemType | null,
    getValute: ValuteItemType | null
  ) => {
    if (!giveValute || !getValute) return null;

    // GENERAL COURSE
    const course = giveValute.course * 0.95;
    // end
    const summGiveCount = +count * course;
    const summMinGiveCourse = course * giveValute.min_give;

    const summGetCount = summGiveCount / getValute.course;
    const summMaxGetCourse = getValute.course * getValute.max_get;
    const summMinGetCourse = getValute.course * getValute.min_give;

    setGetCount(summGetCount.toFixed(9));

    if (
      summGiveCount < summMinGiveCourse ||
      summGetCount > summMaxGetCourse ||
      summGiveCount < summMinGetCourse
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => {
    calculateCount(giveCount, giveValute, getValute);
  }, [giveCount, giveValute, getValute]);

  return (
    <FormContext.Provider
      value={{
        valuteList,
        setValuteList,

        give: {
          count: giveCount,
          setCount: setGiveCount,
          valute: giveValute,
          setValute: setGiveValute,
          email: email,
          setEmail,
        },
        get: {
          count: getCount,
          setCount: setGetCount,
          valute: getValute,
          setValute: setGetValute,
          forms: getValuteForms,
          setForms: setGetValuteForms,
          data: getValuteData,
          onChangeData,
        },
        isValid,
        setValid,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

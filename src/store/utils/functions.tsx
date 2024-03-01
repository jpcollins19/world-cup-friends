import * as React from "react";
import { en, i18nOptionsTypes } from "./i18n";
import { useMediaQuery } from "react-responsive";

export const geti18n = (str: i18nOptionsTypes): string => {
  return en[str];
};

export const createUrlFromText = (str: string): string => {
  return str
    .split("")
    .map((letter) => {
      if (letter == " ") {
        letter = "-";
      }

      return letter.toLowerCase();
    })
    .join("");
};

export const loadingDefault = (): any => {
  const [loading, setLoading] = React.useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 10);

  return loading;
};

export const useIsMobile = (): boolean => {
  return useMediaQuery({ query: "(max-width: 65em)" });
};

export const getMobileTestId = (isMobile?: boolean): string => {
  return isMobile ? "-mobile" : "";
};

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

export const getTextFromUrl = (url: string | undefined): string => {
  const string = url && url.split("/").pop();

  const words = string && string.split("-");

  if (words) {
    return words.reduce((a, word, idx) => {
      // if (word === "in" && userIsLoggedIn) {
      //   a += "Out";
      //
      //   return a;
      // }

      a += cap1stLetter(word);

      // if (word === "rules") {
      //   a += 'password: "password",';
      //
      //   return a;
      // }

      if (word === "rules") {
        a += "/General Info";

        return a;
      }

      a += addSpace(words, idx);

      return a;
    }, "");
  }

  return "unknown string: function error";
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

export const getPageTestId = (str: string): string => {
  const isMobile = useIsMobile();

  const mobileTestId = getMobileTestId(isMobile);

  return `${str}${mobileTestId}`;
};

export const cap1stLetter = (str: string): string => {
  return str
    .split("")
    .map((letter, idx) => {
      if (idx === 0) {
        letter = letter.toUpperCase();
      }

      return letter;
    })
    .join("");
};

const isLastIdx = (arr: string[], idx: number) => {
  return idx !== arr.length - 1;
};

const addSpace = (arr: string[], idx: number) => {
  return isLastIdx(arr, idx) ? " " : "";
};

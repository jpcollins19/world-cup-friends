import * as React from "react";
import { en, i18nOptionsTypes } from "./i18n";
import { useIsMobile } from "../../hooks";
import { calcPayoutSchema } from "./functionSchemas";

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

const isLastIdx = (arr: string[], idx: number): boolean => {
  return idx !== arr.length - 1;
};

const addSpace = (arr: string[], idx: number): string => {
  return isLastIdx(arr, idx) ? " " : "";
};

export const calcPayout = (users: any): calcPayoutSchema => {
  const pot = users?.length * 20;

  const result = {
    firstPlace: 0,
    secondPlace: 0,
    thirdPlace: 0,
    numOfPicks: users?.length,
  };

  switch (users?.length) {
    case 1:
      result.firstPlace = 15;
      result.secondPlace = 5;
      result.thirdPlace = 0;
      break;
    case 2:
      result.firstPlace = 30;
      result.secondPlace = 10;
      result.thirdPlace = 0;
      break;
    case 3:
      result.firstPlace = 45;
      result.secondPlace = 15;
      result.thirdPlace = 0;
      break;
    case 4:
      result.firstPlace = 60;
      result.secondPlace = 20;
      result.thirdPlace = 0;
      break;
    default:
      result.thirdPlace = 20;
      result.firstPlace = (pot - result.thirdPlace) * 0.75;
      result.secondPlace = (pot - result.thirdPlace) * 0.25;
  }

  return result;
};

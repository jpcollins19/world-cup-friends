import * as React from "react";
import { en, i18nOptionsTypes } from "./i18n";
import { useIsMobile, useIsUserLoggedIn } from "../../hooks";
import { calcPayoutSchema } from "./functionSchemas";
import { GroupPicksState } from "../group_picks_store";
import {
  UserGroupPicksSchema,
  UserSingleGroupPickSchema,
} from "../users_store";
import { groupLetters } from "./variables";
import { TeamSchema } from "../teams_store";

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

export const removeForwardSlashFromRoute = (route: string): string => {
  return route.split("/").pop()!!;
};

export const getTextFromUrl = (url: string): string => {
  const string = url && url.split("/").pop();

  const words = string && string.split("-");

  if (words) {
    return words.reduce((a, word, idx) => {
      // if (word === "in" && useIsUserLoggedIn()) {
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

export const formatEmail = (email: string): string => {
  const regex = /[a-zA-Z]/g;

  email = email
    .split("")
    .map((letter) => {
      if (letter.match(regex)) {
        letter = letter.toLowerCase();
      }
      return letter;
    })
    .join("");
  return email;
};

export const validateEmail = (email: string): boolean => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return email.match(mailformat) ? true : false;
};

export const getSpecificKeyFromArray = (arr: any, key: string): any => {
  return arr.map((obj: any) => obj[key]);
};

export const formatStrToLowerCase = (str: string): any => {
  return str
    .split("")
    .map((letter: string) => letter.toLowerCase())
    .join("");
};

export const createPreTourneyDataNotAvailableYetMessage = (page: string) => {
  return `${page} ${geti18n("pageNotAvailableUntilTourneyStarts")}`;
};

export const getUserGroupPicks = (
  userId: string,
  groupPicks: GroupPicksState,
  teams: TeamSchema[],
): UserGroupPicksSchema => {
  const userGroupPicks: UserGroupPicksSchema = [];

  const userPicksFromApi = groupPicks.filter(
    (groupPick) => groupPick.userUuid === userId,
  );

  //console.log("userPicksFromApi", userPicksFromApi);

  groupLetters.forEach((letter) => {
    const isGroupA = letter === "A";

    const userPicksForGroupAtHand = userPicksFromApi.filter(
      (pick) => pick.groupLetter === letter,
    );

    // isGroupA && console.log("userPicksForGroupAtHand", userPicksForGroupAtHand);

    const userPicksForGroupAtHand1 = userPicksForGroupAtHand[0];
    const userPicksForGroupAtHand2 = userPicksForGroupAtHand[1];
    const userPicksForGroupAtHand3 = userPicksForGroupAtHand[2];
    const userPicksForGroupAtHand4 = userPicksForGroupAtHand[3];

    // isGroupA &&
    //   console.log("userPicksForGroupAtHand1", userPicksForGroupAtHand1);
    //
    // isGroupA &&
    //   console.log("userPicksForGroupAtHand2", userPicksForGroupAtHand2);
    //
    // isGroupA &&
    //   console.log("userPicksForGroupAtHand3", userPicksForGroupAtHand3);
    //
    // isGroupA &&
    //   console.log("userPicksForGroupAtHand4", userPicksForGroupAtHand4);

    const userPickTeamName1: string = teams.find(
      (team) => team.id === userPicksForGroupAtHand1.teamUuid,
    )?.name!;

    const userPickTeamName2: string = teams.find(
      (team) => team.id === userPicksForGroupAtHand2.teamUuid,
    )?.name!;

    const userPickTeamName3: string = teams.find(
      (team) => team.id === userPicksForGroupAtHand3.teamUuid,
    )?.name!;

    const userPickTeamName4: string = teams.find(
      (team) => team.id === userPicksForGroupAtHand4.teamUuid,
    )?.name!;

    // isGroupA && console.log("userPickTeamName1", userPickTeamName1);
    // isGroupA && console.log("userPickTeamName2", userPickTeamName2);
    // isGroupA && console.log("userPickTeamName3", userPickTeamName3);
    // isGroupA && console.log("userPickTeamName4", userPickTeamName4);

    const thirdPlaceToAdvanceToKo: boolean =
      userPicksForGroupAtHand3?.thirdPlaceToAdvanceToKo!;

    const groupPicksResult = {
      group: letter,
      1: userPickTeamName1,
      2: userPickTeamName2,
      3: userPickTeamName3,
      4: userPickTeamName4,
      thirdPlaceToAdvanceToKo,
    };

    userGroupPicks.push(groupPicksResult);
  });

  // console.log("userGroupPicks", userGroupPicks);

  const groupA: UserSingleGroupPickSchema = {
    group: "A",
    1: "Dutch",
    2: "USA",
    3: "Germany",
    4: "Canada",
    thirdPlaceToAdvanceToKo: true,
  };

  return userGroupPicks;
};

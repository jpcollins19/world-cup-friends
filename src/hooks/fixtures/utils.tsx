import {
  emails,
  userNames,
  TeamDataSchema,
  teamsByGroup,
  createGroup,
} from "./";
import { groupLetters, TeamSchema } from "../../store";

const newGUID = () => {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16),
  );
};

export const getFakerInfo = (type: string) => {
  if (type === "uuid") {
    return newGUID();
  }

  const arrayToUse = type === "email" ? emails : userNames;

  const arrayLength = arrayToUse.length;

  const randomNum = Math.ceil(Math.random() * arrayLength) - 1;

  return arrayToUse[randomNum];
};

export const findTeam = (
  name: string | undefined,
): TeamDataSchema | undefined => {
  return teamsByGroup.find((team) => team.name === name);
};

export const findTeamsInGroup = (
  groupLetter: string | undefined,
): TeamDataSchema[] => {
  return teamsByGroup.filter((team) => team.group === groupLetter);
};

export const createAllGroups = (): TeamSchema[] => {
  return groupLetters
    .map((groupLetter) => createGroup({ groupLetter }))
    .reduce((a, teams) => {
      return [...a, ...teams];
    }, []);
};

export const generateRandomGroupOrder = () => {
  const order: any = [];

  while (order.length < 4) {
    const num = Math.ceil(Math.random() * 4);

    if (!order.includes(num)) {
      order.push(num);
    }
  }

  return order;
};

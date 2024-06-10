import {
  emails,
  userNames,
  uuids,
  TeamDataSchema,
  teamsByGroup,
  createGroup,
} from "./";
import { groupLetters, TeamSchema } from "../../store";

export const getFakerInfo = (type: string) => {
  const arrayToUse =
    type === "uuid" ? uuids : type === "email" ? emails : userNames;

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

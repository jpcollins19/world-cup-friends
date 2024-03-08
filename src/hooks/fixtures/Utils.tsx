import { emails, names, uuids } from "./Faker";

export const getFakerInfo = (type: string) => {
  const arrayToUse =
    type === "uuid" ? uuids : type === "email" ? emails : names;

  const arrayLength = arrayToUse.length;

  const randomNum = Math.ceil(Math.random() * arrayLength) - 1;

  return arrayToUse[randomNum];
};

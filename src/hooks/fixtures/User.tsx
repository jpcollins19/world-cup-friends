import { UserSchema } from "../../store";
import { emails, names, uuids } from "./Faker";

const getFakerInfo = (type: string) => {
  const arrayToUse =
    type === "uuid" ? uuids : type === "email" ? emails : names;

  const arrayLength = arrayToUse.length;

  const randomNum = Math.ceil(Math.random() * arrayLength) - 1;

  return arrayToUse[randomNum];
};

export const createUser = (tiebreaker?: number): UserSchema => {
  return {
    id: getFakerInfo("uuid"),
    email: getFakerInfo("email"),
    password: "123",
    name: getFakerInfo("name"),
    tiebreaker: tiebreaker ?? null,
    createdAt: "2024-03-07T22:44:20.451Z",
    updatedAt: "2024-03-07T22:44:20.451Z",
  };
};

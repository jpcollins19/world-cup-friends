import { UserSchema } from "../../store";
import { getFakerInfo } from "./";

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

import { UserSchema } from "../../store";
import { getFakerInfo } from "./";

export const createUser = (
  tiebreaker?: number,
  emailNotifications?: boolean,
): UserSchema => {
  return {
    id: getFakerInfo("uuid"),
    email: getFakerInfo("email"),
    password: "123",
    name: getFakerInfo("name"),
    tiebreaker: tiebreaker ?? null,
    emailNotifications: emailNotifications ?? false,
    createdAt: "2024-03-07T22:44:20.451Z",
    updatedAt: "2024-03-07T22:44:20.451Z",
  };
};

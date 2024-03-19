import { UserSchema } from "../../store";
import { getFakerInfo } from "./";

export const createUser = ({
  tiebreaker = undefined,
  email = undefined,
  emailNotifications = undefined,
  name = undefined,
}: {
  tiebreaker?: number;
  email?: string;
  emailNotifications?: boolean;
  name?: string;
} = {}): UserSchema => {
  return {
    id: getFakerInfo("uuid"),
    email: email ?? getFakerInfo("email"),
    password: "123",
    name: name ?? getFakerInfo("name"),
    tiebreaker: tiebreaker ?? null,
    emailNotifications: emailNotifications ?? false,
    createdAt: "2024-03-07T22:44:20.451Z",
    updatedAt: "2024-03-07T22:44:20.451Z",
  };
};

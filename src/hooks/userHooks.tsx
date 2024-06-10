import { useSelector } from "react-redux";
import {
  AuthState,
  formatStrToLowerCase,
  getSpecificKeyFromArray,
  RootState,
  UserSchema,
} from "../store";
import { useFindTourneyStage } from "./tourneyHooks";

export const useGetAuth = (): AuthState => {
  return useSelector((state: RootState) => state.auth);
};

export const useGetUsers = (): UserSchema[] => {
  return useSelector((state: RootState) => state.users);
};

export const useIsUserLoggedIn = (): boolean => {
  const auth = useGetAuth();

  return !!auth.id;
};

export const useIsUserAdmin = (): boolean => {
  const auth = useGetAuth();

  return !!auth.isAdmin;
};

export const useGetActiveUsers = (): UserSchema[] => {
  const users = useGetUsers();

  return users.filter((user) => user.tiebreaker);
};

export const useShouldPayoutShow = (): boolean => {
  const tourneyStage = useFindTourneyStage();

  const tourneyStarted = tourneyStage !== 1;

  const user = useGetAuth();

  const userSubmittedPicks = user?.tiebreaker ?? false;

  const isUserLoggedIn = useIsUserLoggedIn();

  return !tourneyStarted && isUserLoggedIn
    ? true
    : tourneyStarted && userSubmittedPicks
      ? true
      : false;
};

export const useIsEmailInUse = (newEmail: string): boolean => {
  const users = useGetUsers();

  const userEmails = getSpecificKeyFromArray(users, "email");

  return userEmails.includes(newEmail);
};

export const useIsNameInUse = (name: string): boolean => {
  const users = useGetUsers();

  const userNames = getSpecificKeyFromArray(users, "name").map(
    (userName: string) => formatStrToLowerCase(userName),
  );

  return userNames.includes(formatStrToLowerCase(name));
};

export const useGetUser = (userId: string): UserSchema => {
  return useGetUserGroupPicks(userId);
};

export const useGetUserGroupPicks = (userId: string): UserSchema => {
  const users = useGetUsers();

  const user = users.find((user) => user.id === userId);

  return user!!;
};

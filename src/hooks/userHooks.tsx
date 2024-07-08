import { useSelector } from "react-redux";
import {
  formatStrToLowerCase,
  getSpecificKeyFromArray,
  RootState,
  UserSchema,
} from "../store";
import { useFindTourneyStage } from "./tourneyHooks";

export const useGetAuth = (test: boolean = false): UserSchema => {
  const auth = useSelector((state: RootState) => state.auth);

  // test && console.log("auth", auth);

  return useGetUser(auth.id!!, test);
};

export const useGetUsers = (): UserSchema[] => {
  return useSelector((state: RootState) => state.users);
};

export const useGetUser = (
  userId: string,
  test: boolean = false,
): UserSchema => {
  const users = useGetUsers();

  // test && console.log("userId", userId);

  const user = users.find((user) => user.id === userId)!;

  const noAuth = { id: null };

  return user ?? noAuth;
};

export const useIsUserLoggedIn = (): boolean => {
  const auth = useSelector((state: RootState) => state.auth);

  return !!auth.id;
};

export const useIsUserAdmin = (): boolean => {
  const auth = useSelector((state: RootState) => state.auth);

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

  //leave this return statement as is -- do not simplify
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

export const useUserGroupPicksSubmitted = (): boolean => {
  const user = useGetAuth();

  //leave this return statement as is -- do not simplify
  return user?.tiebreaker ? true : false;
};

export const useGetUserGroupPicks = (groupLetter: string): any => {
  const user = useGetAuth();

  const teams = useSelector((state: RootState) => state.teams);

  const userGroupPicks = user.groupPicks.find(
    (groupPick) => groupPick.group === groupLetter,
  );

  return !userGroupPicks
    ? []
    : Object.values(userGroupPicks)
        .slice(0, 4)
        .map((teamName) => {
          return teams.find((team) => team.name === teamName);
        });
};

export const useUserHas3rdPlaceTeamAdvancing = (
  groupLetter: string,
): boolean => {
  const user = useGetAuth();

  const userGroupPicks = user.groupPicks.find(
    (groupPick) => groupPick.group === groupLetter,
  );

  return userGroupPicks?.thirdPlaceToAdvanceToKo as boolean;
};

import { useSelector } from "react-redux";
import { AuthState, RootState, TourneyStageState, UserSchema } from "../store";

export const useGetUser = (): AuthState => {
  return useSelector((state: RootState) => state.auth);
};

export const useIsUserLoggedIn = (): boolean => {
  const auth = useGetUser();

  return !!auth.id;
};

export const useIsUserAdmin = (): boolean => {
  const auth = useGetUser();

  return !!auth.isAdmin;
};

export const useGetActiveUsers = (): UserSchema[] => {
  const users = useSelector((state: RootState) => state.users);

  return users.filter((user) => user.tiebreaker);
};

export const findTourneyStage = (): number | TourneyStageState => {
  return useSelector((state: RootState) => state.tourneyStage);
};

export const useShouldPayoutShow = (): boolean => {
  const tourneyStage = findTourneyStage();

  const tourneyStarted = tourneyStage !== 1;

  const user = useGetUser();

  const userSubmittedPicks = user?.tiebreaker ?? false;

  const isUserLoggedIn = useIsUserLoggedIn();

  return !tourneyStarted && isUserLoggedIn
    ? true
    : tourneyStarted && userSubmittedPicks;

  // return (
  //     (!tourneyStarted && user?.id) || (tourneyStarted && userSubmittedPicks)
  // );
};

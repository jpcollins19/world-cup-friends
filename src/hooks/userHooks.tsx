import { useSelector } from "react-redux";
import { RootState, UserSchema } from "../store";

export const useIsUserLoggedIn = (): boolean => {
  const auth = useSelector((state: RootState) => state.auth);

  return !!auth.id;
};

export const useIsUserAdmin = (): boolean => {
  const auth = useSelector((state: RootState) => state.auth);

  return !!auth.isAdmin;
};

export const useGetActiveUsers = (): UserSchema[] => {
  const users = useSelector((state: RootState) => state.users);

  return users.filter((user) => user.tiebreaker);
};

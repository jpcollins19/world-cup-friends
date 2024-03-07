import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useIsUserLoggedIn = (): boolean => {
  const auth = useSelector((state: RootState) => state.auth);

  return !!auth.id;
};

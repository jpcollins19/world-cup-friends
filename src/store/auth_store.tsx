import axios from "axios";
import { routes } from "./utils";

const TOKEN = "token";

const SET_AUTH = "SET_AUTH";

export type AuthSchema = {
  type: string;
  payload: object;
};

export const setAuth = (auth: any): AuthSchema => {
  const user = { type: SET_AUTH, payload: {} };

  const errorPayload = { error: auth.error };
  const successPayload = { auth };

  user.payload = auth.error ? errorPayload : successPayload;

  return user;
};

export const me = () => async (dispatch: any) => {
  const token = window.localStorage.getItem(TOKEN);

  if (token) {
    const config: { headers: { authorization: string } } = {
      headers: {
        authorization: token,
      },
    };

    try {
      const response = await axios.get("/api/me", config as any);

      return dispatch(setAuth(response.data));
    } catch (error) {
      console.error("Error fetching user data-byah:", error);
      throw error;
    }
  }
};

export const authenticate =
  (email: string, password: string, history: any) => async (dispatch: any) => {
    //(email: string | null, password: string | null, history: any) =>
    // async (dispatch: any) => {
    try {
      const response = await axios.post("api/authorize", { email, password });

      const { token } = response.data;

      window.localStorage.setItem(TOKEN, token);

      try {
        await dispatch(me());

        history.push(routes.leaderboard);
      } catch (error) {
        throw error;
      }
    } catch (authError) {
      return dispatch(
        setAuth({
          error: `the error is happening in the authenticate thunk in the store-byah: ${authError}`,
        }),
      );
    }
  };

export const logout = (history: any) => {
  history.push(routes.signIn);
  window.localStorage.removeItem(TOKEN);
  return {
    type: SET_AUTH,
    payload: { auth: {} },
  };
};

export interface AuthState {
  id: null;
  isAdmin: null;
  tiebreaker: null;
  emailNotifications: null;
}

export default function (
  state: AuthState = {
    id: null,
    isAdmin: null,
    tiebreaker: null,
    emailNotifications: null,
  },
  action: any,
) {
  switch (action.type) {
    case SET_AUTH:
      return action.payload.auth;
    default:
      return state;
  }
}

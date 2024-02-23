import axios from "axios";
import { AuthState } from "./auth_store";

const LOAD_USERS = "LOAD_USERS";

const _loadUsers = (users: any) => {
  return { type: LOAD_USERS, users };
};

export const loadUsers = () => {
  return async (dispatch: any) => {
    const users = (await axios.get("/api/users")).data;
    dispatch(_loadUsers(users));
  };
};

export interface UsersState {}

// export const users = (state: UsersState = [], action) => {
//   switch (action.type) {
//     case LOAD_USERS:
//       return action.users;
//     default:
//       return state;
//   }
// };

export default function (state: UsersState = [], action: any) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    default:
      return state;
  }
}

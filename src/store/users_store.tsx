import axios from "axios";
import { loadGroupPicks } from "./group_picks_store";

const LOAD_USERS = "LOAD_USERS";

export const _loadUsers = (users: UsersState) => {
  return { type: LOAD_USERS, users };
};

export const loadUsers = () => {
  return async (dispatch: any) => {
    const users = (await axios.get("/api/users")).data;

    const groupPicks = await loadGroupPicks();

    dispatch(_loadUsers(users));
  };
};

export type UserSchema = {
  id: string;
  email: string;
  password: string;
  name: string;
  tiebreaker?: number | null;
  emailNotifications: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserSingleGroupPickSchema = {
  group: string;
  1: string;
  2: string;
  3: string;
  4: string;
  thirdPlaceToAdvanceToKo: boolean;
};

export type UserGroupPicksSchema = Array<UserSingleGroupPickSchema>;

//     {
//   a: UserSingleGroupPickSchema;
//   b: UserSingleGroupPickSchema;
//   c: UserSingleGroupPickSchema;
//   d: UserSingleGroupPickSchema;
//   e: UserSingleGroupPickSchema;
//   f: UserSingleGroupPickSchema;
//   g: UserSingleGroupPickSchema;
//   h: UserSingleGroupPickSchema;
//   i: UserSingleGroupPickSchema;
//   j: UserSingleGroupPickSchema;
//   k: UserSingleGroupPickSchema;
//   l: UserSingleGroupPickSchema;
// };

export interface UsersState extends Array<UserSchema> {}

export default function (state: UsersState = [], action: any) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    default:
      return state;
  }
}

// export const users = (state: UsersState = [], action) => {
//   switch (action.type) {
//     case LOAD_USERS:
//       return action.users;
//     default:
//       return state;
//   }
// };

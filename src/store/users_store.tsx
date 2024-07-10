import axios from "axios";
import { getUserGroupPicks } from "./utils";
import { UserSingleGroupPlacementsSchema } from "../components/myPicks/unlocked/GroupPicksSchema";

const LOAD_USERS = "LOAD_USERS";

export const _loadUsers = (users: UsersState) => {
  return { type: LOAD_USERS, users };
};

export const loadUsers = () => {
  return async (dispatch: any) => {
    const users = (await axios.get("/api/users")).data;

    const teams = (await axios.get("/api/teams")).data;

    const groupPicks = (await axios.get("/api/group-picks")).data;

    //adding user group picks before the users are loaded into the app
    users.map((user: UserSchema) => {
      user.groupPicks = getUserGroupPicks(user.id, groupPicks, teams);

      return user;
    });

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
  groupPicks: UserSingleGroupPlacementsSchema[] | [];
  createdAt: string;
  updatedAt: string;
};

export interface UsersState extends Array<UserSchema> {}

export default function (state: UsersState = [], action: any) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    default:
      return state;
  }
}

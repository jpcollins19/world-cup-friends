import axios from "axios";
import { geti18n, getUserGroupPicks, routes } from "./utils";
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

const getUserTiebreaker = async (userId: string) => {
  const users = (await axios.get("/api/users")).data;

  return users.find((user: UserSchema) => user.id === userId)?.tiebreaker;
};

export const updateUserGroupPicks = (
  history: any,
  userId: string,
  tiebreaker: string,
) => {
  return async (dispatch: any) => {
    console.log("buttons", typeof tiebreaker);

    const tiebreakerIsInteger = Number(tiebreaker) % 1 === 0;
    const tiebreakerAsArray = tiebreaker.split("");

    const invalidTiebreaker =
      !tiebreakerIsInteger ||
      tiebreaker === "" ||
      tiebreakerAsArray?.includes(" ") ||
      tiebreaker === "0";

    if (invalidTiebreaker) {
      throw Error(geti18n("errorTiebreaker"));
    }

    const currentTiebreaker = await getUserTiebreaker(userId);

    const tiebreakerAsNumber = Number(tiebreaker);

    const userToSubmit = { id: userId, tiebreaker: tiebreakerAsNumber };

    if (currentTiebreaker !== tiebreakerAsNumber) {
      console.log("byah");

      await axios.put(`/api/users/${userId}`, userToSubmit);
    }

    ////////////////////////////// groupPicks updates //////////////////////////////
    //run all audit points that currently happen in euro pool and return an error if applicable
    ////audit to verify if a groupPick exists for the user using their userUuid
    //if it doesnt exist, do a post request for each pick - ask chatGpt for a post request example using your current get format

    //if it does exist, see if anything changed for the group pick.
    // if nothing changed, move onto next pick
    // if it did change, do a put request for the pick

    // dispatch(_loadUsers(users));

    history.push(routes.myPicks);
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

import axios from "axios";
import {
  geti18n,
  getUserGroupPicks,
  groupLetters,
  groupPickPlacements,
  routes,
} from "./utils";
import {
  AdvanceToKoKeys,
  UserGroupPicksSchema,
  UserSingleGroupPlacementsSchema,
} from "../components/myPicks/unlocked/GroupPicksSchema";
import { findUserGroupPick, GroupPickSchema } from "./group_picks_store";
import { TeamSchema } from "./teams_store";

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

const isTeamKey = (key: string): boolean => {
  const teamKeys = Object.keys(groupPickPlacements);

  return teamKeys.includes(key);
};

const filterForTeamSelections = (groupPicks: any) => {
  return Object.entries(groupPicks).filter((pick) => {
    const key = pick[0];

    if (isTeamKey(key)) return pick;
  });
};

const didPickChange = (currentPick: GroupPickSchema, team: TeamSchema) => {
  return currentPick.teamUuid !== team.id;
};

export const updateUserGroupPicks = (
  history: any,
  groupPicks: UserGroupPicksSchema,
) => {
  return async (dispatch: any) => {
    const userUuid = groupPicks.userUuid;
    const tiebreaker = groupPicks.tiebreaker;

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

    const currentTiebreaker = await getUserTiebreaker(userUuid);

    const tiebreakerAsNumber = Number(tiebreaker);

    const userToSubmit = { id: userUuid, tiebreaker: tiebreakerAsNumber };

    if (currentTiebreaker !== tiebreakerAsNumber) {
      await axios.put(`/api/users/${userUuid}`, userToSubmit);
    }

    ////////////////////////////// groupPicks updates //////////////////////////////

    const groupSelections = filterForTeamSelections(groupPicks);

    console.log("groupSelections", groupSelections);

    const asyncForEach = async (array: any, callback: any) => {
      await Promise.all(array.map(callback));
    };

    await (async () => {
      await asyncForEach(groupSelections, async (selection: any) => {
        const groupAnyPlacement = selection[0];
        const group = groupAnyPlacement.split("")[0];
        const placement = Number(groupAnyPlacement.split("")[1]);

        const currentPick = await findUserGroupPick(userUuid, group, placement);

        console.log("currentPick", currentPick);

        const team = selection[1].value;

        // console.log("selectedTeam", team.name);

        console.log("group", group);
        console.log("placement", placement);

        const pickChanged = didPickChange(currentPick, team);

        console.log("pickChanged", pickChanged);

        const thirdPlaceToAdvanceToKo =
          groupPicks[`${group}3AdvanceToKo` as AdvanceToKoKeys];

        if (pickChanged) {
          const pickId = currentPick.id;

          const pickToSubmit = {
            id: pickId,
            teamUuid: team.id,
            thirdPlaceToAdvanceToKo,
          };

          await axios.put(`/api/group-picks/${pickId}`, pickToSubmit);
        }

        //const userToSubmit = { id: userId, tiebreaker: tiebreakerAsNumber };

        // if (currentTiebreaker !== tiebreakerAsNumber) {
        //   await axios.put(`/api/users/${userId}`, userToSubmit);
        // }
        //
        // const selectionToSubmit = {
        //   groupPlacement,
        //   team,
        //   userId,
        //   tiebreaker: tiebreakerAsNumber,
        // };
        //
        // await axios.post("/api/group-picks", selectionToSubmit);
      });
    })();

    // run all audit points that currently happen in euro pool and return an error if applicable
    // audit to verify if a groupPick exists for the user using their userUuid
    // if it doesnt exist, do a post request for each pick - ask chatGpt for a post request example using your current get format

    // if it does exist, see if anything changed for the group pick.
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

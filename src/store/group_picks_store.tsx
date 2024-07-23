import axios from "axios";
import { UserSchema } from "./users_store";

const LOAD_GROUP_PICKS = "LOAD_GROUP_PICKS";

export const _loadGroupPicks = (groupPicks: GroupPicksState) => {
  return { type: LOAD_GROUP_PICKS, groupPicks };
};

export const loadGroupPicks = () => {
  return async (dispatch: any) => {
    const groupPicks = (await axios.get("/api/group-picks")).data;

    dispatch(_loadGroupPicks(groupPicks));
  };
};

// export const findUserGroupPick = (
//   userUuid: string,
//   group: string,
//   placement: number,
// ) => {
//   return async (dispatch: any) => {
//     const groupPicks = (await axios.get("/api/group-picks")).data;
//
//     return groupPicks;
//   };
// };

export const findUserGroupPick = async (
  userUuid: string,
  group: string,
  placement: number,
) => {
  const groupPicks = (await axios.get("/api/group-picks")).data;

  return groupPicks.find(
    (pick: GroupPickSchema) =>
      pick.userUuid === userUuid &&
      pick.groupLetter === group &&
      pick.groupPlacement === placement,
  );
};

export type GroupPickSchema = {
  id: string;
  userUuid: string;
  teamUuid: string;
  groupLetter: string;
  groupPlacement: number;
  thirdPlaceToAdvanceToKo: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface GroupPicksState extends Array<GroupPickSchema> {}

export default function (state: GroupPicksState = [], action: any) {
  switch (action.type) {
    case LOAD_GROUP_PICKS:
      return action.groupPicks;
    default:
      return state;
  }
}

import axios from "axios";

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

export type PickSchema = {
  id: string;
  userUuid: string;
  teamUuid: string;
  groupLetter: string;
  groupPlacement: number;
  thirdPlaceToAdvanceToKo: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface GroupPicksState extends Array<PickSchema> {}

export default function (state: GroupPicksState = [], action: any) {
  switch (action.type) {
    case LOAD_GROUP_PICKS:
      return action.groupPicks;
    default:
      return state;
  }
}

import axios from "axios";

const LOAD_TEAMS = "LOAD_TEAMS";

export const _loadTeams = (teams: TeamsState) => {
  return { type: LOAD_TEAMS, teams };
};

export const loadTeams = () => {
  return async (dispatch: any) => {
    const teams = (await axios.get("/api/teams")).data;
    dispatch(_loadTeams(teams));
  };
};

export type TeamSchema = {
  id: string;
  name: string;
  flag: string;
  group: string;
  outOfTourney: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface TeamsState extends Array<TeamSchema> {}

export default function (state: TeamsState = [], action: any) {
  switch (action.type) {
    case LOAD_TEAMS:
      return action.teams;
    default:
      return state;
  }
}

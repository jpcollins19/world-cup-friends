import { useSelector } from "react-redux";
import { convertTeamDropdown, RootState, TeamSchema } from "../store";

export const useGetTeams = (): TeamSchema[] => {
  return useSelector((state: RootState) => state.teams);
};

export const useGetTeamsForGroupDropdown = (group: string) => {
  const teams = useGetTeams();

  const teamsInGroup = teams.filter((team) => team.group === group);

  return teamsInGroup.map((team) => convertTeamDropdown(team));
};

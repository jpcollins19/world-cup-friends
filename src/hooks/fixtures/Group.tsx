import { TeamSchema } from "../../store";
import { createTeam, findTeamsInGroup } from "./";

export const createGroup = ({
  groupLetter = undefined,
}: {
  groupLetter?: string;
} = {}): TeamSchema[] => {
  const teamsInGroup = findTeamsInGroup(groupLetter);

  return teamsInGroup.map((team) => createTeam({ name: team.name }));
};

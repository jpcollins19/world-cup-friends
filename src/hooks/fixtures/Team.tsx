import { TeamSchema } from "../../store";
import { getFakerInfo, netherlands, findTeam } from "./";

export const createTeam = ({
  name = undefined,
  outOfTourney = undefined,
}: {
  name?: string;
  outOfTourney?: boolean;
} = {}): TeamSchema => {
  const teamData = findTeam(name);

  const group = teamData ? teamData.group : "A";

  const teamName = teamData ? teamData.name : netherlands;

  return {
    id: getFakerInfo("uuid"),
    name: teamName,
    flag: `flag-url-${teamName}`,
    group,
    outOfTourney: outOfTourney ?? false,
    createdAt: "2024-03-07T22:44:20.451Z",
    updatedAt: "2024-03-07T22:44:20.451Z",
  };
};

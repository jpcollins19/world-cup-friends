import { mapOverTeamsInAGroup, TeamSchema } from "../../store";
import {
  CreateGroupPicksSchema,
  createTeam,
  findTeamsInGroup,
  getFakerInfo,
} from "./";
import { GroupPicksState, PickSchema } from "../../store/group_picks_store";

export const createGroup = ({
  groupLetter = undefined,
}: {
  groupLetter?: string;
} = {}): TeamSchema[] => {
  const teamsInGroup = findTeamsInGroup(groupLetter);

  return teamsInGroup.map((team) => createTeam({ name: team.name }));
};

export const createGroupPicks_Pool = ({
  groups = [],
  userGroupPicks = [],
}: {
  groups?: TeamSchema[];
  userGroupPicks?: CreateGroupPicksSchema[];
} = {}): GroupPicksState => {
  const groupPicksPool: GroupPicksState = [];

  userGroupPicks.forEach((userGroupPick: CreateGroupPicksSchema) => {
    const userUuid = userGroupPick.userId;

    const userGroupPicks = userGroupPick.groupPicks;

    userGroupPicks.forEach((groupPick) => {
      const groupLetter = groupPick.group;

      mapOverTeamsInAGroup.forEach((finishingPos: number) => {
        const is1stPos = finishingPos === 1;
        const is2ndPos = finishingPos === 2;
        const is3rdPos = finishingPos === 3;
        const is4thPos = finishingPos === 4;

        let thirdPlaceToAdvanceToKo = false;

        let teamUuid;

        if (is1stPos) {
          teamUuid = getTeamUuid(groupPick[finishingPos], groups);
        }

        if (is2ndPos) {
          teamUuid = getTeamUuid(groupPick[finishingPos], groups);
        }

        if (is3rdPos) {
          teamUuid = getTeamUuid(groupPick[finishingPos], groups);
          thirdPlaceToAdvanceToKo = groupPick.thirdPlaceToAdvanceToKo;
        }

        if (is4thPos) {
          teamUuid = getTeamUuid(groupPick[finishingPos], groups);
        }

        const groupPickResult = createSingleGroupResult({
          userUuid,
          teamUuid,
          groupLetter,
          groupPlacement: finishingPos,
          thirdPlaceToAdvanceToKo,
        });

        groupPicksPool.push(groupPickResult);
      });
    });
  });

  return groupPicksPool;
};

export const createSingleGroupResult = ({
  userUuid = "",
  teamUuid = "",
  groupLetter = "",
  groupPlacement = 1,
  thirdPlaceToAdvanceToKo = false,
}: {
  userUuid?: string;
  teamUuid?: string;
  groupLetter?: string;
  groupPlacement?: number;
  thirdPlaceToAdvanceToKo?: boolean;
} = {}): PickSchema => {
  return {
    id: getFakerInfo("uuid"),
    userUuid,
    teamUuid,
    groupLetter,
    groupPlacement,
    thirdPlaceToAdvanceToKo,
    createdAt: "2024-03-07T22:44:20.451Z",
    updatedAt: "2024-03-07T22:44:20.451Z",
  };
};

const getTeam = (teamName: string, groups: TeamSchema[]): TeamSchema => {
  return groups.find((team) => team.name === teamName) as TeamSchema;
};

const getTeamUuid = (teamName: string, groups: TeamSchema[]): string => {
  const team = getTeam(teamName, groups);

  return team?.id as string;
};

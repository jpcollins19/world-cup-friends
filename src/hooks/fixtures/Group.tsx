import { TeamSchema } from "../../store";
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
    const userId = userGroupPick.userId;

    const userGroupPicks = userGroupPick.groupPicks;

    userGroupPicks.forEach((groupPick) => {
      // console.log("groupPick", groupPick);

      const group = groupPick.group;
      const thirdPlaceToAdvanceToKo = groupPick.thirdPlaceToAdvanceToKo;

      const first = groupPick["1"];
      const second = groupPick["2"];
      const third = groupPick["3"];
      const fourth = groupPick["4"];

      const firstFromGroupInfo: TeamSchema | undefined = groups.find(
        (team) => team.name! === first,
      );
      const secondFromGroupInfo: TeamSchema | undefined = groups.find(
        (team) => team.name === second,
      );
      const thirdFromGroupInfo: TeamSchema | undefined = groups.find(
        (team) => team.name === third,
      );
      const fourthFromGroupInfo: TeamSchema | undefined = groups.find(
        (team) => team.name === fourth,
      );

      // console.log("first", first);
      // console.log("firstFromGroupInfo", firstFromGroupInfo);
      // console.log("second", second);
      // console.log("secondFromGroupInfo", secondFromGroupInfo);
      // console.log("third", third);
      // console.log("thirdFromGroupInfo", thirdFromGroupInfo);
      // console.log("fourth", fourth);
      // console.log("fourthFromGroupInfo", fourthFromGroupInfo);
      //
      // console.log("groups", groups[0]);

      const firstGroupPickResult = {
        id: getFakerInfo("uuid"),
        userUuid: userId,
        teamUuid: firstFromGroupInfo?.id as string,
        groupLetter: group,
        groupPlacement: 1,
        thirdPlaceToAdvanceToKo: false,
        createdAt: "2024-03-07T22:44:20.451Z",
        updatedAt: "2024-03-07T22:44:20.451Z",
      };

      const secondGroupPickResult = {
        id: getFakerInfo("uuid"),
        userUuid: userId,
        teamUuid: secondFromGroupInfo?.id as string,
        groupLetter: group,
        groupPlacement: 2,
        thirdPlaceToAdvanceToKo: false,
        createdAt: "2024-03-07T22:44:20.451Z",
        updatedAt: "2024-03-07T22:44:20.451Z",
      };

      const thirdGroupPickResult = {
        id: getFakerInfo("uuid"),
        userUuid: userId,
        teamUuid: thirdFromGroupInfo?.id as string,
        groupLetter: group,
        groupPlacement: 3,
        thirdPlaceToAdvanceToKo,
        createdAt: "2024-03-07T22:44:20.451Z",
        updatedAt: "2024-03-07T22:44:20.451Z",
      };

      const fourthGroupPickResult = {
        id: getFakerInfo("uuid"),
        userUuid: userId,
        teamUuid: fourthFromGroupInfo?.id as string,
        groupLetter: group,
        groupPlacement: 4,
        thirdPlaceToAdvanceToKo: false,
        createdAt: "2024-03-07T22:44:20.451Z",
        updatedAt: "2024-03-07T22:44:20.451Z",
      };

      groupPicksPool.push(firstGroupPickResult);
      groupPicksPool.push(secondGroupPickResult);
      groupPicksPool.push(thirdGroupPickResult);
      groupPicksPool.push(fourthGroupPickResult);
    });
  });

  // const byah = {
  //   id: getFakerInfo("uuid"),
  //   userUuid: "123",
  //   teamUuid: "123",
  //   groupLetter: "123",
  //   groupPlacement: 1,
  //   thirdPlaceToAdvanceToKo: true,
  //   createdAt: "123",
  //   updatedAt: "123",
  // };

  return groupPicksPool;
};

export const createSingleGroupPick = ({
  groups = [],
  userGroupPicks = [],
}: {
  groups?: TeamSchema[];
  userGroupPicks?: CreateGroupPicksSchema[];
} = {}): PickSchema[] => {
  const byah = {
    id: "123",
    userUuid: "123",
    teamUuid: "123",
    groupLetter: "123",
    groupPlacement: 1,
    thirdPlaceToAdvanceToKo: true,
    createdAt: "123",
    updatedAt: "123",
  };

  return [byah];
};

import { TeamSchema, UserSchema, UserSingleGroupPickSchema } from "../../store";
import {
  generateRandomGroupOrder,
  getFakerInfo,
  UserSingleGroupPickSetupSchema,
} from "./";

export const createUser = ({
  tiebreaker = undefined,
  email = undefined,
  emailNotifications = undefined,
  name = undefined,
}: {
  tiebreaker?: number;
  email?: string;
  emailNotifications?: boolean;
  name?: string;
} = {}): UserSchema => {
  return {
    id: getFakerInfo("uuid"),
    email: email ?? getFakerInfo("email"),
    password: "123",
    name: name ?? getFakerInfo("name"),
    tiebreaker: tiebreaker ?? null,
    emailNotifications: emailNotifications ?? false,
    createdAt: "2024-03-07T22:44:20.451Z",
    updatedAt: "2024-03-07T22:44:20.451Z",
  };
};

export const createUserGroupPicks = ({
  groups = [],
  userGroupPicks = [],
}: {
  groups?: TeamSchema[];
  userGroupPicks?: UserSingleGroupPickSetupSchema[];
} = {}): UserSingleGroupPickSchema[] => {
  return userGroupPicks.map((userGroupPick: UserSingleGroupPickSetupSchema) => {
    const teamsInGroup = groups.filter(
      (group) => group.group === userGroupPick.group,
    );

    const groupPicks = generateRandomGroupOrder().reduce(
      (a: any, num: number, idx: number) => {
        a[num] = teamsInGroup[idx].name;
        return a;
      },
      {},
    );

    groupPicks.group = userGroupPick.group;
    groupPicks.thirdPlaceToAdvanceToKo = userGroupPick.thirdPlaceToAdvanceToKo;

    return groupPicks;
  });
};

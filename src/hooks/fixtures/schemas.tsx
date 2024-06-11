import { UserGroupPicksSchema } from "../../store";

export interface TeamDataSchema {
  name: string;
  group: string;
}

export type UserSingleGroupPickSetupSchema = {
  group: string;
  thirdPlaceToAdvanceToKo: boolean;
};

export type CreateGroupPicksSchema = {
  userId: string;
  groupPicks: UserGroupPicksSchema;
};

// interface GroupInfo {
//   [group: string]: string[];
// }

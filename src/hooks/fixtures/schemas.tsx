import { UserGroupPlacementsSchema } from "../../components/myPicks/unlocked/GroupPicksSchema";

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
  groupPicks: UserGroupPlacementsSchema;
};

// interface GroupInfo {
//   [group: string]: string[];
// }

import { TeamSchema } from "../teams_store";

export type calcPayoutSchema = {
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  numOfPicks: number;
};

export interface GroupPicksResult {
  group: string;

  [key: number]: string;

  thirdPlaceToAdvanceToKo: boolean;
}

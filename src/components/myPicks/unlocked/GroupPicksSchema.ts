import * as Yup from "yup";
import { TeamSchema } from "../../../store";

export type UserSingleGroupPlacementsSchema = {
  group: string;
  1: string;
  2: string;
  3: string;
  4: string;
  thirdPlaceToAdvanceToKo: boolean;
};
export type UserGroupPlacementsSchema = Array<UserSingleGroupPlacementsSchema>;

// export type TiebreakerSchema = {
//   tiebreaker: number | null;
// };

type Group = "A";

export type AdvanceToKoKeys = `${Group}3AdvanceToKo`;

export type UserGroupPicksSchema = {
  userUuid: string;
  A1: any;
  A2: any;
  A3: any;
  A4: any;
  A3AdvanceToKo: boolean;
  tiebreaker: string;
};

// export const useGroupPicksSchema = () => {
//   return Yup.object().shape({
//     tiebreaker: Yup.string().min(1).required(),
//     password: Yup.string().min(1).required(),
//   });
// };

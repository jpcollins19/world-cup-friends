import * as Yup from "yup";

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

export type UserGroupPicksSchema = {
  // groupPicks: UserGroupPlacementsSchema;
  tiebreaker: string;
};

// export const useGroupPicksSchema = () => {
//   return Yup.object().shape({
//     tiebreaker: Yup.string().min(1).required(),
//     password: Yup.string().min(1).required(),
//   });
// };

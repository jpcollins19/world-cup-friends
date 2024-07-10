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
export type UserGroupPicksSchema = {
  groups: UserGroupPlacementsSchema;
  tiebreaker: number;
};

const byah = 6;

export const useSignInSchema = () => {
  return Yup.object().shape({
    email: Yup.string().min(1).required(),
    password: Yup.string().min(1).required(),
  });
};

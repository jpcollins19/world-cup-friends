import * as Yup from "yup";

export type SignInSchema = {
  email: string;
  password: string;
};

export const useSignInSchema = () => {
  return Yup.object().shape({
    email: Yup.string().min(1).required(),
    password: Yup.string().min(1).required(),
  });
};

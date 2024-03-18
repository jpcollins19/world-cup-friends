import * as Yup from "yup";

export type CreateAccountSchema = {
  email: string;
  password: string;
};

export const useCreateAccountSchema = () => {
  return Yup.object().shape({
    email: Yup.string().min(1).required(),
    password: Yup.string().min(1).required(),
  });
};

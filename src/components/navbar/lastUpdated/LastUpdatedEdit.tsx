import * as React from "react";
import { authenticate, tw } from "../../../store";
import { useGetLastUpdated } from "../../../hooks";
import { TextField } from "../../buffet";
import { useFormik } from "formik";

export type LastUpdatedSchema = {
  answer: string;
};

export const LastUpdatedEdit: React.FunctionComponent = () => {
  const lastUpdated = useGetLastUpdated();

  const answer = "answer" in lastUpdated ? lastUpdated.answer : null;

  const onSubmit = async () => {
    // try {
    //   await dispatch(authenticate(values.email, values.password, history));
    // } catch (err: any) {
    //   resetForm({ values: { email: "", password: "" } });
    //   setInvalidCredentials(true);
    // }
  };

  const formik = useFormik<LastUpdatedSchema>({
    initialValues: {
      answer: "",
    },
    onSubmit,
    // onSubmit: onSubmit,
  });

  const { handleSubmit, values, setFieldValue, resetForm, isValid, dirty } =
    formik;

  const onChange = (ev: any) => {
    setFieldValue("answer", ev.target.value);
  };

  // return <TextField input={{ label: "joe" }} onChange={onChange} />;
  return "byah";
};

export default LastUpdatedEdit;

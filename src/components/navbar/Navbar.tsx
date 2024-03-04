import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import {
  geti18n,
  getMobileTestId,
  tDispatch,
  loadingDefault,
  useIsMobile,
  routes,
  tw,
  getPageTestId,
} from "../../store";
import { Loading } from "../buffet";
import Logo from "./Logo";

export const Navbar: React.FunctionComponent = () => {
  // const dispatch = tDispatch();

  // const onSubmit = async () => {
  //   try {
  //     await dispatch(authenticate(values.email, values.password, history));
  //   } catch (err: any) {
  //     resetForm({ values: { email: "", password: "" } });
  //     setInvalidCredentials(true);
  //   }
  // };
  //
  // const formik = useFormik<SignInSchema>({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: onSubmit,
  // });
  //
  // const { handleSubmit, values, setFieldValue, resetForm } = formik;
  //
  // const onChange = (ev: any) => {
  //   const isEmail = ev.target.name === emailString;
  //
  //   const value = ev.target.value;
  //
  //   if (isEmail) {
  //     setFieldValue(emailString, value);
  //   } else {
  //     setFieldValue(pwString, value);
  //   }
  // };

  const dataTestId = getPageTestId("navbar");

  return (
    <div data-testid={dataTestId} className={`${tw.flexBoth}`}>
      <Logo />
    </div>
  );
};

export default Navbar;

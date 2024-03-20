import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
// import {
//   geti18n,
//   getPageTestId,
//   getMobileTestId,
//   tDispatch,
//   loadingDefault,
//   useIsMobile,
//   routes,
//   tw,
// } from "../../store";
// import { Loading } from "../buffet";

export const TEMPLATE: React.FunctionComponent = () => {
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

  const testId = getPageTestId("signIn-page");

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div data-testid={testId} className={`${tw.flexBoth} h-full`}>
      {/*<FormikProvider value={formik}>*/}
      {/*  <Form*/}
      {/*    onSubmit={handleSubmit}*/}
      {/*    // id="sign-in"*/}
      {/*    className={`${tw.flexA} h-5/6 pt-10 flex-col`}*/}
      {/*  ></Form>*/}
      {/*</FormikProvider>*/}
    </div>
  );
};

export default TEMPLATE;

import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import {
  authenticate,
  geti18n,
  tDispatch,
  loadingDefault,
  useIsMobile,
  routes,
  tw,
  getMobileTestId,
  getPageTestId,
} from "../../store";
import {
  Button,
  ErrorMessage,
  LinkText,
  Loading,
  TextField,
  ToasterContainer,
  ToasterMessage,
} from "../buffet";
import { SignInSchema } from "./SignInSchema";

export const SignIn: React.FunctionComponent = () => {
  const dispatch = tDispatch();
  const history = useHistory();

  const pwString = geti18n("password");
  const emailString = geti18n("email");

  const [invalidCredentials, setInvalidCredentials] = React.useState(false);
  const [type, setType] = React.useState(pwString);

  const showPwClick = () => {
    const typeNeeded = type === emailString ? pwString : "text";

    setType(typeNeeded);
  };

  React.useEffect(() => {
    toast.dismiss();
  }, []);

  const isMobile = useIsMobile();

  const errorMessageComponent = (
    <ErrorMessage text={geti18n("invalidEmailOrPw")} isMobile={isMobile} />
  );

  React.useEffect(() => {
    if (invalidCredentials) {
      ToasterMessage({ component: errorMessageComponent });

      setTimeout(() => {
        setInvalidCredentials(false);
        // toast.dismiss();
      }, 5000);
    }
  }, [invalidCredentials]);

  // const joe = findJoe(useSelector(( state ) => state.users));

  const textFieldInputs = [{ label: emailString }, { label: pwString, type }];

  let linkTextInputs = [
    { route: routes.forgotPassword, text: geti18n("forgotPassword") },
    { route: routes.createAccount, text: geti18n("createAccount") },
    { route: routes.home, text: geti18n("cancel") },
  ];

  // if (joe?.tourneyStage > 1) {
  //     options = options.filter(
  //         ( option ) => option.route !== routes.createAccount);
  // }

  const onSubmit = async () => {
    try {
      await dispatch(authenticate(values.email, values.password, history));
    } catch (err: any) {
      resetForm({ values: { email: "", password: "" } });
      setInvalidCredentials(true);
    }
  };

  const formik = useFormik<SignInSchema>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: onSubmit,
  });

  const { handleSubmit, values, setFieldValue, resetForm } = formik;

  const onChange = (ev: any) => {
    const isEmail = ev.target.name === emailString;

    const value = ev.target.value;

    if (isEmail) {
      setFieldValue(emailString, value);
    } else {
      setFieldValue(pwString, value);
    }
  };

  const dataTestId = getPageTestId("signIn-page");

  const toasterContainerClass = isMobile ? "mt-36" : "mt-7";
  const signInContainerClass = isMobile ? "h-3/6 w-8/12" : "h-4/6 w-4/12";
  const headerClass = isMobile ? "text-6xl mt-20" : "text-4xl mt-10";
  const viewPwClass = isMobile ? "text-2xl" : "text-base";
  const linkTextClass = isMobile ? "mt-20" : "";

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div data-testid={dataTestId} className={`${tw.flexBoth} h-screen`}>
      <ToasterContainer
        className={`${toasterContainerClass} bg-rose-200 text-rose-700 p-0 ml-72`}
      />

      <div
        data-testid="signIn-cont"
        className={`${signInContainerClass} ${tw.elevate} border-solid border-2 border-black rounded-2xl bg-gradient-to-b from-blue-300 via-white to-blue-300`}
      >
        <h1
          data-testid="signIn-header"
          className={`${headerClass} text-center`}
        >
          {geti18n("signIn")}
        </h1>

        <FormikProvider value={formik}>
          <Form
            onSubmit={handleSubmit}
            id="sign-in"
            className={`${tw.flexA} h-5/6 pt-10 flex-col`}
          >
            {textFieldInputs.map((input, idx) => (
              <TextField
                key={idx}
                input={input}
                onChange={onChange}
                isMobile={isMobile}
              />
            ))}

            <div
              data-testid="signIn-view-pw"
              className={`${viewPwClass} text-center cursor-pointer mt-5`}
              onClick={() => showPwClick()}
            >
              {geti18n("viewPw")}
            </div>

            <div className="h-24">
              <Button
                text={geti18n("submit")}
                disabled={!values.email || !values.password}
                form="sign-in"
                isMobile={isMobile}
              />
            </div>

            <div data-testid="signIn-linkText" className={linkTextClass}>
              {linkTextInputs.map((input, idx) => (
                <LinkText key={idx} input={input} isMobile={isMobile} />
              ))}
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default SignIn;

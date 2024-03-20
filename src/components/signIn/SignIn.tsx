import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { useIsMobile } from "../../hooks";
import {
  authenticate,
  geti18n,
  getPageTestId,
  tDispatch,
  loadingDefault,
  routes,
  tw,
} from "../../store";
import {
  Button,
  ErrorMessage,
  LinkText,
  LinkTextInputProps,
  Loading,
  TextField,
  TextFieldInputProps,
  ToasterContainer,
  ToasterMessage,
} from "../buffet";
import { SignInSchema, useSignInSchema } from "./SignInSchema";

export const SignIn: React.FunctionComponent = () => {
  const dispatch = tDispatch();
  const history = useHistory();

  const pwStr = geti18n("password");
  const emailStr = geti18n("email");

  const [invalidCredentials, setInvalidCredentials] = React.useState(false);
  const [type, setType] = React.useState(pwStr);

  const showPwClick = () => {
    const typeNeeded = type === pwStr ? "text" : pwStr;

    setType(typeNeeded);
  };

  React.useEffect(() => {
    toast.dismiss();
  }, []);

  const errorMessageComponent = (
    <ErrorMessage text={geti18n("invalidEmailOrPw")} />
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

  const textFieldInputs: TextFieldInputProps[] = [
    { label: emailStr },
    { label: pwStr, type },
  ];

  let linkTextInputs: LinkTextInputProps[] = [
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
    validationSchema: useSignInSchema(),
  });

  const { handleSubmit, values, setFieldValue, resetForm, isValid, dirty } =
    formik;

  const onChange = (ev: any) => {
    const isEmail = ev.target.name === emailStr;

    const value = ev.target.value;

    if (isEmail) {
      setFieldValue(emailStr, value);
    } else {
      setFieldValue(pwStr, value);
    }
  };

  const testId = getPageTestId("sign-in-page");
  const mainContTestId = getPageTestId("sign-in-cont");
  const headerTestId = getPageTestId("sign-in-header");
  const viewPwTestId = getPageTestId("sign-in-view-pw");
  const linkTextContTestId = getPageTestId("sign-in-linkText-cont");
  const linkTextTestId = getPageTestId("sign-in-linkText");

  const isMobile = useIsMobile();

  const toasterContainerClass = isMobile ? "mt-36" : "mt-7";
  const signInContainerClass = isMobile ? "h-2/5 w-8/12" : "h-4/6 w-4/12";
  const headerClass = isMobile ? "text-6xl mt-20" : "text-4xl mt-10";
  const viewPwClass = isMobile ? "mt-8 mb-3 text-2xl" : "mt-5 mb-1 text-base";
  const linkTextContClass = isMobile ? "mt-5" : "mt-1";
  const linkTextClass = isMobile ? "mt-8" : "mt-4";

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div data-testid={testId} className={`${tw.flexBoth} h-screen`}>
      <ToasterContainer
        className={`${tw.errorMessageBackground} p-0 ml-17vw${toasterContainerClass} `}
      />

      <div
        data-testid={mainContTestId}
        className={`${tw.argentinaFlagBackground} ${tw.elevate} border-solid border-2 border-black rounded-2xl ${signInContainerClass}`}
      >
        <h1
          data-testid={headerTestId}
          className={`${tw.whiteTextMed} text-center ${headerClass} `}
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
                label={input.label}
                type={input.type ?? null}
                onChange={onChange}
                showValue={true}
                schema="signIn"
              />
            ))}

            <div
              data-testid={viewPwTestId}
              className={`text-center cursor-pointer ${viewPwClass} `}
              onClick={() => showPwClick()}
            >
              {geti18n("viewPw")}
            </div>

            <Button
              form="sign-in"
              text={geti18n("submit")}
              disabled={!isValid || !dirty}
            />

            <div data-testid={linkTextContTestId} className={linkTextContClass}>
              {linkTextInputs.map((input, idx) => (
                <div
                  key={idx}
                  data-testid={`${linkTextTestId}-${input.route}`}
                  className={linkTextClass}
                >
                  <LinkText key={idx} input={input} />
                </div>
              ))}
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default SignIn;

import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { useIsEmailInUse, useIsMobile, useIsNameInUse } from "../../hooks";
import {
  geti18n,
  getPageTestId,
  tDispatch,
  loadingDefault,
  routes,
  tw,
  createAuth,
  CreateAuthProps,
  formatEmail,
  validateEmail,
} from "../../store";
import {
  Button,
  ErrorMessage,
  LinkText,
  Loading,
  TextField,
  TextFieldInputProps,
  ToasterContainer,
  ToasterMessage,
} from "../buffet";
import {
  CreateAccountSchema,
  useCreateAccountSchema,
} from "./CreateAccountSchema";

export const CreateAccount: React.FunctionComponent = () => {
  const dispatch = tDispatch();
  const history = useHistory();

  const pwStr = geti18n("password");
  const emailStr = geti18n("email");

  const [invalidCredentials, setInvalidCredentials] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [type, setType] = React.useState(pwStr);

  const showPwClick = () => {
    const typeNeeded = type === pwStr ? "text" : pwStr;

    setType(typeNeeded);
  };

  React.useEffect(() => {
    toast.dismiss();
  }, []);

  const errorMessageComponent = <ErrorMessage text={errorMessage} />;

  React.useEffect(() => {
    if (invalidCredentials) {
      ToasterMessage({ component: errorMessageComponent });

      setTimeout(() => {
        setInvalidCredentials(false);
      }, 5000);
    }
  }, [invalidCredentials]);

  const confirmPwStr = geti18n("confirmPassword");

  const textFieldInputs: TextFieldInputProps[] = [
    { label: emailStr },
    { label: geti18n("name") },
    { label: pwStr, type },
    { label: confirmPwStr, type },
  ];

  // if (joe?.tourneyStage > 1) {
  //     options = options.filter(
  //         ( option ) => option.route !== routes.createAccount);
  // }

  const onSubmit = async () => {
    try {
      setErrorMessage("");

      const authEmail = formatEmail(values.email);

      if (!validateEmail(authEmail)) {
        setErrorMessage(geti18n("invalidEmail"));
        return setInvalidCredentials(true);
      }

      if (isEmailInUse) {
        setErrorMessage(geti18n("emailAlreadyInUse"));
        return setInvalidCredentials(true);
      }

      if (isNameInUse) {
        setErrorMessage(geti18n("nameAlreadyInUse"));
        return setInvalidCredentials(true);
      }

      const authPassword = values.password;

      if (authPassword !== values["confirm password"]) {
        setErrorMessage(geti18n("passwordNoMatch"));
        return setInvalidCredentials(true);
      }

      const auth: CreateAuthProps = {
        email: authEmail,
        name: values.name,
        password: authPassword,
      };

      await dispatch(createAuth(auth, history));
    } catch (err: any) {
      console.log("error in createAccount submit", err);
    }
  };

  const formik = useFormik<CreateAccountSchema>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      "confirm password": "",
    },
    onSubmit: onSubmit,
    validationSchema: useCreateAccountSchema(),
  });

  const { handleSubmit, values, setFieldValue, isValid, dirty } = formik;

  const onChange = (ev: any) => {
    setFieldValue(ev.target.name, ev.target.value);
  };

  const isEmailInUse = useIsEmailInUse(formatEmail(values.email));
  const isNameInUse = useIsNameInUse(values.name);

  const testId = getPageTestId("create-account-page");
  const mainContTestId = getPageTestId("create-account-cont");
  const headerTestId = getPageTestId("create-account-header");
  const viewPwTestId = getPageTestId("create-account-view-pw");
  const linkTextContTestId = getPageTestId("create-account-linkText-cont");

  const isMobile = useIsMobile();

  const toasterContainerClass = isMobile ? "mt-36" : "mt-3";
  const createAccountContainerClass = isMobile
    ? "h-3/6 w-8/12"
    : "h-fit w-4/12";
  const headerClass = isMobile ? "text-6xl mt-20" : "text-4xl mt-10";
  const viewPwClass = isMobile ? "text-2xl" : "text-base";
  const linkTextClass = isMobile ? "mt-20" : "font-bold";

  return loadingDefault() ? (
    <Loading />
  ) : (
    <div data-testid={testId} className={`${tw.flexBoth} h-screen`}>
      <ToasterContainer
        className={`${tw.errorMessageBackground} p-0 ml-17vw w-72 ${toasterContainerClass} `}
      />

      <div
        data-testid={mainContTestId}
        className={`${tw.argentinaFlagBackground} ${tw.elevate} border-solid border-2 border-black rounded-2xl ${createAccountContainerClass}`}
      >
        <h1
          data-testid={headerTestId}
          className={`${tw.whiteTextMed} text-center ${headerClass} `}
        >
          {geti18n("createAccount")}
        </h1>

        <FormikProvider value={formik}>
          <Form
            onSubmit={handleSubmit}
            id="create-account"
            className={`${tw.flexA} h-5/6 pt-10 flex-col`}
          >
            {textFieldInputs.map((input, idx) => (
              <TextField
                key={idx}
                label={input.label}
                type={input.type ?? null}
                onChange={onChange}
              />
            ))}

            <div
              data-testid={viewPwTestId}
              className={`text-center cursor-pointer mt-5 ${viewPwClass}`}
              onClick={() => showPwClick()}
            >
              {geti18n("viewPw")}
            </div>

            <Button
              form="create-account"
              text={geti18n("createAccount")}
              disabled={!isValid || !dirty}
            />

            <div data-testid={linkTextContTestId} className={linkTextClass}>
              <div className={`${tw.flexBoth} mt-2`}>
                <div className={`${tw.whiteTextSm} flex-2 mr-1 mb-0.5`}>
                  Already have an account?
                </div>
                <div className={`${tw.flexBoth} flex-5`}>
                  <LinkText
                    input={{ route: routes.signIn, text: "Sign in here" }}
                  />
                </div>
              </div>

              <div className="mt-4 mb-10">
                <LinkText
                  input={{ route: routes.home, text: geti18n("cancel") }}
                />
              </div>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default CreateAccount;

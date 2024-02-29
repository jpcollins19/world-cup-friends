import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { authenticate, geti18n, tDispatch, routes, tw } from "../../store";
import {
  Button,
  ErrorMessage,
  LinkText,
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

  // const isMobileView = getScreenWidth("max", 65);

  const showPwClick = () => {
    const typeNeeded = type === emailString ? pwString : "text";

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

  // const argentinaFlag = './messi'

  // const argentinaFlag =
  //   "https://cdn.britannica.com/18/147118-050-7F820ED5/flag-Argentina-2010.jpg";

  return (
    <div
      data-testid="signIn-page"
      className={`${tw.bRed} ${tw.flexBoth} h-full`}
    >
      <ToasterContainer className="bg-rose-200 text-rose-700 flex p-0 mt-7" />

      <div className="border-solid border-4 border-black rounded-2xl h-4/6 w-3/12">
        {/*<div className="bg-cover h-96"*/}
        {/*     style={{backgroundImage: `url("${argentinaFlag}")`}}*/}
        {/*>*/}

        <h1 className={`text-4xl text-center mt-10`}>{geti18n("signIn")}</h1>

        <FormikProvider value={formik}>
          <Form
            onSubmit={handleSubmit}
            id="sign-in"
            className={`${tw.bPurple} ${tw.flexA} h-5/6 pt-10 flex-col`}
          >
            {textFieldInputs.map((input, idx) => (
              <TextField key={idx} input={input} onChange={onChange} />
            ))}

            <div
              data-testid="view-pw"
              className="mt-10 text-base text-center cursor-pointer"
              onClick={() => showPwClick()}
            >
              {geti18n("viewPw")}
            </div>

            <Button
              text={geti18n("submit")}
              disabled={!values.email || !values.password}
              form="sign-in"
            />

            {linkTextInputs.map((input, idx) => (
              <LinkText key={idx} input={input} />
            ))}
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default SignIn;

import * as React from "react";
import { Form, FormikProvider, useFormik } from "formik";
// import {Link} from "react-router-dom";
// import { useAppDispatch } from "../hooks";
import {
  routes,
  authenticate,
  // getScreenWidth,
  // findJoe,
  // formatEmail,
  // routes,
  tw,
  geti18n,
  tDispatch,
} from "../../store";
import TextField from "../buffet/TextField";
import Button from "../buffet/Button";
import { SignInSchema } from "./SignInSchema";
import LinkText from "../buffet/LinkText";
// import Sign_In_Options from "../Sign_In_Options";
// import Button from "../../Misc/Button";
// import toast, {Toaster} from "react-hot-toast";
// import Error from "@mui/icons-material/ErrorOutline";

//const SignIn = () => {
export const SignIn: React.FunctionComponent = () => {
  // const SignIn = () => {
  //const dispatch = useDispatch();
  const dispatch = tDispatch();

  const pwString = geti18n("password");
  const emailString = geti18n("email");

  // const [email, setEmail] = React.useState(null);
  // const [password, setPassword] = React.useState(null);
  // const [showPW, setShowPW] = useState(false);
  const [type, setType] = React.useState(pwString);
  //const [invalidCredentials, setInvalidCredentials] = useState(false);

  // const isMobileView = getScreenWidth("max", 65);

  const showPwClick = () => {
    const typeNeeded = type === emailString ? pwString : emailString;

    setType(typeNeeded);
  };

  // useEffect(() => {
  //     setInvalidCredentials(false);
  //     toast.dismiss();
  // }, []);

  // useEffect(() => {
  //     if (invalidCredentials) {
  //         toast(
  //             <div>
  //                 <Error
  //                     color="red"
  //                     // fontSize={`${isMobileView ? "large" : "medium"}`}
  //                     fontSize="medium"
  //                 />
  //                 <div className="invalid-credentials-text">
  //                     Invalid Email Address and/or Password
  //                 </div>
  //             </div>,
  //             {
  //                 duration: 5000,
  //             }
  //         );
  //
  //         setTimeout(() => {
  //             setInvalidCredentials(false);
  //             toast.dismiss();
  //         }, 5500);
  //     }
  // }, [invalidCredentials]);

  // const joe = findJoe(useSelector(( state ) => state.users));

  const textFieldInputs = [
    { label: emailString },
    // { label: "password", type: showPW ? "text" : "password" },
    { label: pwString, type },
  ];

  const linkTextInputs = [
    { route: routes.forgotPassword, text: geti18n("forgotPassword") },
    { route: routes.createAccount, text: geti18n("createAccount") },
    { route: routes.home, text: geti18n("cancel") },
  ];

  // if (joe?.tourneyStage > 1) {
  //     options = options.filter(
  //         ( option ) => option.route !== routes.createAccount);
  // }

  // const onChange = (ev: any) => {
  //   const email = ev.target.name === "email";
  //
  //   const set = email ? setEmail : setPassword;
  //
  //   // const set = eval(`set${ev.target.name}`);
  //
  //   // ev.target.name === "email"
  //   //   ? set(formatEmail(ev.target.value))
  //   //   : set(ev.target.value);
  //
  //   set(ev.target.value);
  // };

  // const onSubmit = async (ev: any) => {
  //   ev.preventDefault();
  //   try {
  //     await dispatch(authenticate(values.email, values.password));
  //
  //     setTimeout(() => {
  //       if (window.localStorage.token) {
  //         location.hash = routes.leaderboard;
  //       } else {
  //         // setInvalidCredentials(true);
  //       }
  //     }, 200);
  //   } catch (err: any) {
  //     console.log(err.response);
  //   }
  // };

  const onSubmit = async () => {
    try {
      await dispatch(authenticate(values.email, values.password));

      setTimeout(() => {
        if (window.localStorage.token) {
          window.location.href = routes.leaderboard;
        } else {
          // setInvalidCredentials(true);
        }
      }, 200);
    } catch (err: any) {
      console.log(err.response);
    }
  };

  const formik = useFormik<SignInSchema>({
    initialValues: {
      email: null,
      password: null,
    },
    onSubmit: onSubmit,
  });

  const { handleSubmit, values, setFieldValue } = formik;

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
      {/*{invalidCredentials && (*/}
      {/*    <Toaster*/}
      {/*        toastOptions={{*/}
      {/*            className: "toaster-invalid-credentials",*/}
      {/*        }}*/}
      {/*    />*/}
      {/*)}*/}

      <div className="border-solid border-4 border-black rounded-2xl h-4/6 w-3/12">
        {/*<div className="bg-cover h-96"*/}
        {/*     style={{backgroundImage: `url("${argentinaFlag}")`}}*/}
        {/*>*/}

        {/*<div className="sign-in-text-cont">*/}
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
              className="mt-10 text-base text-center cursor-pointer"
              onClick={() => showPwClick()}
            >
              {geti18n("viewPw")}
            </div>
            <Button
              dataTestId="signIn-button"
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

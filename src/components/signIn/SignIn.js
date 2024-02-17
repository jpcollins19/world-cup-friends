import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {Link} from "react-router-dom";
import {
  routes,
  // authenticate,
  // getScreenWidth,
  // findJoe,
  // formatEmail,
  // routes,
  tw,
} from "../../store";
import TextField from "../buffet/TextField";
// import Sign_In_Options from "../Sign_In_Options";
// import Button from "../../Misc/Button";
// import toast, {Toaster} from "react-hot-toast";
// import Error from "@mui/icons-material/ErrorOutline";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPW, setShowPW] = useState(false);
  const [type, setType] = useState("text");
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  // const isMobileView = getScreenWidth("max", 65);

  const showPwClick = () => {
    const typeMapper = {
      text: "password",
      password: "text",
    };

    setType(typeMapper[type]);
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

  const inputs = [
    { label: "email", type },
    // { label: "password", type: showPW ? "text" : "password" },
    { label: "password", type },
  ];

  // let options = [
  //     {route: routes.forgotPassword, text: "Forgot Password"},
  //     {route: routes.createAccount, text: "Create Account"},
  //     {route: routes.home, text: "Cancel"},
  // ];

  // if (joe?.tourneyStage > 1) {
  //     options = options.filter(
  //         ( option ) => option.route !== routes.createAccount);
  // }

  const onChange = (ev) => {
    const set = eval(`set${ev.target.name}`);

    // ev.target.name === "Email"
    //     ? set(formatEmail(ev.target.value))
    //     : set(ev.target.value);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      dispatch(authenticate(email, password));

      setTimeout(() => {
        if (window.localStorage.token) {
          location.hash = routes.leaderboard;
        } else {
          setInvalidCredentials(true);
        }
      }, 200);
    } catch (err) {
      console.log(err.response);
    }
  };

  // const argentinaFlag = './messi'

  const argentinaFlag =
    "https://cdn.britannica.com/18/147118-050-7F820ED5/flag-Argentina-2010.jpg";

  return (
    <div data-testId="signIn-page" className={`${tw.bRed} ${tw.disAll} h-full`}>
      {/*{invalidCredentials && (*/}
      {/*    <Toaster*/}
      {/*        toastOptions={{*/}
      {/*            className: "toaster-invalid-credentials",*/}
      {/*        }}*/}
      {/*    />*/}
      {/*)}*/}

      <div className="border-solid border-4 border-black rounded-2xl h-3/5 w-3/12">
        {/*<div className="bg-cover h-96"*/}
        {/*     style={{backgroundImage: `url("${argentinaFlag}")`}}*/}
        {/*>*/}

        {/*<div className="sign-in-text-cont">*/}
        <h1 className={`text-4xl text-center mt-10`}>Sign In</h1>

        <form
          onSubmit={onSubmit}
          id="sign-in"
          className={`${tw.bPurple} ${tw.disA} h-5/6 pt-10 flex-col`}
        >
          {inputs.map((input, idx) => (
            <TextField key={idx} input={input} onChange={onChange} />
          ))}

          {/*<div className="view-pw"*/}
          {/*     onClick={() => showPwClick()}>*/}
          {/*    View Password*/}
          {/*</div>*/}

          {/*<div className="sign-in-button">*/}
          {/*    <Button*/}
          {/*        text="Sign In"*/}
          {/*        disabled={!email || !password}*/}
          {/*        form="sign-in"*/}
          {/*    />*/}
          {/*</div>*/}

          {/*{options.map(( option, idx ) => (*/}
          {/*    <Sign_In_Options key={idx} option={option}/>*/}
          {/*))}*/}
        </form>
      </div>

      {/*</div>*/}

      {/*</div>*/}
    </div>
  );
};

export default SignIn;

//     .sign-in-cont-outside {
//     padding: 1rem;
//     background: linear-gradient(to bottom right, #232628 0%, #090909 100%);
//     box-shadow: 0 1px 2px black, 0 2px 4px black, 0 4px 8px black,
//     0 -1px 2px black, 0 -2px 4px black, 0 -4px 8px black;
// }

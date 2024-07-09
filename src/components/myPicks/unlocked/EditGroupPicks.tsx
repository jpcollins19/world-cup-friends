import * as React from "react";
import {
  loadingDefault,
  getPageTestId,
  tDispatch,
  tw,
  routes,
  loadUsers,
  geti18n,
  groupLetters,
  authenticate,
} from "../../../store";
import {
  Button,
  ErrorMessage,
  LinkButton,
  LinkText,
  Loading,
  TextField,
} from "../../buffet";
import {
  useFindTourneyStage,
  useGetAuth,
  useUserGroupPicksSubmitted,
} from "../../../hooks";
import { Form, FormikProvider, useFormik } from "formik";
import { SignInSchema, useSignInSchema } from "../../signIn/SignInSchema";
// import MyGroupPicks from "./MyGroupPicks";
// import SingleGroup from "./SingleGroup";

export const EditGroupPicks: React.FunctionComponent = () => {
  const dispatch = tDispatch();

  // React.useEffect(() => {
  //   (async () => {
  //     await dispatch(loadUsers());
  //   })();
  // }, []);

  const [errorMessage, setErrorMessage] = React.useState(
    "Invalid Tiebreaker Below",
  );

  const testId = getPageTestId("edit-group-picks");

  const headerText = geti18n("editGroupPicksHeader");
  const subHeaderText = geti18n("editGroupPicksSubHeader");

  const onSubmit = async () => {
    try {
      // await dispatch(authenticate(values.email, values.password, history));
    } catch (err: any) {
      // resetForm({ values: { email: "", password: "" } });
      // setInvalidCredentials(true);
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
    setFieldValue("lastUpdated", ev.target.value);
  };

  return (
    <div data-testid={testId} className="min-h-screen">
      <div className={`${tw.flexBoth} flex-col whitespace-pre-wrap mt-5`}>
        <div className="text-center">{headerText}</div>
        <div className="text-sm mb-1">{subHeaderText}</div>

        <LinkText input={{ route: routes.myPicks, text: geti18n("cancel") }} />
      </div>

      <FormikProvider value={formik}>
        <Form
          onSubmit={handleSubmit}
          id="submit-group-picks"
          className={`${tw.flexA} ${tw.bPurple} pt-3 flex-col`}
        >
          <Button
            form="sign-in"
            text={geti18n("submit")}
            disabled={!isValid || !dirty}
          />

          <ErrorMessage text={errorMessage} showErrorBackground={true} />

          <div className={`${tw.flexBoth} text-xl`}>
            <div className="text-xl"> {geti18n("inputTiebreakerText")}</div>
            <TextField
              label="lastUpdated"
              onChange={onChange}
              showHelperText={false}
              height="short"
              width="small"
              showValue={true}
              schema="lastUpdated"
            />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default EditGroupPicks;

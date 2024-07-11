import * as React from "react";
import { useHistory } from "react-router-dom";
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
  updateUserGroupPicks,
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
import {
  UserGroupPicksSchema,
  UserGroupPlacementsSchema,
} from "./GroupPicksSchema";
// import MyGroupPicks from "./MyGroupPicks";
// import SingleGroup from "./SingleGroup";

export const EditGroupPicks: React.FunctionComponent = () => {
  const dispatch = tDispatch();
  const history = useHistory();

  // React.useEffect(() => {
  //   (async () => {
  //     await dispatch(loadUsers());
  //   })();
  // }, []);

  const [errorMessage, setErrorMessage] = React.useState(null);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  const testId = getPageTestId("edit-group-picks");

  const headerText = geti18n("editGroupPicksHeader");
  const subHeaderText = geti18n("editGroupPicksSubHeader");

  const user = useGetAuth();

  const onSubmit = async () => {
    try {
      console.log("values", values);

      await dispatch(updateUserGroupPicks(history, user.id, values.tiebreaker));
      //await dispatch(updateUserGroupPicks(history, values.tiebreaker));
    } catch (err: any) {
      console.log("ERROR:", err.message);

      setErrorMessage(err.message);

      setShowErrorMessage(true);

      // resetForm({ values: { email: "", password: "" } });
      // setInvalidCredentials(true);
    }
  };

  const formik = useFormik<UserGroupPicksSchema>({
    initialValues: {
      // groupPicks: [],
      tiebreaker: "",
    },
    onSubmit: onSubmit,
    // validationSchema: useGroupPicksSchema(),
  });

  const { handleSubmit, values, setFieldValue, resetForm, isValid, dirty } =
    formik;

  const onChange = (ev: any) => {
    setShowErrorMessage(false);

    setFieldValue("tiebreaker", ev.target.value);
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
          <div className="min-h-24">
            <Button
              form="submit-group-picks"
              text={geti18n("submit")}
              // disabled={!isValid || !dirty}
              disabled={!dirty}
            />
          </div>

          <div className={`${tw.flexBoth} text-xl`}>
            <div className="text-xl"> {geti18n("inputTiebreakerText")}</div>
            <TextField
              label="tiebreaker"
              onChange={onChange}
              showHelperText={false}
              height="short"
              width="small"
              showValue={true}
              // schema="tiebreaker"
            />
          </div>

          <div className="min-h-24">
            {showErrorMessage && (
              <ErrorMessage text={errorMessage} showErrorBackground={true} />
            )}
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default EditGroupPicks;

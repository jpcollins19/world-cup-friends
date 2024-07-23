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
  getUserGroupPlacementPick,
  TeamSchema,
  groupPickPlacements,
  convertTeamDropdown,
  getUserGroupThirdPlaceToAdvanceBoolean,
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
  useGetTeamsForGroupDropdown,
  useGetUserGroupPicks,
  useUserGroupPicksSubmitted,
} from "../../../hooks";
import { Form, FormikProvider, useFormik } from "formik";
import { SignInSchema, useSignInSchema } from "../../signIn/SignInSchema";
import { UserGroupPicksSchema } from "./GroupPicksSchema";
import Dropdown from "../../buffet/Dropdown";
import { useGetTeams } from "../../../hooks/teamHooks";
import EditSingleGroup from "./EditSingleGroup";
// import MyGroupPicks from "./MyGroupPicks";
// import SingleGroup from "./SingleGroup";

export const EditGroupPicks: React.FunctionComponent = () => {
  const dispatch = tDispatch();
  const history = useHistory();

  // React.useEffect(() => {
  //   (async () => {
  //     await loadUserGroupPicks();
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

      await dispatch(updateUserGroupPicks(history, values));
    } catch (err: any) {
      console.log("ERROR:", err.message);

      setErrorMessage(err.message);

      setShowErrorMessage(true);
    }
  };

  const formik = useFormik<UserGroupPicksSchema>({
    initialValues: {
      userUuid: user.id,
      A1: getUserGroupPlacementPick(groupPickPlacements.A1),
      A2: getUserGroupPlacementPick(groupPickPlacements.A2),
      A3: getUserGroupPlacementPick(groupPickPlacements.A3),
      A4: getUserGroupPlacementPick(groupPickPlacements.A4),
      A3AdvanceToKo: getUserGroupThirdPlaceToAdvanceBoolean(
        groupPickPlacements.A3,
      ),
      // A1: getUserGroupPlacementPick(groupPickPlacements.A1),
      // A2: getUserGroupPlacementPick(groupPickPlacements.A2),
      // A3: getUserGroupPlacementPick(groupPickPlacements.A3),
      // A4: getUserGroupPlacementPick(groupPickPlacements.A4),
      tiebreaker: user.tiebreaker ? user.tiebreaker.toString() : "",
    },

    onSubmit: onSubmit,
    // validationSchema: useGroupPicksSchema(),
  });

  const { handleSubmit, values, setFieldValue, resetForm, isValid, dirty } =
    formik;

  const adjustTieBreaker = (ev: any) => {
    setFieldValue("tiebreaker", ev.target.value);
  };

  const onDropdownChange = (
    groupLetter: string,
    team: TeamSchema,
    placement: number,
  ) => {
    const groupPlacement = `${groupLetter}${placement}`;

    // setShowErrorMessage(false);

    setFieldValue(groupPlacement, convertTeamDropdown(team));
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
              onChange={adjustTieBreaker}
              showHelperText={false}
              height="short"
              width="small"
              showValue={true}
            />
          </div>

          <div className="min-h-24">
            {showErrorMessage && (
              <ErrorMessage text={errorMessage} showErrorBackground={true} />
            )}
          </div>

          <div className={`${tw.flexBoth} ${tw.shrinkTextBase} flex-wrap pb-5`}>
            {/*{groupLetters.map((groupLetter) => (*/}
            {/*  <EditSingleGroup*/}
            {/*    key={groupLetter}*/}
            {/*    onChange={onChange}*/}
            {/*    groupLetter={groupLetter}*/}
            {/*  />*/}
            {/*))}*/}

            <EditSingleGroup
              onDropdownChange={onDropdownChange}
              groupLetter={"A"}
            />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default EditGroupPicks;

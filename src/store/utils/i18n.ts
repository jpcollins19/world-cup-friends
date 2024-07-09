import { tourneyStartDate } from "./variables";

export const en = {
  adjustGroupPicks: "Adjust Group Picks",
  cancel: "Cancel",
  confirmPassword: "confirm password",
  createAccount: "Create Account",
  createAnAccount: "Create An Account",
  edit: "Edit",
  editGroupPicksHeader:
    "Select a country from the dropdowns to rank where you think they will finish in their group. \nIf you think the 3rd place team will advance from the group, check the box.",
  editGroupPicksSubHeader: "(must select eight 3rd place teams to advance)",
  email: "email",
  emailAlreadyInUse: "Email already in use",
  emailNotificationsOptIn: "Opt me into email notifications",
  emailNotificationsOptOut: "Opt me out of email notifications",
  emailNotificationExplanation:
    "Email notifications can be sent out to you each time the website is updated!",
  forgotPassword: "Forgot Password",
  inputTiebreakerText: "Tiebreaker: total number of goals scored:",
  invalidEmail: "Invalid Email Address",
  invalidEmailOrPw: "Invalid Email Address and/or Password",
  myProfile: "My Profile",
  name: "name",
  nameAlreadyInUse: "Name already in use",
  pageNotAvailableUntilTourneyStarts: `will not be viewable until the tournament commences on ${tourneyStartDate}`,
  password: "password",
  passwordNoMatch: "Passwords do not match",
  rules: "Rules/General Info",
  save: "Save",
  selectGroupPicks: "Select Group Picks",
  signIn: "Sign In",
  signOut: "Sign Out",
  submit: "Submit",
  thirdPlaceTeamAdvance: "3rd place team selected to advance from group",
  viewPw: "View password",
};

export type i18nOptionsTypes =
  | "adjustGroupPicks"
  | "cancel"
  | "confirmPassword"
  | "createAccount"
  | "createAnAccount"
  | "edit"
  | "editGroupPicksHeader"
  | "editGroupPicksSubHeader"
  | "email"
  | "emailAlreadyInUse"
  | "emailNotificationExplanation"
  | "emailNotificationsOptIn"
  | "emailNotificationsOptOut"
  | "forgotPassword"
  | "inputTiebreakerText"
  | "invalidEmail"
  | "invalidEmailOrPw"
  | "myProfile"
  | "name"
  | "nameAlreadyInUse"
  | "pageNotAvailableUntilTourneyStarts"
  | "password"
  | "passwordNoMatch"
  | "rules"
  | "save"
  | "selectGroupPicks"
  | "signIn"
  | "signOut"
  | "submit"
  | "thirdPlaceTeamAdvance"
  | "viewPw";

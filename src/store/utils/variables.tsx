export const tourneyStartDate = "6/14/2024";
export const stage1DueDate = "2/15/24";
export const lastDayOfGroupStage = "2/16/24";
export const firstDayOfKoStage = "2/17/24";

export const routes = {
  accountCreated: "account-created",
  admin: "/admin",
  home: "/",
  createAccount: "/create-account",
  forgotPassword: "/forgot-password",
  groupDetails: "/group-details",
  editProfileEmailNotifications: "/edit-profile-email-notifications",
  leaderboard: "/leaderboard",
  myPicks: "/my-picks",
  myPicksEdit: "/my-picks-edit",
  myProfile: "/my-profile",
  noMatch: "*",
  poolPicks: "/pool-picks",
  rules: "/rules",
  signIn: "/sign-in",
  signOut: "/sign-out",
};

export const colors = {
  black: "#020617",
  lightGrey: "#cbd5e1", //grey-300
  darkGrey: "#424242", //grey-800
  red: "#b91c1c",
};

export const tw = {
  argentinaFlagBackground:
    "bg-gradient-to-b from-blue-300 via-white to-blue-300",
  cursorArrow: "cursor-default",
  cursorFingerPointer: "cursor-pointer",
  backgroundImage: "min-h-screen bg-cover bg-center",
  bDodger: "border-solid border-4 border-blue-500",
  bLime: "border-solid border-4 border-lime-500",
  bPurple: "border-solid border-4 border-purple-700",
  bRed: "border-solid border-4 border-red-700",
  elevate: "shadow-xl hover:shadow-xl transition duration-300 ease-in-out",
  errorMessageBackground: "bg-rose-200 text-rose-700",
  flexA: "flex items-center",
  flexBoth: "flex justify-center items-center",
  flexJ: "flex justify-center",
  overFlowAuto: "overflow-auto",
  shrinkTextBase: "text-vwBase",
  shrinkTextLg: "text-vwLg",
  shrinkTextXLg: "text-vwXLg",
  shrinkText2XLg: "text-vw2XLg",
  shrinkTextSm: "text-vwSm",
  textShadowSmWhite: "text-shadow-smWhite",
  whiteTextMed: "text-shadow-med text-white", //3px shadow
  whiteTextSm: "text-shadow-sm text-white", //1.5px shadow
};

export const navbarBackground = `bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700`;

export const navbarMenuListClass = `${tw.flexA} ${tw.whiteTextSm} hover:${tw.elevate} hover:bg-sky-400 hover:shadow-routesHover w-full py-2`;

export const groupLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

// export const mapOverTeamsInAGroup = ["1", "2", "3", "4"];
export const mapOverTeamsInAGroup = [1, 2, 3, 4];

export const groupDetailColumns = [
  "MP",
  "W",
  "D",
  "L",
  "plusMinus",
  "GD",
  "Pts",
];

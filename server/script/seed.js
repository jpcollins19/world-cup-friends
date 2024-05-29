const {
  db,
  User,
  Team,
  GroupPick,
  TourneyStage,
  LastUpdated,
} = require("../db/index.js");

const tourneyStage = 1;
const lastUpdated = "4/9/24 at 1:30 PM CT";

const netherlands = "Netherlands";
const ecuador = "Ecuador";
const senegal = "Senegal";
const qatar = "Qatar";
const england = "England";
const usa = "USA";
const wales = "Wales";
const iran = "Iran";
const argentina = "Argentina";
const mexico = "Mexico";
const poland = "Poland";
const saudiArabia = "Saudi Arabia";
const france = "France";
const denmark = "Denmark";
const australia = "Australia";
const tunisia = "Tunisia";
const germany = "Germany";
const spain = "Spain";
const japan = "Japan";
const costaRica = "Costa Rica";
const belgium = "Belgium";
const croatia = "Croatia";
const morocco = "Morocco";
const canada = "Canada";
const scotland = "Scotland";
const hungary = "Hungary";
const switzerland = "Switzerland";
const italy = "Italy";
const albania = "Albania";
const slovenia = "Slovenia";
const austria = "Austria";
const romania = "Romania";
const serbia = "Serbia";
const ukraine = "Ukraine";
const turkey = "Turkey";
const georgia = "Georgia";
const cuba = "Cuba";
const cameroon = "Cameroon";
const slovakia = "Slovakia";
const egypt = "Egypt";
const mali = "Mali";
const nigeria = "Nigeria";
const iraq = "Iraq";
const colombia = "Colombia";
const northMacedonia = "North Macedonia";
const jamaica = "Jamaica";
const sweden = "Sweden";
const chile = "Chile";

const groupInfo = {
  A: [netherlands, ecuador, senegal, qatar],
  B: [england, usa, wales, iran],
  C: [argentina, mexico, poland, saudiArabia],
  D: [france, denmark, australia, tunisia],
  E: [germany, spain, japan, costaRica],
  F: [belgium, croatia, morocco, canada],
  G: [scotland, hungary, switzerland, italy],
  H: [albania, slovenia, austria, romania],
  I: [serbia, ukraine, turkey, georgia],
  J: [cuba, cameroon, slovakia, egypt],
  K: [mali, nigeria, iraq, colombia],
  L: [northMacedonia, jamaica, sweden, chile],
};

const teamFlagMapperData = [
  { name: usa, mapTo: "United_States" },
  { name: saudiArabia, mapTo: "Saudi_Arabia" },
  { name: costaRica, mapTo: "Costa_Rica" },
  { name: northMacedonia, mapTo: "Macedonia" },
];

const getFlagUrl = (teamName) => {
  const oneOffTeams = teamFlagMapperData.map((t) => t.name);

  if (oneOffTeams.includes(teamName)) {
    const teamData = teamFlagMapperData.find((t) => teamName === t.name);

    teamName = teamData.mapTo;
  }

  return `https://www.sciencekids.co.nz/images/pictures/flags680/${teamName}.jpg`;
};

const createTeamData = (groupInfo) => {
  return Object.entries(groupInfo).reduce((a, entry) => {
    const group = entry[0];
    const teams = entry[1];

    teams.forEach((teamName) => {
      const teamData = {
        name: teamName,
        group,
        flag: getFlagUrl(teamName),
      };

      a.push(teamData);
    });

    return a;
  }, []);
};

//creating each teams teamData obj
const teams = createTeamData(groupInfo);

const users = [
  {
    email: "jpatcollins@gmail.com",
    password: "nugget",
    name: "Joe",
    isAdmin: true,
    paid: true,
    tiebreaker: 101,
    emailNotifications: true,
  },
  {
    email: "joseph.collins@toasttab.com",
    password: "stan",
    name: "Stan",
    paid: true,
    tiebreaker: 101,
    emailNotifications: true,
  },
  {
    email: "kelly@gmail.com",
    password: "kelly",
    name: "Kelly",
    paid: true,
    tiebreaker: 80,
  },
  {
    email: "coach@gmail.com",
    password: "coach",
    name: "Coach",
    tiebreaker: 120,
  },
  {
    email: "aboona@gmail.com",
    password: "aboona",
    name: "Aboona",
    tiebreaker: 115,
  },
  {
    email: "jack@gmail.com",
    password: "jack",
    name: "Jack",
  },
];

const createGroupPicks = (userPicks, userUuid, thirdPlacePicks) => {
  userPicks.forEach((groupPicks) => {
    groupPicks.forEach(async (team, idx) => {
      const placement = idx + 1;

      const isThirdPlace = placement === 3;

      let thirdPlaceToAdvanceToKo = false;

      if (isThirdPlace && team.name === thirdPlacePicks[team.group]) {
        thirdPlaceToAdvanceToKo = true;
      }

      await GroupPick.create({
        userUuid: userUuid,
        teamUuid: team.id,
        groupLetter: team.group,
        groupPlacement: placement,
        thirdPlaceToAdvanceToKo,
      });
    });
  });
};

const syncAndSeed = async () => {
  await db.sync({ force: true });

  //seeding team data
  /////////////////////////////////////////////////////////////
  const [
    Netherlands,
    Ecuador,
    Senegal,
    Qatar,
    England,
    USA,
    Wales,
    Iran,
    Argentina,
    Mexico,
    Poland,
    Saudi_Arabia,
    France,
    Denmark,
    Australia,
    Tunisia,
    Germany,
    Spain,
    Japan,
    Costa_Rica,
    Belgium,
    Croatia,
    Morocco,
    Canada,
    Scotland,
    Hungary,
    Switzerland,
    Italy,
    Albania,
    Slovenia,
    Austria,
    Romania,
    Serbia,
    Ukraine,
    Turkey,
    Georgia,
    Cuba,
    Cameroon,
    Slovakia,
    Egypt,
    Mali,
    Nigeria,
    Iraq,
    Colombia,
    North_Macedonia,
    Jamaica,
    Sweden,
    Chile,
  ] = await Promise.all(
    teams.map((t) =>
      Team.create({
        name: t.name,
        flag: t.flag,
        group: t.group,
      }),
    ),
  );

  //seeding user data
  /////////////////////////////////////////////////////////////

  const [Joe, Stan, Kelly, Coach, Aboona, Jack] = await Promise.all(
    users.map((u) =>
      User.create({
        email: u.email,
        password: u.password,
        name: u.name,
        isAdmin: u.isAdmin,
        paid: u.paid,
        tiebreaker: u.tiebreaker,
        emailNotifications: u.emailNotifications,
      }),
    ),
  );

  const jPicks_A = [Netherlands, Ecuador, Senegal, Qatar];
  const jPicks_B = [England, USA, Wales, Iran];
  const jPicks_C = [Argentina, Mexico, Poland, Saudi_Arabia];
  const jPicks_D = [France, Denmark, Australia, Tunisia];
  const jPicks_E = [Germany, Spain, Japan, Costa_Rica];
  const jPicks_F = [Belgium, Croatia, Morocco, Canada];
  const jPicks_G = [Scotland, Hungary, Switzerland, Italy];
  const jPicks_H = [Albania, Slovenia, Austria, Romania];
  const jPicks_I = [Serbia, Ukraine, Turkey, Georgia];
  const jPicks_J = [Cuba, Cameroon, Slovakia, Egypt];
  const jPicks_K = [Mali, Nigeria, Iraq, Colombia];
  const jPicks_L = [North_Macedonia, Jamaica, Sweden, Chile];

  const joeThirdPlace = {
    A: senegal,
    C: poland,
    D: australia,
    F: morocco,
    I: turkey,
    J: slovakia,
    K: iraq,
    L: sweden,
  };

  const joePicks = [
    jPicks_A,
    jPicks_B,
    jPicks_C,
    jPicks_D,
    jPicks_E,
    jPicks_F,
    jPicks_G,
    jPicks_H,
    jPicks_I,
    jPicks_J,
    jPicks_K,
    jPicks_L,
  ];

  const kPicks_A = [Senegal, Netherlands, Ecuador, Qatar];
  const kPicks_B = [Iran, USA, England, Wales];
  const kPicks_C = [Poland, Mexico, Argentina, Saudi_Arabia];
  const kPicks_D = [Denmark, Tunisia, Australia, France];
  const kPicks_E = [Japan, Spain, Germany, Costa_Rica];
  const kPicks_F = [Morocco, Belgium, Canada, Croatia];
  const kPicks_G = [Switzerland, Italy, Scotland, Hungary];
  const kPicks_H = [Romania, Albania, Slovenia, Austria];
  const kPicks_I = [Ukraine, Serbia, Georgia, Turkey];
  const kPicks_J = [Cuba, Slovakia, Cameroon, Egypt];
  const kPicks_K = [Nigeria, Colombia, Iraq, Mali];
  const kPicks_L = [Jamaica, Sweden, Chile, North_Macedonia];

  const kellyThirdPlace = {
    C: argentina,
    E: germany,
    F: canada,
    G: scotland,
    H: slovenia,
    I: georgia,
    J: cameroon,
    K: iraq,
  };

  const kellyPicks = [
    kPicks_A,
    kPicks_B,
    kPicks_C,
    kPicks_D,
    kPicks_E,
    kPicks_F,
    kPicks_G,
    kPicks_H,
    kPicks_I,
    kPicks_J,
    kPicks_K,
    kPicks_L,
  ];

  const cPicks_A = [Qatar, Ecuador, Senegal, Netherlands];
  const cPicks_B = [Wales, England, USA, Iran];
  const cPicks_C = [Poland, Argentina, Mexico, Saudi_Arabia];
  const cPicks_D = [Tunisia, Denmark, France, Australia];
  const cPicks_E = [Japan, Costa_Rica, Spain, Germany];
  const cPicks_F = [Canada, Belgium, Croatia, Morocco];
  const cPicks_G = [Scotland, Italy, Switzerland, Hungary];
  const cPicks_H = [Albania, Austria, Romania, Slovenia];
  const cPicks_I = [Serbia, Ukraine, Georgia, Turkey];
  const cPicks_J = [Egypt, Cuba, Cameroon, Slovakia];
  const cPicks_K = [Colombia, Nigeria, Iraq, Mali];
  const cPicks_L = [Jamaica, North_Macedonia, Chile, Sweden];

  const coachThirdPlace = {
    C: mexico,
    D: france,
    E: spain,
    G: switzerland,
    H: romania,
    I: georgia,
    K: iraq,
    L: chile,
  };

  const coachPicks = [
    cPicks_A,
    cPicks_B,
    cPicks_C,
    cPicks_D,
    cPicks_E,
    cPicks_F,
    cPicks_G,
    cPicks_H,
    cPicks_I,
    cPicks_J,
    cPicks_K,
    cPicks_L,
  ];

  const aPicks_A = [Qatar, Ecuador, Netherlands, Senegal];
  const aPicks_B = [England, Iran, Wales, USA];
  const aPicks_C = [Argentina, Mexico, Saudi_Arabia, Poland];
  const aPicks_D = [Tunisia, France, Australia, Denmark];
  const aPicks_E = [Spain, Costa_Rica, Germany, Japan];
  const aPicks_F = [Morocco, Canada, Croatia, Belgium];
  const aPicks_G = [Italy, Hungary, Switzerland, Scotland];
  const aPicks_H = [Slovenia, Austria, Romania, Albania];
  const aPicks_I = [Serbia, Ukraine, Turkey, Georgia];
  const aPicks_J = [Slovakia, Cameroon, Egypt, Cuba];
  const aPicks_K = [Colombia, Nigeria, Iraq, Mali];
  const aPicks_L = [Jamaica, Chile, Sweden, North_Macedonia];

  const aboonaThirdPlace = {
    A: netherlands,
    D: australia,
    E: germany,
    F: croatia,
    G: switzerland,
    I: turkey,
    J: egypt,
    L: sweden,
  };

  const aboonaPicks = [
    aPicks_A,
    aPicks_B,
    aPicks_C,
    aPicks_D,
    aPicks_E,
    aPicks_F,
    aPicks_G,
    aPicks_H,
    aPicks_I,
    aPicks_J,
    aPicks_K,
    aPicks_L,
  ];

  createGroupPicks(joePicks, Joe.id, joeThirdPlace);
  createGroupPicks(joePicks, Stan.id, joeThirdPlace);
  createGroupPicks(kellyPicks, Kelly.id, kellyThirdPlace);
  createGroupPicks(coachPicks, Coach.id, coachThirdPlace);
  createGroupPicks(aboonaPicks, Aboona.id, aboonaThirdPlace);

  await TourneyStage.create({
    stage: tourneyStage,
  });

  await LastUpdated.create({
    answer: lastUpdated,
  });
};

module.exports = syncAndSeed;

import { TeamDataSchema } from "./";

export const userNames = [
  "Joe",
  "Anna",
  "Kelly",
  "Aboona",
  "Kevin",
  "Mark",
  "Adam",
  "Karen",
  "Daniel",
  "Geno",
  "Ogre",
  "Josh",
  "James",
  "Gregg",
  "Masha",
  "Jill",
  "Kate",
  "Erin",
  "Nicole",
  "Ryan",
  "Craig",
  "Alex",
  "Josie",
];

export const emails = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "mike.jones@example.com",
  "emily.white@example.com",
  "chris.evans@example.com",
  "lisa.johnson@example.com",
  "alex.martin@example.com",
  "sarah.brown@example.com",
  "jason.wilson@example.com",
  "amanda.taylor@example.com",
  "kevin.carter@example.com",
  "olivia.anderson@example.com",
  "daniel.hill@example.com",
  "sophia.roberts@example.com",
  "brian.collins@example.com",
  "lauren.morris@example.com",
  "matthew.miller@example.com",
  "anna.murphy@example.com",
  "timothy.baker@example.com",
  "jessica.ross@example.com",
];

export const netherlands = "Netherlands";
export const ecuador = "Ecuador";
export const senegal = "Senegal";
export const qatar = "Qatar";
export const england = "England";
export const usa = "USA";
export const wales = "Wales";
export const iran = "Iran";
export const argentina = "Argentina";
export const mexico = "Mexico";
export const poland = "Poland";
export const saudiArabia = "Saudi Arabia";
export const france = "France";
export const denmark = "Denmark";
export const australia = "Australia";
export const tunisia = "Tunisia";
export const germany = "Germany";
export const spain = "Spain";
export const japan = "Japan";
export const costaRica = "Costa Rica";
export const belgium = "Belgium";
export const croatia = "Croatia";
export const morocco = "Morocco";
export const canada = "Canada";
export const scotland = "Scotland";
export const hungary = "Hungary";
export const switzerland = "Switzerland";
export const italy = "Italy";
export const albania = "Albania";
export const slovenia = "Slovenia";
export const austria = "Austria";
export const romania = "Romania";
export const serbia = "Serbia";
export const ukraine = "Ukraine";
export const turkey = "Turkey";
export const georgia = "Georgia";
export const cuba = "Cuba";
export const cameroon = "Cameroon";
export const slovakia = "Slovakia";
export const egypt = "Egypt";
export const mali = "Mali";
export const nigeria = "Nigeria";
export const iraq = "Iraq";
export const colombia = "Colombia";
export const northMacedonia = "N. Macedonia";
export const jamaica = "Jamaica";
export const sweden = "Sweden";
export const chile = "Chile";

export const groupInfo = {
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

export const createTeamsByGroup = (): TeamDataSchema[] => {
  return Object.entries(groupInfo).reduce<TeamDataSchema[]>((a, entry) => {
    const group = entry[0];
    const teams = entry[1];

    teams.forEach((teamName: string) => {
      const teamData: TeamDataSchema = {
        name: teamName,
        group,
      };

      a.push(teamData);
    });

    return a;
  }, []);
};

export const teamsByGroup = createTeamsByGroup();

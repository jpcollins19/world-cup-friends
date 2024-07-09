import * as React from "react";
import { loadingDefault } from "../../../store";
import { Loading } from "../../buffet";
import { useFindTourneyStage } from "../../../hooks";
import EditGroupPicks from "./EditGroupPicks";

export const EditMyPicks: React.FunctionComponent = () => {
  const tourneyStage = useFindTourneyStage();

  return loadingDefault() ? (
    <Loading />
  ) : tourneyStage === 1 ? (
    <EditGroupPicks />
  ) : null;
};

export default EditMyPicks;

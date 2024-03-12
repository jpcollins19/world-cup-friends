import { useSelector } from "react-redux";
import { LastUpdatedState, RootState, TourneyStageState } from "../store";

export const useFindTourneyStage = (): number | TourneyStageState => {
  return useSelector((state: RootState) => state.tourneyStage);
};

export const useGetLastUpdated = (): LastUpdatedState => {
  return useSelector((state: RootState) => state.lastUpdated);
};

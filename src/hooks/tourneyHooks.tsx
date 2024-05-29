import { useSelector } from "react-redux";
import { LastUpdatedState, RootState, TourneyStageState } from "../store";

export const useFindTourneyStage = (): number => {
  const stage = useSelector((state: RootState) => state.tourneyStage);
  return Number(stage);
};

export const useGetLastUpdated = (): LastUpdatedState => {
  return useSelector((state: RootState) => state.lastUpdated);
};

export const useHasTourneyStarted = (): boolean => {
  const tourneyStage = useFindTourneyStage();
  return tourneyStage > 1;
};

import axios from "axios";

const LOAD_TOURNEY_STAGE = "LOAD_TOURNEY_STAGE";

export const _loadTourneyStage = (stage: any) => {
  return { type: LOAD_TOURNEY_STAGE, stage };
};

export const loadTourneyStage = () => {
  return async (dispatch: any) => {
    const stage = (await axios.get("/api/tourney-stage")).data;
    dispatch(_loadTourneyStage(stage.stage));
  };
};

export type TourneyStageSchema = {
  id: null;
  stage: null;
};

export interface TourneyStageState extends TourneyStageSchema {}

export default function (
  state: TourneyStageState = { id: null, stage: null },
  action: any,
) {
  switch (action.type) {
    case LOAD_TOURNEY_STAGE:
      return action.stage;
    default:
      return state;
  }
}

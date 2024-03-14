import axios from "axios";

const LOAD_LAST_UPDATED = "LOAD_LAST_UPDATED";

export const _loadLastUpdated = (answer: any) => {
  return { type: LOAD_LAST_UPDATED, answer };
};

export const loadLastUpdated = () => {
  return async (dispatch: any) => {
    const answer = (await axios.get("/api/last-updated")).data;

    dispatch(_loadLastUpdated(answer));
  };
};

export const updateLastUpdated = (lastUpdated: any) => {
  return async (dispatch: any) => {
    console.log("thunk started");
    lastUpdated = (
      await axios.put(`/api/last-updated/${lastUpdated.id}`, lastUpdated)
    ).data;

    console.log("end of thunk");
  };
};

export type LastUpdatedSchema = {
  id: null;
  answer: null;
};

export interface LastUpdatedState extends LastUpdatedSchema {}

export default function (
  state: LastUpdatedState = { id: null, answer: null },
  action: any,
) {
  switch (action.type) {
    case LOAD_LAST_UPDATED:
      return action.answer;
    default:
      return state;
  }
}

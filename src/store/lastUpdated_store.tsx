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

export const updateLastUpdated = (answer: string) => {
  return async () => {
    const lastUpdatedId = (await axios.get("/api/last-updated")).data.id;

    const lastUpdated = { id: lastUpdatedId, answer };

    (await axios.put(`/api/last-updated/${lastUpdatedId}`, lastUpdated)).data;
  };
};

export type LastUpdatedSchema = {
  id: string;
  answer: string;
};

export interface LastUpdatedState extends LastUpdatedSchema {}

export default function (
  state: LastUpdatedState = { id: "", answer: "" },
  action: any,
) {
  switch (action.type) {
    case LOAD_LAST_UPDATED:
      return action.answer;
    default:
      return state;
  }
}

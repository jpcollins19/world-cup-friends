import { LastUpdatedSchema } from "../../store";
import { getFakerInfo } from "./";

export const createLastUpdated = (answer: string): LastUpdatedSchema => {
  return {
    id: getFakerInfo("uuid"),
    answer,
  };
};

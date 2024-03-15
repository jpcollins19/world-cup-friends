import * as React from "react";
import "@testing-library/react-hooks";
import axios from "axios";
import { _loadLastUpdated, updateLastUpdated, reducer } from "../../../store";
import {
  getDataFromStore,
  updateStore,
} from "../../../hooks/__tests__ /hookUtils";
import { createLastUpdated } from "../../../hooks/fixtures/LastUpdated";
import { thunk } from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useDispatch: jest.fn(),
// }));

jest.mock("axios");

describe("lastUpdatedStore ", () => {
  it("updateLastUpdated", async () => {
    //const store = createStore(reducer, applyMiddleware(thunk));

    const OgAnswer = "4/9/24 at 1:30 PM CT";

    const lastUpdatedOG = createLastUpdated(OgAnswer);

    updateStore(_loadLastUpdated, lastUpdatedOG);

    const lastUpdateStateOLD = getDataFromStore("lastUpdated");

    expect(lastUpdateStateOLD).toEqual(lastUpdatedOG);

    let lastUpdatedId: any = "";
    if ("id" in lastUpdateStateOLD) {
      lastUpdatedId = lastUpdateStateOLD.id;
    }
    //
    const newAnswer = "5/15/23 at 5:30 PM CT";
    //
    // (axios.put as jest.Mock).mockResolvedValueOnce({
    //   data: { id: lastUpdatedId, answer: "5/15/23 at 5:30 PM CT" },
    // });

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: lastUpdatedOG });

    updateStore(updateLastUpdated, newAnswer);

    //const lastUpdatedNew = createLastUpdated(newAnswer, lastUpdatedId);

    //updateStore(_updateLastUpdated, lastUpdatedNew);
    //store.dispatch(_updateLastUpdated(lastUpdatedNew));

    //const lastUpdateState = getDataFromStore("lastUpdated");
    //store.getState().lastUpdated;

    // expect(lastUpdateState).toEqual({
    //   id: lastUpdatedId,
    //   answer: newAnswer,
    // });
  });
});

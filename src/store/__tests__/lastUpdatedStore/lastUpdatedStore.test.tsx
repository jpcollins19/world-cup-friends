import * as React from "react";
import "@testing-library/react-hooks";
import axios from "axios";
import {
  _loadLastUpdated,
  updateLastUpdated,
  reducer,
  LastUpdatedSchema,
  store,
  tDispatch,
} from "../../../store";
import {
  getDataFromStore,
  updateStore,
} from "../../../hooks/__tests__ /hookUtils";
import { createLastUpdated } from "../../../hooks/fixtures/LastUpdated";

jest.mock("axios");

describe("lastUpdatedStore ", () => {
  it("updateLastUpdated", async () => {
    const OgAnswer = "4/9/24 at 1:30 PM CT";

    const lastUpdatedOG = createLastUpdated(OgAnswer);

    updateStore(_loadLastUpdated, lastUpdatedOG);

    const lastUpdateStateOG = getDataFromStore("lastUpdated");

    expect(lastUpdateStateOG).toEqual(lastUpdatedOG);

    let lastUpdatedId: any = "";
    if ("id" in lastUpdateStateOG) {
      lastUpdatedId = lastUpdateStateOG.id;
    }

    const newAnswer = "5/15/23 at 5:30 PM CT";

    const lastUpdatedNEW = { id: lastUpdatedId, answer: newAnswer };

    const dispatch = jest.fn();

    const result = {
      status: 200,
      data: {},
    };

    //const response = await request(App).get("/api/last-updated");

    // expect(response.body).toEqual([
    //   "Mars",
    //   "Moon",
    //   "Earth",
    //   "Mercury",
    //   "Venus",
    //   "Jupiter",
    // ]);

    // (
    //   axios.post as jest.MockedFunction<typeof axios.post>
    // ).mockResolvedValueOnce(result);

    // const actual = await createAccountAsyncThunkAction(
    //   dispatch,
    //   () => {},
    //   undefined,
    // );
    //
    // expect(actual.meta.arg).toEqual({
    //   id: "1",
    //   firstName: "first name",
    //   lastName: "last name",
    //   email: "email",
    //   phone: "phone",
    // });
    // expect(actual.payload).toEqual({ status: 200, data: {} });

    // (axios.put as jest.Mock).mockImplementationOnce(async (url, data) => {
    //   console.log("PUT request URL:", url);
    //   console.log("PUT request Data:", data);
    //   return { data: lastUpdatedNEW };
    // });

    // const dispatch = tDispatch();
    //
    // await dispatch(updateLastUpdated(newAnswer));

    // (axios.get as jest.Mock).mockResolvedValueOnce({ data: lastUpdatedOG });
    //
    // (axios.put as jest.Mock).mockResolvedValueOnce({ data: lastUpdatedNEW });

    // updateStore(updateLastUpdated, newAnswer).then(() => {
    //   const lastUpdateStateNEW = getDataFromStore("lastUpdated");
    //
    //   expect(lastUpdateStateNEW).toEqual(lastUpdatedNEW);
    //   //expect(store.getActions()).toEqual(expectedActions);
    // });

    // expect(axios.put).toBeCalledWith(
    //   `http://localhost:1919/api/last-updated/${lastUpdatedId}`,
    //   lastUpdatedNEW,
    // );

    // updateLastUpdated(newAnswer)
    //
    // .then(() => {
    //   const lastUpdateStateNEW = getDataFromStore("lastUpdated");
    //
    //   expect(lastUpdateStateNEW).toEqual(lastUpdatedNEW);
    //   //expect(store.getActions()).toEqual(expectedActions);
    // });
    //})

    // return updateStore(updateLastUpdated, newAnswer).then(() => {
    //   const lastUpdateStateNEW = getDataFromStore("lastUpdated");
    //
    //   expect(lastUpdateStateNEW).toEqual(lastUpdatedNEW);
    //   //expect(store.getActions()).toEqual(expectedActions);
    // });
  });
});

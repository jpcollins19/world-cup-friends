import * as React from "react";
import "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react-hooks";
import { _loadLastUpdated, _loadTourneyStage } from "../../store";
import * as hooks from "../";

import {
  getWrapper,
  ignoreReactDOMRenderError,
  updateStore,
} from "./hookUtils";
import { getFakerInfo } from "../fixtures";

beforeAll(() => {
  ignoreReactDOMRenderError();
});

describe("useFindTourneyStage ", () => {
  const testsToRun = [1, 2, 3];

  testsToRun.forEach((stage) => {
    it(`tourneyStage is ${stage}`, () => {
      updateStore(_loadTourneyStage, stage);

      const wrapper = getWrapper();

      const { result } = renderHook(() => hooks.useFindTourneyStage(), {
        wrapper,
      });

      expect(result.current).toBe(stage);
    });
  });
});

describe("useGetLastUpdated ", () => {
  it("gets accurate data", () => {
    const lastUpdatedAnswer = "4/9/24 at 1:30 PM CT";

    const lastUpdated = { id: getFakerInfo("uuid"), answer: lastUpdatedAnswer };

    updateStore(_loadLastUpdated, lastUpdated);

    const wrapper = getWrapper();

    const { result } = renderHook(() => hooks.useGetLastUpdated(), {
      wrapper,
    });

    expect(result.current).toBe(lastUpdated);
    expect(result.current).not.toBe("");
    expect(result.current).not.toBe(null);
  });
});

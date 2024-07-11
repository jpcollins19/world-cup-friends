import * as React from "react";
import "@testing-library/react-hooks";
import { renderHook } from "@testing-library/react-hooks";
import { _loadTeams, convertTeamDropdown, TeamSchema } from "../../store";
import * as hooks from "../";
import {
  argentina,
  createTeam,
  ecuador,
  england,
  mexico,
  netherlands,
  poland,
  usa,
} from "../fixtures";
import {
  getWrapper,
  ignoreReactDOMRenderError,
  updateStore,
} from "./hookUtils";

beforeAll(() => {
  ignoreReactDOMRenderError();
});

describe("useGetTeams", () => {
  const team1: TeamSchema = createTeam({ name: usa });
  const team2: TeamSchema = createTeam({ name: england });
  const team3: TeamSchema = createTeam({ name: argentina });
  const team4: TeamSchema = createTeam({ name: mexico });

  const teams = [team1, team2, team3, team4];

  it("returns all teams", () => {
    updateStore(_loadTeams, teams);

    const wrapper = getWrapper();

    const { result } = renderHook(() => hooks.useGetTeams(), {
      wrapper,
    });

    expect(result.current).toEqual(teams);
  });
});

import * as React from "react";
import "@testing-library/react-hooks";
import axios from "axios";
import { updateUserGroupPicks, UserSchema } from "../../../store";
import { mockGeti18n } from "../../../components/testingUtils";
import { createUser } from "../../../hooks/fixtures";

jest.mock("axios");

jest.mock("../../../store", () => {
  const originalModule = jest.requireActual("../../../store");

  return {
    ...originalModule,
    geti18n: jest.fn(),
  };
});

describe("UsersStore", () => {
  const userWithPicks: UserSchema = createUser({
    name: "Joe",
    tiebreaker: 101,
  });

  const authWithPicks = { id: userWithPicks.id, tiebreaker: 101 };

  const userWithNoPicks: UserSchema = createUser({ name: "Kelly" });
  const authWithNoPicks = { id: userWithNoPicks.id };

  describe("updateUserGroupPicks", () => {
    let dispatch: any;
    let history: any;

    beforeEach(() => {
      dispatch = jest.fn().mockImplementation((fn) => fn);
      history = { push: jest.fn() };
    });

    const getThunk = (userId: string, tiebreaker: string) => {
      return updateUserGroupPicks(history, userId, tiebreaker);
    };

    describe("error states", () => {
      describe("tiebreaker", () => {
        beforeEach(() => {
          mockGeti18n("Invalid Tiebreaker");
        });

        it("when tiebreaker is not an integer", async () => {
          const userId = userWithPicks.id;
          const tiebreaker = "5.5";

          const thunk = getThunk(userId, tiebreaker);

          await expect(thunk(dispatch)).rejects.toThrow("Invalid Tiebreaker");

          expect(dispatch).not.toHaveBeenCalled();
        });

        it("when tiebreaker is empty", async () => {
          const userId = userWithPicks.id;
          const tiebreaker = "";

          const thunk = getThunk(userId, tiebreaker);

          await expect(thunk(dispatch)).rejects.toThrow("Invalid Tiebreaker");

          expect(dispatch).not.toHaveBeenCalled();
        });

        it("when tiebreaker has a space", async () => {
          const userId = userWithPicks.id;
          const tiebreaker = "5 ";

          const thunk = getThunk(userId, tiebreaker);

          await expect(thunk(dispatch)).rejects.toThrow("Invalid Tiebreaker");

          expect(dispatch).not.toHaveBeenCalled();
        });

        it("when tiebreaker is 0", async () => {
          const userId = userWithPicks.id;
          const tiebreaker = "0";

          const thunk = getThunk(userId, tiebreaker);

          await expect(thunk(dispatch)).rejects.toThrow("Invalid Tiebreaker");

          expect(dispatch).not.toHaveBeenCalled();
        });
      });
    });

    it("when user changes their tiebreaker, should update the users tiebreaker", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: [userWithPicks, userWithNoPicks],
      });

      const userId = userWithPicks.id;

      const tiebreaker = "102";

      const thunk = getThunk(userId, tiebreaker);

      await thunk(dispatch);

      const userToSubmit = { id: userId, tiebreaker: Number(tiebreaker) };

      expect(axios.put).toBeCalledWith(`/api/users/${userId}`, userToSubmit);
    });

    it("when user does not change their tiebreaker, no update to the user obj should be made", async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: [userWithPicks, userWithNoPicks],
      });

      const userId = userWithPicks.id;

      const tiebreaker = "101";

      const thunk = getThunk(userId, tiebreaker);

      await thunk(dispatch);

      expect(axios).not.toHaveBeenCalled();
    });
  });
});
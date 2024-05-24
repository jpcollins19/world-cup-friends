import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  getTestIdTag,
  mockUseIsMobile,
  mockUseGetActiveUsers,
  mockUseShouldPayoutShow,
  queryTestIdTag,
} from "../../testingUtils";
import { UserSchema } from "../../../store";
import PayoutData from "../../navbar/PayoutData";
import { createUser } from "../../../hooks/fixtures";

jest.mock("../../../hooks", () => ({
  useIsMobile: jest.fn(),
  useGetActiveUsers: jest.fn(),
  useShouldPayoutShow: jest.fn(),
}));

const user1: UserSchema = createUser();
const user2: UserSchema = createUser();
const user3: UserSchema = createUser();

const users: UserSchema[] = [user1, user2, user3];

describe("<PayoutTable/>", () => {
  it("renders when useShouldPayoutShow is true", async () => {
    mockUseGetActiveUsers(users);
    mockUseShouldPayoutShow(true);

    render(<PayoutData />);

    const testId = await getTestIdTag("payoutData");

    expect(testId).toBeTruthy();
  });

  it("does not render when useShouldPayoutShow is false", async () => {
    mockUseGetActiveUsers(users);
    mockUseShouldPayoutShow(false);

    render(<PayoutData />);

    const testId = await queryTestIdTag("payoutData");

    expect(testId).toBeFalsy();
  });

  describe("payoutAmountTesting", () => {
    const threeUsers: UserSchema[] = users;

    const user4: UserSchema = createUser();
    const user5: UserSchema = createUser();
    const user6: UserSchema = createUser();

    const sixUsers: UserSchema[] = [...threeUsers, user4, user5, user6];

    const user7: UserSchema = createUser();
    const user8: UserSchema = createUser();
    const user9: UserSchema = createUser();

    const nineUsers: UserSchema[] = [...sixUsers, user7, user8, user9];

    const testsToRun = [
      { users: threeUsers, 1: "$45.00", 2: "$15.00", 3: "$0.00" },
      { users: sixUsers, 1: "$75.00", 2: "$25.00", 3: "$20.00" },
      { users: nineUsers, 1: "$120.00", 2: "$40.00", 3: "$20.00" },
    ];

    testsToRun.forEach((test) => {
      it(`with ${test.users.length} users`, async () => {
        mockUseGetActiveUsers(test.users);
        mockUseShouldPayoutShow(true);

        render(<PayoutData />);

        const firstPlaceTestId = await getTestIdTag("payout-first-place");
        const secondPlaceTestId = await getTestIdTag("payout-second-place");
        const thirdPlaceTestId = await getTestIdTag("payout-third-place");

        expect(firstPlaceTestId.textContent).toEqual(test[1]);
        expect(secondPlaceTestId.textContent).toEqual(test[2]);
        expect(thirdPlaceTestId.textContent).toEqual(test[3]);
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile view", async () => {
      mockUseIsMobile(true);
      mockUseGetActiveUsers(users);
      mockUseShouldPayoutShow(true);

      render(<PayoutData />);

      const testId = await getTestIdTag("payoutData-mobile");

      expect(testId).toBeTruthy();
    });
  });
});

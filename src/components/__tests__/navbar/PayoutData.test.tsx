import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  getTestIdTag,
  mockUseIsMobile,
  mockUseGetActiveUsers,
  mockUseShouldPayoutShow,
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
const user2: UserSchema = createUser({ tiebreaker: 100 });
const user3: UserSchema = createUser({ tiebreaker: 10 });

const users = [user1, user2, user3];

describe("<PayoutTable/>", () => {
  it("renders when useShouldPayoutShow is true", async () => {
    //mockUseIsMobile(false);
    mockUseGetActiveUsers(users);
    mockUseShouldPayoutShow(true);

    render(<PayoutData />);

    const testId = await getTestIdTag("payoutData");

    expect(testId).toBeInTheDocument();
  });

  it.todo("does not render when useShouldPayoutShow is false");
  it.todo(
    "placement text and $ text and # of submitted picks is correct -- set up 3 test w diff user submitted #s",
  );

  // describe("mobile view", () => {
  //   it("renders the mobile page", async () => {
  //     mockUseIsMobile(true);
  //
  //     render(<PayoutData />);
  //
  //     const testId = await getTestIdTag("payoutData-mobile");
  //
  //     expect(testId).toBeInTheDocument();
  //   });
  // });
});

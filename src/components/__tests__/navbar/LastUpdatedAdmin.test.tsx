import * as React from "react";
import "@testing-library/jest-dom";
import {
  getTestIdTag,
  queryTestIdTag,
  mockWindowMobileView,
  renderWithProvider,
  click,
  getButton,
  getButtonTestId,
} from "../../testingUtils";
import LastUpdatedAdmin from "../../navbar/lastUpdated/LastUpdatedAdmin";

// jest.mock("../../../hooks", () => ({
//   // useIsMobile: jest.fn(),
//   // useIsUserAdmin: jest.fn(),
//   // useIsUserLoggedIn: jest.fn(),
//   // useGetLastUpdated: jest.fn(),
// }));

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useState: jest.fn(),
// }));

describe("<LastUpdatedAdmin/>", () => {
  const editButtonTestId = "button-cont-edit";
  const saveButtonTestId = "button-cont-save";

  it("should render the component", async () => {
    renderWithProvider(<LastUpdatedAdmin />);

    const testId = await getTestIdTag("last-updated-admin");

    expect(testId).toBeTruthy();
  });

  describe("when editing is false", () => {
    it("renders LastUpdatedReadOnly", async () => {
      renderWithProvider(<LastUpdatedAdmin />);

      const readOnlyTestId = await getTestIdTag("last-updated-read-only");
      const editTestId = await queryTestIdTag("last-updated-edit");

      expect(readOnlyTestId).toBeTruthy();
      expect(editTestId).toBeFalsy();
    });

    it("renders the edit button, and not the save button", async () => {
      renderWithProvider(<LastUpdatedAdmin />);

      const editButton = await getButtonTestId("edit");
      const saveButton = await queryTestIdTag(saveButtonTestId);

      expect(editButton).toBeTruthy();
      expect(saveButton).toBeFalsy();
    });
  });

  describe("when editing is true", () => {
    const clickEditButton = async () => {
      const editButton = await getButton("edit");

      click(editButton);
    };

    it("renders LastUpdatedEdit", async () => {
      renderWithProvider(<LastUpdatedAdmin />);

      await clickEditButton();

      const readOnlyTestId = await queryTestIdTag("last-updated-read-only");
      const editTestId = await getTestIdTag("last-updated-edit");

      expect(readOnlyTestId).toBeFalsy();
      expect(editTestId).toBeTruthy();
    });

    it("renders the save button, and not the edit button", async () => {
      renderWithProvider(<LastUpdatedAdmin />);

      await clickEditButton();

      const editButton = await queryTestIdTag("edit");
      const saveButton = await getButtonTestId("save");

      expect(editButton).toBeFalsy();
      expect(saveButton).toBeTruthy();
    });

    //LastUpdatedEdit
    it.todo("TextField data is accurate");
    it.todo(
      "updating text updates the lastUpdated info in LastUpdatedReadOnly",
    );
  });

  //overall
  it.todo("audit that updating lastUpdated works");

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      renderWithProvider(<LastUpdatedAdmin />);

      const testId = await getTestIdTag("last-updated-admin-mobile");

      expect(testId).toBeTruthy();
    });
  });
});

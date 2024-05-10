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
import { createLastUpdated } from "../../../hooks/fixtures/LastUpdated";
import { updateStore } from "../../../hooks/__tests__ /hookUtils";
import { _loadLastUpdated } from "../../../store";

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

    it("renders the save button, and not the edit button", async () => {
      renderWithProvider(<LastUpdatedAdmin />);

      await clickEditButton();

      const editButton = await queryTestIdTag(editButtonTestId);
      const saveButton = await getButtonTestId("save");

      expect(editButton).toBeFalsy();
      expect(saveButton).toBeTruthy();
    });

    describe("LastUpdatedEdit", () => {
      const lastUpdatedAnswer = "Tuesday, March 1, 2022";

      beforeEach(() => {
        const lastUpdated = createLastUpdated(lastUpdatedAnswer);

        updateStore(_loadLastUpdated, lastUpdated);
      });

      it("renders LastUpdatedEdit", async () => {
        renderWithProvider(<LastUpdatedAdmin />);

        await clickEditButton();

        const readOnlyTestId = await queryTestIdTag("last-updated-read-only");
        const editTestId = await getTestIdTag("last-updated-edit");

        expect(readOnlyTestId).toBeFalsy();
        expect(editTestId).toBeTruthy();
      });

      it("TextField data is accurate upon render", async () => {
        renderWithProvider(<LastUpdatedAdmin />);

        await clickEditButton();

        const textFieldTestId = await getTestIdTag(
          "text-field-input-lastupdated",
        );

        expect(textFieldTestId).toHaveValue(lastUpdatedAnswer);
      });
    });
  });

  describe("mobile view", () => {
    it("renders the mobile page", async () => {
      mockWindowMobileView(true);

      renderWithProvider(<LastUpdatedAdmin />);

      const testId = await getTestIdTag("last-updated-admin-mobile");

      expect(testId).toBeTruthy();
    });
  });
});

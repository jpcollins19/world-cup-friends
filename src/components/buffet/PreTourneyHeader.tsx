import * as React from "react";
import {
  tw,
  createPreTourneyDataNotAvailableYetMessage,
  createUrlFromText,
} from "../../store";
import { useFindTourneyStage, useHasTourneyStarted } from "../../hooks";

type PreTourneyHeaderProps = {
  page: string;
};

export const PreTourneyHeader: React.FunctionComponent<
  PreTourneyHeaderProps
> = ({ page }) => {
  const hasTourneyStarted = useHasTourneyStarted();

  return !hasTourneyStarted ? (
    <div
      data-testid={`pre-tourney-header-${createUrlFromText(page)}`}
      className={`${tw.whiteTextMed} ${tw.shrinkTextXLg} pt-48 w-5/8 text-center`}
    >
      {createPreTourneyDataNotAvailableYetMessage(page)}
    </div>
  ) : null;
};

export default PreTourneyHeader;

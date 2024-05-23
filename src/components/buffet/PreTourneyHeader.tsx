import * as React from "react";
import {
  tw,
  createPreTourneyDataNotAvailableYetMessage,
  createUrlFromText,
} from "../../store";

type PreTourneyHeaderProps = {
  page: string;
};

export const PreTourneyHeader: React.FunctionComponent<
  PreTourneyHeaderProps
> = ({ page }) => {
  return (
    <div
      data-testid={`pre-tourney-header-${createUrlFromText(page)}`}
      className={`${tw.whiteTextMed} ${tw.shrinkTextLarge} pt-40 w-5/8 text-center`}
    >
      {createPreTourneyDataNotAvailableYetMessage(page)}
    </div>
  );
};

export default PreTourneyHeader;

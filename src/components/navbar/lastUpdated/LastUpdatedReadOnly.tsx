import * as React from "react";
import { getPageTestId, tw } from "../../../store";
import { useGetLastUpdated } from "../../../hooks";

export const LastUpdatedReadOnly: React.FunctionComponent = () => {
  const lastUpdated = useGetLastUpdated();

  const answer = "answer" in lastUpdated ? lastUpdated.answer : null;

  const testId = getPageTestId("last-updated-read-only");

  return (
    <div
      data-testid={testId}
      className={`${tw.flexBoth} ${tw.whiteTextSm} ${tw.cursorArrow} flex-col text-sm `}
    >
      <div>Last Updated:</div>
      <div data-testid="last-updated-answer">{answer}</div>
    </div>
  );
};

export default LastUpdatedReadOnly;

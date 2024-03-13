import * as React from "react";
import { tw } from "../../../store";
import { useGetLastUpdated } from "../../../hooks";

export const LastUpdatedReadOnly: React.FunctionComponent = () => {
  const lastUpdated = useGetLastUpdated();

  const answer = "answer" in lastUpdated ? lastUpdated.answer : null;

  return (
    <div
      className={`${tw.flexBoth} ${tw.whiteTextSm} ${tw.pointer} flex-col text-sm `}
    >
      <div>Last Updated:</div>
      <div>{answer}</div>
    </div>
  );
};

export default LastUpdatedReadOnly;

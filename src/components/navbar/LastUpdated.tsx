import * as React from "react";
import { tw } from "../../store";
import { useGetLastUpdated, useIsUserLoggedIn } from "../../hooks";

export const LastUpdated: React.FunctionComponent = () => {
  const lastUpdated = useGetLastUpdated();

  const answer = "answer" in lastUpdated ? lastUpdated.answer : null;

  return useIsUserLoggedIn() ? (
    <div className={`${tw.flexBoth} ${tw.whiteTextSm} flex-col text-sm `}>
      <div>Last Updated:</div>
      <div>{answer}</div>
    </div>
  ) : null;
};

export default LastUpdated;

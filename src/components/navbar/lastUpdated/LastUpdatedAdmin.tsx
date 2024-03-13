import * as React from "react";
import { tw } from "../../../store";
import { useGetLastUpdated } from "../../../hooks";
import LastUpdatedReadOnly from "./LastUpdatedReadOnly";
import Button from "../../buffet/Button";

export const LastUpdatedAdmin: React.FunctionComponent = () => {
  const lastUpdated = useGetLastUpdated();

  const answer = "answer" in lastUpdated ? lastUpdated.answer : null;

  return (
    <div className={`${tw.flexA} justify-around`}>
      <LastUpdatedReadOnly />
      <Button text="Edit" size="small" />
    </div>
  );
};

export default LastUpdatedAdmin;

import * as React from "react";
import { tw } from "../../../store";
import Button from "../../buffet/Button";
import LastUpdatedReadOnly from "./LastUpdatedReadOnly";
import LastUpdatedEdit from "./LastUpdatedEdit";

export const LastUpdatedAdmin: React.FunctionComponent = () => {
  const [editing, setEditing] = React.useState(false);

  const EditButton: React.FunctionComponent = () => {
    return <Button text="Edit" size="small" onClick={() => setEditing(true)} />;
  };

  const SaveButton: React.FunctionComponent = () => {
    return (
      <Button text="Save" size="small" onClick={() => setEditing(false)} />
    );
  };

  return (
    <div className={`${tw.flexA} justify-around`}>
      {editing ? <LastUpdatedEdit /> : <LastUpdatedReadOnly />}

      <div className={`${tw.flexBoth} w-20`}>
        {editing ? <SaveButton /> : <EditButton />}
      </div>
    </div>
  );
};

export default LastUpdatedAdmin;

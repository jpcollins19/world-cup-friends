import * as React from "react";
import {
  geti18n,
  getPageTestId,
  loadLastUpdated,
  me,
  tDispatch,
  tw,
  updateLastUpdated,
} from "../../../store";
import Button from "../../buffet/Button";
import LastUpdatedReadOnly from "./LastUpdatedReadOnly";
import { Form, FormikProvider, useFormik } from "formik";
import { useGetLastUpdated } from "../../../hooks";
import { TextField } from "../../buffet";

export type LastUpdatedSchema = {
  [lastUpdated: string]: any;
};

export const LastUpdatedAdmin: React.FunctionComponent = () => {
  const [editing, setEditing] = React.useState(false);

  const EditButton: React.FunctionComponent = () => {
    return (
      <Button
        text={geti18n("edit")}
        size="small"
        onClick={() => setEditing(true)}
      />
    );
  };

  const SaveButton: React.FunctionComponent = () => {
    return <Button form="last-updated" text={geti18n("save")} size="small" />;
  };

  const updateContClass = `${tw.flexA} flex-col justify-around h-full`;

  const LastUpdatedEdit: React.FunctionComponent = () => {
    const dispatch = tDispatch();

    const lastUpdated = useGetLastUpdated();

    const answer = "answer" in lastUpdated ? lastUpdated.answer : null;

    const onSubmit = async (values: LastUpdatedSchema) => {
      try {
        setEditing(false);

        await dispatch(updateLastUpdated(values.lastUpdated));
      } catch (err: any) {
        console.log(err);
      }
    };

    const formik = useFormik<LastUpdatedSchema>({
      initialValues: {
        lastUpdated: answer,
      },
      onSubmit,
    });

    const { handleSubmit, setFieldValue } = formik;

    const onChange = (ev: any) => {
      setFieldValue("lastUpdated", ev.target.value);
    };

    const testId = getPageTestId("last-updated-edit");

    return (
      <div data-testid={testId}>
        <FormikProvider value={formik}>
          <Form
            onSubmit={handleSubmit}
            id="last-updated"
            className={`${updateContClass} m-0`}
          >
            <TextField
              label="lastUpdated"
              onChange={onChange}
              showHelperText={false}
              height="short"
              width="large"
              showValue={true}
              schema="lastUpdated"
            />

            <SaveButton />
          </Form>
        </FormikProvider>
      </div>
    );
  };

  const testId = getPageTestId("last-updated-admin");

  return (
    <div data-testid={testId} className={updateContClass}>
      {editing ? <LastUpdatedEdit /> : <LastUpdatedReadOnly />}

      <div className={`${tw.flexBoth} w-20`}>{!editing && <EditButton />}</div>
    </div>
  );
};

export default LastUpdatedAdmin;

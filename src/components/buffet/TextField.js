// import * as React from "react";
// import { getScreenWidth } from "../../store";
import TextField from "@mui/material/TextField";
import { colors } from "../../store";

// type TextFieldInputProps = {
//   label: string;
//   type: string;
// };
//
// type TextFieldProps = {
//   input: TextFieldInputProps;
// };

const Text_Field = ({ input }) => {
  // const Text_Field = ({ ...props }) => {

  //const Text_Field: React.FunctionComponent<TextFieldProps> = ({ input }) => {
  // const isMobile = getScreenWidth("max", 65);

  const black = `${colors.black}`;

  return (
    <TextField
      // onChange={onChange}
      required
      label={input.label}
      type={input.type}
      variant="filled"
      // name={input.name}
      // fullWidth
      sx={{
        margin: 1,
        width: "280px",
        background: "rgb(237, 239, 245)",
        borderRadius: "9px",
        border: `solid 2px ${black}`,
      }}
      InputProps={{ disableUnderline: true }}
      //
      ///text of what is typed////////////////
      inputProps={{
        style: {
          textAlign: "center",
          color: "black",
          // fontWeight: !isMobile ? "bold" : "",
          // fontSize: isMobile ? "2rem" : "1rem",
          // height: isMobile ? "4rem" : "1.5rem",
          // height: "1.5rem",
        },
      }}
      //
      ///helperText up top////////////////
      InputLabelProps={{
        style: {
          textAlign: "center", //necessary for centering text
          color: `${black}`,
          width: "100vw", //necessary for centering text
          // marginLeft: input.marginLeft,
          // fontSize: isMobile ? "2rem" : "1rem",
        },
        shrink: true,
      }}
    />
  );
};

export default Text_Field;

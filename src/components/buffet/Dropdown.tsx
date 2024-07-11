import Select from "react-select";
import { useIsMobile } from "../../hooks";
import * as React from "react";

// export type DropdownSchema = {
//   value: string;
//   label: any;
// };

type DropdownProps = {
  placeholder: string | null;
  options: any[];
  width: string;
  defaultValue: any;
  set: any;
};

export const Dropdown: React.FunctionComponent<DropdownProps> = ({
  placeholder,
  options,
  width,
  defaultValue,
  set,
}) => {
  const isMobile = useIsMobile();

  const widthNum = Number(width.split("rem")[0]);

  const optionWidth = widthNum - 1.2;

  const zIndex = 10;

  const styles = {
    menuPortal: (styles: any) => {
      return {
        ...styles,
        zIndex,
      };
    },
    menu: (styles: any) => {
      return {
        ...styles,
        zIndex,
        background: "#485563",
      };
    },

    placeholder: (styles: any) => {
      return {
        ...styles,
        color: "red",
      };
    },
    // dropdownIndicator: (styles) => {
    //   return {
    //     ...styles,
    //     color: "white",
    //     "&:hover": {
    //       color: "white",
    //     },
    //   };
    // },
    // indicatorSeparator: (styles) => {
    //   return {
    //     ...styles,
    //     background: "white",
    //   };
    // },
    singleValue: (styles: any) => {
      return {
        ...styles,
        color: "white",
      };
    },
    control: (styles: any) => {
      return {
        ...styles,
        background: "none",
        color: "white",
        border: "solid white 2px",
        cursor: "pointer",
        // width: isMobile ? `${width * 1.35}rem` : `${width}rem`,
        width: `${width}rem`,
        // height: isMobile ? "64px" : "40px",
        height: "40px",
        borderRadius: "4px",
        // fontSize: isMobile ? "2rem" : "1.2rem",
        fontSize: "1.2rem",
        textAlign: "center",
        "&:hover": {
          border: "solid white 2px",
        },
      };
    },
    option: (styles: any) => {
      return {
        ...styles,
        background: "#485563", //when dropdown options are not highlighted
        color: "white",
        borderBottom: "solid lightGrey 2px",
        cursor: "pointer",
        // width: isMobile
        //   ? `${optionWidth * 1.45}rem`
        //   : `${optionWidth - 1}.01rem`,
        width: `${optionWidth - 1}.01rem`,
        // fontSize: isMobile ? "1.7rem" : "1.2rem",
        fontSize: "1.2rem",
        textAlign: "center",
        "&:hover": {
          background: "#5a6d81", //when dropdown option is highlighted
        },
      };
    },
  };

  return (
    <Select
      menuPortalTarget={document.body}
      menuPosition="fixed"
      options={options}
      placeholder={placeholder ?? ""}
      defaultValue={defaultValue ?? ""}
      onChange={set}
      styles={styles}
      isSearchable={false}
    />
  );
};

export default Dropdown;

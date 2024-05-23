import * as React from "react";
import { Link } from "react-router-dom";
import { getPageTestId } from "../../store";
import { MenuOptionProps } from "./MenuChevron";

type MenuListItemProps = {
  option: MenuOptionProps;
  onClick: () => void;
};

export const MenuListItem: React.FunctionComponent<MenuListItemProps> = ({
  option,
  onClick,
}) => {
  const testId = getPageTestId(`menu-list-item-${option}`);

  return (
    <Link
      data-testid={testId}
      to={option.route}
      //className=""
      className="dropdown-option"
      onClick={() => onClick()}
    >
      {option.text}
    </Link>
  );
};

export default MenuListItem;
